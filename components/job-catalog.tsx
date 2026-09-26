"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  PhoneOff,
  Smartphone,
  Timer,
  CalendarRange,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { jobs, type Job, type Stage } from "@/lib/data";
import { cn } from "@/lib/utils";

const stages: { id: Stage | "all"; label: string; hint: string }[] = [
  { id: "all", label: "Все", hint: "16 направлений" },
  { id: "now", label: "Уже сейчас", hint: "с этой недели" },
  { id: "learn", label: "За 2–3 месяца", hint: "учёба по вечерам" },
  { id: "career", label: "Уйти с борта", hint: "новая профессия" },
];

const filters = [
  { id: "noCalls", label: "Без звонков", icon: PhoneOff },
  { id: "chunks", label: "Кусками по 20–40 мин", icon: Timer },
  { id: "phoneOk", label: "Можно с телефона", icon: Smartphone },
  { id: "rosterOk", label: "Живёт со сменным графиком", icon: CalendarRange },
] as const;

type FilterId = (typeof filters)[number]["id"];

const EMPTY_SHORTLIST: string[] = [];
let shortlistCacheRaw: string | null = null;
let shortlistCache: string[] = EMPTY_SHORTLIST;

function readShortlist(): string[] {
  try {
    const raw = window.localStorage.getItem("na-zemle-shortlist") ?? "";
    if (raw === shortlistCacheRaw) return shortlistCache;
    shortlistCacheRaw = raw;
    if (!raw) {
      shortlistCache = EMPTY_SHORTLIST;
      return shortlistCache;
    }
    const parsed = JSON.parse(raw) as unknown;
    shortlistCache = Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : EMPTY_SHORTLIST;
    return shortlistCache;
  } catch {
    shortlistCacheRaw = null;
    shortlistCache = EMPTY_SHORTLIST;
    return shortlistCache;
  }
}

function subscribeShortlist(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("na-zemle-shortlist", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("na-zemle-shortlist", onStoreChange);
  };
}

function writeShortlist(next: string[]) {
  window.localStorage.setItem("na-zemle-shortlist", JSON.stringify(next));
  window.dispatchEvent(new Event("na-zemle-shortlist"));
}

function stageLabel(stage: Stage) {
  if (stage === "now") return "Старт сразу";
  if (stage === "learn") return "Освоить";
  return "Профессия";
}

