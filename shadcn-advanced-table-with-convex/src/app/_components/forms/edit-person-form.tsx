'use client';

import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'convex/react';
import { format } from 'date-fns';
import { CalendarDays, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  fullname: z.string().min(1),
  birthday: z.date(),
  image: z.optional(z.string()),
});

export default function EditPersonForm({
  person,
  setIsOpen,
}: {
  person?: Doc<'people'>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const date = person?.birthday as string;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: person?.fullname,
      birthday: new Date(date),
      image: person?.image,
    },
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const isLoading = form.formState.isSubmitting;
  const updatePerson = useMutation(api.people.updatePerson);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const birthday = values.birthday.toISOString();
    console.log(birthday);
    console.log(values);
    try {
      await updatePerson({
        personId: person?._id as Id<'people'>,
        fullname: values.fullname,
        birthday: birthday,
        image: values.image as Id<'_storage'>,
      });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 sm:px-0 px-4"
      >
        <FormField
          name="image"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="w-full items-center justify-center flex">
              <FormControl>
                <span className="h-20 w-20 flex items-center  justify-center rounded-full border border-foreground/50 duration-200 cursor-pointer border-dashed bg-background hover:bg-accent hover:text-accent-foreground">
                  <ImageIcon className="stroke-foreground/50" />
                </span>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="fullname"
          control={form.control}
          render={({ field }: { field: any }) => (
            <FormItem className="col-span-2 md:col-span-1">
              <FormLabel>Full name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John Smith"
                  className="text-md"
                  required
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3 w-full">
              <FormLabel>Birthday</FormLabel>
              <Popover
                modal={true}
                open={isCalendarOpen}
                onOpenChange={setIsCalendarOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PP')
                      ) : (
                        <span>Select a date</span>
                      )}
                      <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => {
                      field.onChange(e);
                      setIsCalendarOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full sm:justify-end mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add'
              )}
            </>
          </Button>
        </div>
      </form>
    </Form>
  );
}
