import { PEOPLE } from '@/consts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  let initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return initials;
}

export function getPerson(id: string) {
  return PEOPLE.find((person) => person.id === id);
}
