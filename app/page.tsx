import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-row">
        <Input />
        <Button>
          <Send className="h-4 w-4"/>
        </Button>
        </div>
      </main>
    </div>
  );
}
