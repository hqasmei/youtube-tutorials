'use client';

import React, { PropsWithChildren } from 'react';

import { useParams } from 'next/navigation';

import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useQuery } from 'convex/react';

export function PeopleProvider({ children }: PropsWithChildren) {
  const people = useQuery(api.people.getPeople);

  return (
    <PeopleContext.Provider value={people}>{children}</PeopleContext.Provider>
  );
}

export const PeopleContext = React.createContext<
  typeof api.people.getPeople._returnType | undefined
>([]);
