'use client';

import { useContext, useState } from 'react';

import { ResponsiveDialog } from '@/components/responsive-dialog';
import { Button } from '@/components/ui/button';

import CreatePersonForm from './_components/forms/create-person-form';
import { columns } from './_items/components/columns';
import { DataTable } from './_items/components/data-table';
import { PeopleContext } from './people-provider';

export default function Home() {
  const people = useContext(PeopleContext);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <ResponsiveDialog
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        title="Add Person"
        form={<CreatePersonForm setIsOpen={setIsCreateOpen} />}
      />
      <div className="flex-1 flex flex-col gap-12 max-w-4xl md:px-6  w-full">
        <div className="flex-1 items-start text-center pt-20">
          {/* Add Button */}
          <div className="flex justify-end">
            <Button onClick={() => setIsCreateOpen(true)}>+ Add Person</Button>
          </div>
          {/* Data Table */}
          {people && (
            <div className="mt-4">
              <DataTable columns={columns} data={people} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
