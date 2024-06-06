'use client';

import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import Image from 'next/image';

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
import { Id } from '@/convex/_generated/dataModel';
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

export default function CreatePersonForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      birthday: undefined,
      image: undefined,
    },
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const createPerson = useMutation(api.people.createPerson);
  const isLoading = form.formState.isSubmitting;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileObject, setFileObject] = useState<File>();
  const [filePreview, setFilePreview] = useState<string>('');
  const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);

  // Function to upload the image to the convex server
  const uploadImage = async (file: File) => {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      body: file,
    });
    const { storageId } = await result.json();
    return storageId;
  };

  // Function to handle the file change event
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Once file is read as Data URL, append it to previews and the File object to fileObjects
        setFilePreview((prev) => reader.result as string);
        setFileObject((prev) => file);
      };
      reader.readAsDataURL(file); // Read as Data URL for the preview
    }
  };

  // Function to handle the click event on the file input
  const handleOnClick = () => {
    if (fileInputRef.current) {
      // Checks if fileInputRef.current is not null
      fileInputRef.current.click(); // Now TypeScript knows it's safe to call .click()
    }
  };

  // Function to handle the form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const birthday = values.birthday.toISOString();

    if (!fileObject) return;

    try {
      const imageId = await uploadImage(fileObject);

      await createPerson({
        fullname: values.fullname,
        birthday: birthday,
        image: imageId as Id<'_storage'>,
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
                <button type="button" onClick={handleOnClick} className="">
                  {filePreview ? (
                    <Image
                      src={filePreview}
                      alt="Preview"
                      width={120}
                      height={120}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <span className="h-20 w-20 flex items-center  justify-center rounded-full border border-foreground/50 duration-200 cursor-pointer border-dashed bg-background hover:bg-accent hover:text-accent-foreground">
                      <ImageIcon className="stroke-foreground/50" />
                    </span>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </button>
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
                    captionLayout="dropdown-buttons"
                    fromYear={2015}
                    toYear={2025}
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
