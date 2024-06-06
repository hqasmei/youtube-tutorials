'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Doc } from '@/convex/_generated/dataModel';
import { getImageUrl } from '@/lib/get-image-url';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTableColumnHeader } from './data-table-column-header';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<Doc<'people'>>[] = [
  {
    accessorKey: 'fullname',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => {
      const imageUrl = getImageUrl(row.original.image as string);
      console.log(imageUrl);
      return (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={imageUrl} alt={row.getValue('fullname')} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="flex items-center">{row.getValue('fullname')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'birthday',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Birthday" />
    ),
    cell: ({ row }) => {
      const reformattedBirthday = format(
        new Date(row.getValue('birthday')),
        'MMMM dd, yyyy',
      );
      return <span className="flex items-center">{reformattedBirthday}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
