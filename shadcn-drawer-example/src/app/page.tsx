'use client';

import { useEffect, useState } from 'react';

import AddPersonForm, { formSchema } from '@/components/add-person-form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2 } from 'lucide-react';
import { z } from 'zod';

type PersonData = z.infer<typeof formSchema>;

export default function Home() {
  // Set to true to show the sheet
  const [showSheet, setShowSheet] = useState(false);
  // State to hold the loaded person data, initialized as null with type or undefined
  const [personData, setPersonData] = useState<PersonData | null>(null);

  // Function to delete person data
  const deletePersonData = () => {
    localStorage.removeItem('personData'); // Remove from localStorage
    setPersonData(null); // Update state to reflect the UI change
  };

  // Effect to load data from localStorage
  useEffect(() => {
    const loadedData = localStorage.getItem('personData');
    if (loadedData) {
      setPersonData(JSON.parse(loadedData));
    }
  }, [showSheet]);

  return (
    <main className="flex min-h-screen flex-col p-4 w-full items-center">
      <div className="max-w-5xl w-full">
        <div className="flex flex-row justify-between items-center">
          <span className="text-3xl font-bold">People</span>
          <Drawer open={showSheet} onOpenChange={setShowSheet}>
            <DrawerTrigger asChild>
              <Button>Add person</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add person</DrawerTitle>
              </DrawerHeader>

              <ScrollArea className="overflow-y-auto">
                <AddPersonForm setShowSheet={setShowSheet} />
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
        {/* Display and manage the loaded person data */}
        {personData ? (
          <Card className="mt-4 p-4 border rounded">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-bold">
                {personData.firstName} {personData.lastName}
              </p>
              <p> {personData.bio}</p>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={deletePersonData}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-24">
            <span className="text-lg font-meidum text-center">
              No people added yet
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
