'use client';

import { Dispatch, SetStateAction } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Id } from '@/convex/_generated/dataModel';
import { RowSelectionState, Table } from '@tanstack/react-table';
import { SearchIcon, X } from 'lucide-react';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  selectedRowIds?: Id<'people'>[];
  setRowSelection?: Dispatch<SetStateAction<RowSelectionState>>;
}

export function DataTableToolbar<TData>({
  table,
  selectedRowIds,
  setRowSelection,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div className="flex flex-1 flex-col space-y-2 items-start  sm:flex-row sm:space-y-0 overflow-auto sm:items-center sm:space-x-2 p-0.5">
        <div className="flex items-center w-full mb-4 sm:mb-0">
          <div className="max-w-xl relative">
            <SearchIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-500" />
            <Input
              placeholder="Search"
              value={
                (table.getColumn('fullname')?.getFilterValue() as string) ?? ''
              }
              onChange={(event: any) =>
                table.getColumn('fullname')?.setFilterValue(event.target.value)
              }
              className="pl-8 pr-8 h-9 focus:outline-none ring-0 focus:ring-0 focus-visible:ring-0  focus-visible:ring-offset-0"
            />
            {isFiltered && (
              <button
                onClick={() => {
                  router.push(pathname);
                  table.resetColumnFilters();
                }}
                className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-row space-x-2  w-full">
          <div className="flex flex-row space-x-2 w-full  justify-start sm:justify-end">
            {/* {table.getColumn('label') && (
              <DataTableFacetedFilter
                column={table.getColumn('label')}
                title="Label"
                options={labels}
              />
            )}
            {table.getColumn('status') && (
              <DataTableFacetedFilter
                column={table.getColumn('status')}
                title="Status"
                options={statuses}
              />
            )} */}

            <DataTableViewOptions table={table} className="hidden sm:flex" />

            {/* {setRowSelection && selectedRowIds && selectedRowIds.length > 0 && (
              <DeleteFeedbackItemsSheet
                feedbackItemIds={selectedRowIds}
                setRowSelection={setRowSelection}
              >
                <Button
                  variant="destructive"
                  asChild
                  onClick={() => {
                    // Add your logic for deleting selected items here
                  }}
                  className="h-8 px-2 lg:px-3"
                >
                  <span>Delete {selectedRowIds.length} selected</span>
                </Button>
              </DeleteFeedbackItemsSheet>
            )} */}
          </div>
          <DataTableViewOptions table={table} className="flex sm:hidden" />
        </div>
      </div>
    </div>
  );
}
