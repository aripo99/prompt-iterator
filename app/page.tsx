'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

import React from 'react';
import { TextDiff } from './components/text-diff';
import { generatePrompt } from '@/lib/actions/generate-prompt';

export default function Home() {
  const [previousPrompt, setPreviousPrompt] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGeneratePrompt() {
    setLoading(true);
    setPreviousPrompt(generatedPrompt);
    const prompt = await generatePrompt(input);
    setGeneratedPrompt(prompt);
    setInput("");
    setLoading(false);
  }

  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {loading && <p>Loading...</p>}
        {generatedPrompt && !loading &&
          <div className="flex flex-col gap-4 items-center">
            <TextDiff oldText={previousPrompt} newText={generatedPrompt} />
          </div>
        }
        <div className="flex flex-row">
          <Input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <Button onClick={handleGeneratePrompt}>
            <Send className="h-4 w-4"/>
          </Button>
        </div>
      </main>
    </div>
  );
}
