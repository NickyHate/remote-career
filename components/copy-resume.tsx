"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeText } from "@/lib/data";

export function CopyResume() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(resumeText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-2xl bg-navy p-6 text-primary-foreground shadow-[0_18px_50px_-28px_rgba(47,55,80,0.7)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-primary-foreground/60 uppercase">
            Заготовка на hh.ru
          </p>
          <h2 className="font-heading mt-1 text-2xl sm:text-3xl">
            Как перевести борт на гражданский язык
          </h2>
        </div>
        <Button variant="secondary" onClick={copy}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Скопировано" : "Копировать"}
        </Button>
      </div>
      <pre className="mt-5 overflow-x-auto whitespace-pre-wrap font-sans text-sm leading-relaxed text-primary-foreground/90">
        {resumeText}
      </pre>
      <p className="mt-4 text-sm text-primary-foreground/65">
        Ребёнка в резюме не указывайте. На собеседовании говорите прямо: график
        авиационный, на созвоны в фиксированное время не опираемся, задачи
        закрываете пакетами.
      </p>
    </div>
  );
}