function JobCard({
  job,
  saved,
  onToggle,
}: {
  job: Job;
  saved: boolean;
  onToggle: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={cn(
        "ticket-notch overflow-hidden rounded-2xl bg-ticket text-card-foreground shadow-[0_18px_50px_-28px_rgba(47,55,80,0.45)] ring-1 ring-foreground/10",
        saved && "ring-2 ring-primary/40",
      )}
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            Рейс {job.code}
          </p>
          <h3 className="font-heading mt-1 text-xl leading-tight text-navy">
            {job.title}
          </h3>
        </div>
        <Button
          variant={saved ? "default" : "outline"}
          size="icon"
          aria-label={saved ? "Убрать из короткого списка" : "Сохранить"}
          onClick={onToggle}
        >
          {saved ? <BookmarkCheck /> : <Bookmark />}
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 px-5">
        <div>
          <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
            Вылет
          </p>
          <p className="mt-0.5 font-medium">{stageLabel(job.stage)}</p>
        </div>
        <div>
          <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
            При {job.stage === "career" ? "полной ставке" : "подработке"}
          </p>
          <p className="mt-0.5 font-medium text-copper">
            {job.stage === "career" ? job.payFull : job.payNow}
          </p>
        </div>
      </div>

      <div className="relative mx-5 mt-5 border-t border-dashed border-foreground/20">
        <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-primary/80" />
      </div>

      <div className="flex flex-wrap gap-1.5 px-5 pt-4">
        {job.noCalls && (
          <Badge variant="secondary">без звонков</Badge>
        )}
        {job.chunks && <Badge variant="secondary">кусками</Badge>}
        {job.phoneOk && <Badge variant="secondary">с телефона</Badge>}
        {job.rosterOk ? (
          <Badge variant="secondary">под ростер</Badge>
        ) : (
          <Badge variant="outline">нужны слоты</Badge>
        )}
        <Badge variant="outline">{job.hours}</Badge>
      </div>

      <p className="px-5 pt-4 text-sm leading-relaxed text-muted-foreground">
        {job.whyFits}
      </p>

      <div className="px-5 pt-4 pb-5">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Свернуть" : "Как начать и куда откликаться"}
        </Button>
      </div>

      {open && (
        <div className="space-y-4 border-t bg-muted/40 px-5 py-5 text-sm">
          <div>
            <p className="font-medium text-navy">Что уже есть с борта</p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              {job.fromCabin}
            </p>
          </div>
          <div>
            <p className="font-medium text-navy">Что делать</p>
            <ul className="mt-1 list-disc space-y-1 pl-4 text-muted-foreground">
              {job.tasks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-navy">Первый шаг</p>
            <ol className="mt-1 list-decimal space-y-1 pl-4 text-muted-foreground">
              {job.start.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          {job.stage !== "career" && (
            <p className="text-muted-foreground">
              На полной ставке позже:{" "}
              <span className="font-medium text-foreground">{job.payFull}</span>
            </p>
          )}
          <p className="rounded-lg bg-background/80 p-3 leading-relaxed">
            <span className="font-medium">Осторожно. </span>
            {job.caution}
          </p>
          <div className="flex flex-col gap-2">
            {job.search.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "justify-between",
                )}
              >
                {link.label}
                <ExternalLink className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export function JobCatalog() {
  const [stage, setStage] = useState<Stage | "all">("now");
  const [active, setActive] = useState<FilterId[]>([]);
  const saved = useSyncExternalStore(
    subscribeShortlist,
    readShortlist,
    () => EMPTY_SHORTLIST,
  );
  const [onlySaved, setOnlySaved] = useState(false);

  const visible = useMemo(() => {
    return jobs.filter((job) => {
      if (onlySaved && !saved.includes(job.id)) return false;
      if (stage !== "all" && job.stage !== stage) return false;
      return active.every((key) => job[key]);
    });
  }, [stage, active, onlySaved, saved]);

  function toggleFilter(id: FilterId) {
    setActive((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function toggleSaved(id: string) {
    writeShortlist(
      saved.includes(id) ? saved.filter((x) => x !== id) : [...saved, id],
    );
  }

  return (
    <section id="jobs" className="scroll-mt-24">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs tracking-[0.22em] text-copper uppercase">
            Подбор рейса
          </p>
          <h2 className="font-heading mt-1 text-3xl text-navy sm:text-4xl">
            Что можно делать руками уже сейчас
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Цифры — честные для России, не «150 тысяч с телефона». Подработка
            считается на 6–15 часов в неделю, пока вы на линии. Полная ставка —
            ориентир, когда уйдёте с борта.
          </p>
        </div>
        {saved.length > 0 && (
          <Button
            variant={onlySaved ? "default" : "outline"}
            onClick={() => setOnlySaved((v) => !v)}
          >
            Короткий список · {saved.length}
          </Button>
        )}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
        {stages.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setStage(item.id);
              setOnlySaved(false);
            }}
            className={cn(
              "min-w-fit rounded-2xl px-4 py-3 text-left ring-1 transition-colors",
              stage === item.id && !onlySaved
                ? "bg-navy text-primary-foreground ring-navy"
                : "bg-card text-foreground ring-foreground/10 hover:bg-muted",
            )}
          >
            <span className="block text-sm font-medium">{item.label}</span>
            <span className="block text-xs opacity-70">{item.hint}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((item) => {
          const Icon = item.icon;
          const on = active.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleFilter(item.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ring-1 transition-colors",
                on
                  ? "bg-primary text-primary-foreground ring-primary"
                  : "bg-card ring-foreground/10 hover:bg-muted",
              )}
            >
              <Icon className="size-3.5" />
              {item.label}
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-card p-8 text-center ring-1 ring-foreground/10">
          <p className="font-heading text-xl text-navy">Пусто по фильтрам</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Снимите одну галочку — чаще всего мешает «можно с телефона» вместе с
            «без звонков».
          </p>
          <Button className="mt-4" variant="outline" onClick={() => setActive([])}>
            Сбросить фильтры
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {visible.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              saved={saved.includes(job.id)}
              onToggle={() => toggleSaved(job.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
