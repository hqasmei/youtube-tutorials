'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import DeleteForm from '@/components/forms/delete-form';
import EditForm from '@/components/forms/edit-form';
import IconMenu from '@/components/icon-menu';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PEOPLE } from '@/consts';
import { getInitials } from '@/lib/utils';
import { type Person } from '@/types';
import { ArrowLeft, MoreVertical, SquarePen, Trash2 } from 'lucide-react';

function Item(props: Person) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Person"
      >
        <EditForm cardId={props.id} setIsOpen={setIsEditOpen} />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Person"
        description="Are you sure you want to delete this person?"
      >
        <DeleteForm cardId={props.id} setIsOpen={setIsDeleteOpen} />
      </ResponsiveDialog>

      <Card className="w-full p-6 flex shadow-md relative hover:shadow-xl duration-200 transition-all">
        {/* Card Content */}
        <Link href={`/card/${props.id}`} className="h-full">
          <div className="flex flex-col items-start justify-between flex-1 h-full">
            <div className="flex flex-row items-center space-x-2 mb-2 ">
              <Avatar>
                <AvatarImage src={props.image} alt={props.name} />
                <AvatarFallback>{getInitials(props.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h2 className="font-bold text-md">{props.name}</h2>
                <span className="text-neutral-500 text-sm">{props.role}</span>
              </div>
            </div>

            <p className="line-clamp-2">{props.description}</p>
          </div>
        </Link>

        {/* Dropdown Menu */}
        <div className="flex flex-row space-x-1 items-center absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] z-50">
              <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                <button
                  onClick={() => {
                    setIsEditOpen(true);
                  }}
                  className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                >
                  <IconMenu
                    text="Edit"
                    icon={<SquarePen className="h-4 w-4" />}
                  />
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                <button
                  onClick={() => {
                    setIsDeleteOpen(true);
                  }}
                  className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                >
                  <IconMenu
                    text="Delete"
                    icon={<Trash2 className="h-4 w-4" />}
                  />
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    </>
  );
}

export default function CardPage() {
  return (
    <div className="w-full container mx-auto">
      <Link
        href="/"
        className="mb-6 flex flex-row items-center space-x-1 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 duration-200 transition-all"
        />
        <span>Back</span>
      </Link>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PEOPLE.map((person) => (
          <Item key={person.id} {...person} />
        ))}
      </div>
    </div>
  );
}
