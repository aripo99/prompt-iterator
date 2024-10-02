'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

import React from 'react';
import { TextDiff } from './components/text-diff';

export default function Home() {
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);

  function handleGeneratePrompt() {
    setGeneratedPrompt('This is a generated prompt');
  }

  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {generatedPrompt && 
          <div className="flex flex-col gap-4 items-center">
            <TextDiff oldText="Something Completely Different" newText={generatedPrompt} />
          </div>
        }
        <div className="flex flex-row">
          <Input />
          <Button onClick={handleGeneratePrompt}>
            <Send className="h-4 w-4"/>
          </Button>
        </div>
      </main>
    </div>
  );
}
