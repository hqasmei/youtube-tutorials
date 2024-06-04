import React from 'react';

import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials, getPerson } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export default function CardPage({ params }: { params: { cardId: string } }) {
  const { cardId } = params;
  const person = getPerson(cardId);

  return (
    <div className="w-full container mx-auto">
      <Link
        href="/card"
        className="mb-6 flex flex-row items-center space-x-1 group"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 duration-200 transition-all"
        />
        <span>Back</span>
      </Link>
      <div className="flex flex-col items-start justify-between flex-1 h-full">
        <div className="flex flex-row items-center space-x-2 mb-2 ">
          <Avatar>
            <AvatarImage src={person?.image} alt={person?.name} />
            {person && (
              <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <h2 className="font-bold text-md">{person?.name}</h2>
            <span className="text-neutral-500 text-sm">{person?.role}</span>
          </div>
        </div>

        <p>{person?.description}</p>
      </div>
    </div>
  );
}
