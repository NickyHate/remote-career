import {
  Baby,
  CalendarClock,
  ChevronDown,
  Hotel,
  Plane,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { CopyResume } from "@/components/copy-resume";
import { JobCatalog } from "@/components/job-catalog";
import { plan, redFlags, searches, skills, windows } from "@/lib/data";

const nav = [
  { href: "#reality", label: "Реальность" },
  { href: "#jobs", label: "Вакансии" },
  { href: "#paths", label: "Куда уйти" },
  { href: "#plan", label: "Месяц" },
  { href: "#caution", label: "Не брать" },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-30 border-b border-foreground/8 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <a href="#top" className="flex items-center gap-2 font-medium">
            <span className="flex size-8 items-center justify-center rounded-full bg-navy text-primary-foreground">
              <Plane className="size-4" />
            </span>
            <span className="font-heading text-lg">На земле</span>
          </a>
          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#jobs"
            className="rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground"
          >
            Смотреть работы
          </a>
        </div>
      </header>

      <main id="top" className="flex-1">
        <section className="flight-path border-b border-foreground/8">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs tracking-[0.18em] text-copper uppercase ring-1 ring-foreground/8">
                <Plane className="size-3.5" />
                Северсталь Авиа · мама · 3,5 года
              </p>
              <h1 className="font-heading mt-5 max-w-xl text-4xl leading-[1.12] text-navy sm:text-5xl lg:text-6xl">
                Удалёнка, которая не спорит с ростером и детским садом
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Вы бортпроводник, график меняется каждую неделю, дома ребёнок
                3,5 лет. Нужна подработка уже сейчас — и понятная профессия, в
                которую можно уйти с линии, когда будете готовы. Здесь не мечты
                про «150 тысяч с телефона», а работы, которые реально закрывают
                кусками.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#jobs"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
                >
                  Вакансии на эту неделю
                </a>
                <a
                  href="#plan"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-card px-5 text-sm font-medium ring-1 ring-foreground/10"
                >
                  План на 30 дней
                </a>
              </div>
            </div>

            <aside className="relative">
              <div className="rounded-3xl bg-navy p-6 text-primary-foreground shadow-[0_30px_80px_-40px_rgba(24,39,71,0.9)] sm:p-8">
                <p className="font-mono text-[11px] tracking-[0.25em] text-primary-foreground/55 uppercase">
                  Посадочный · NZ 350
                </p>
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-[11px] tracking-widest text-primary-foreground/50 uppercase">
                      Откуда
                    </p>
                    <p className="font-heading mt-1 text-2xl">Борт</p>
                    <p className="text-sm text-primary-foreground/65">
                      Северсталь Авиа
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] tracking-widest text-primary-foreground/50 uppercase">
                      Куда
                    </p>
                    <p className="font-heading mt-1 text-2xl">Земля</p>
                    <p className="text-sm text-primary-foreground/65">
                      Удалёнка + новая сфера
                    </p>
                  </div>
                </div>
                <div className="mt-6 border-t border-dashed border-primary-foreground/20 pt-5 text-sm leading-relaxed text-primary-foreground/80">
                  Правило гида: сначала деньги в асинхронных задачах. Потом —
                  одна профессия на выход. Не обе сразу в полный рост.
                </div>
              </div>
              <div className="absolute -bottom-5 -left-3 hidden rotate-[-6deg] rounded-2xl bg-card px-4 py-3 text-sm shadow-lg ring-1 ring-foreground/10 sm:block">
                6–12 часов в неделю · без колл-центра
              </div>
            </aside>
          </div>
        </section>

        <section id="reality" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
          <p className="text-xs tracking-[0.22em] text-copper uppercase">
            Сначала рамка
          </p>
          <h2 className="font-heading mt-1 text-3xl text-navy sm:text-4xl">
            Что в вашей жизни нельзя игнорировать
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: CalendarClock,
                title: "Ростер каждую неделю другой",
                text: "Нельзя брать офис 9–18, колл-центр и «будьте на линии к восьми». Подойдёт то, что живёт дедлайнами и пакетами задач.",
              },
              {
                icon: Baby,
                title: "Ребёнку 3,5 года",
                text: "Дома внимание рвётся. Работает тихий час, вечер без выгорания и дни, когда малыш с близкими. Ночные подвиги — плохая стратегия.",
              },
              {
                icon: Hotel,
                title: "Гостиница — ваш тихий офис",
                text: "Пока ребёнок с семьёй, слот между рейсами часто спокойнее, чем выходной дома. Тексты и отклики — туда.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10"
              >
                <item.icon className="size-5 text-copper" />
                <h3 className="font-heading mt-4 text-xl text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-2xl text-navy">
              Это у вас уже есть — курсы это не дадут
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div key={skill.title} className="border-t border-foreground/10 pt-4">
                  <p className="font-medium">{skill.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {skill.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 overflow-x-auto rounded-2xl ring-1 ring-foreground/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="bg-card px-5 py-4 text-left font-heading text-xl text-navy">
                Окна, в которые вообще можно работать
              </caption>
              <thead className="bg-muted/60 text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium">Когда</th>
                  <th className="px-5 py-3 font-medium">Сколько</th>
                  <th className="px-5 py-3 font-medium">Что туда класть</th>
                </tr>
              </thead>
              <tbody className="bg-card">
                {windows.map((row) => (
                  <tr key={row.when} className="border-t border-foreground/8">
                    <td className="px-5 py-3 font-medium">{row.when}</td>
                    <td className="px-5 py-3 text-copper">{row.time}</td>
                    <td className="px-5 py-3 text-muted-foreground">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-card/40 py-16">
          <div className="mx-auto max-w-6xl px-4">
            <JobCatalog />
          </div>
        </section>

        <section id="paths" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
          <p className="text-xs tracking-[0.22em] text-copper uppercase">
            Три колеи
          </p>
          <h2 className="font-heading mt-1 max-w-2xl text-3xl text-navy sm:text-4xl">
            Куда уходить с борта, когда подработка уже не хобби
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Не надо выбирать «всю жизнь». Выберите колею на 12–18 месяцев. Все
            три можно начать с земли, не увольняясь завтра.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {[
              {
                n: "01",
                title: "Люди · HR",
                path: "Сорсер → младший рекрутер → подбор в авиации / сервисе",
                why: "Самый прямой перевод опыта борта. Авиакомпании сами берут бывших бортпроводников отбирать экипаж. Дальше — любой сервис.",
                money: "70–150 тыс. на земле через 1–2 года",
              },
              {
                n: "02",
                title: "Сервис · CX",
                path: "Письменная поддержка → старший → качество / Customer Success",
                why: "Если вам ближе «починить процесс», а не собеседовать. Жалобы, скрипты, обучение линии — вы это чувствуете телом.",
                money: "70–140 тыс., больше письменных ролей",
              },
              {
                n: "03",
                title: "Цифра · кабинеты",
                path: "Карточки → ассистент селлера → менеджер WB/Ozon",
                why: "Лучше всего дружит с плавающим графиком: дедлайны вместо смен. Если цифры не пугают, это самый «удалённый» выход.",
                money: "70–160 тыс. за свой кабинет в найме",
              },
            ].map((path) => (
              <div
                key={path.n}
                className="flex flex-col rounded-3xl bg-card p-6 ring-1 ring-foreground/10"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-copper">
                  Колея {path.n}
                </span>
                <h3 className="font-heading mt-3 text-2xl text-navy">{path.title}</h3>
                <p className="mt-2 text-sm font-medium">{path.path}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {path.why}
                </p>
                <p className="mt-5 rounded-xl bg-muted px-3 py-2 text-sm">
                  {path.money}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 max-w-3xl text-sm text-muted-foreground">
            Программирование, психология с дипломом, бухгалтерия 1С — тоже
            возможны, но это длинные учёбы при живом малыше и рейсах. Их имеет
            смысл трогать, только если очень тянет, не «потому что все идут».
          </p>

          <div className="mt-10">
            <CopyResume />
          </div>
        </section>

        <section id="plan" className="scroll-mt-24 bg-navy py-16 text-primary-foreground">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-xs tracking-[0.22em] text-primary-foreground/55 uppercase">
              Не стратегия, а календарь
            </p>
            <h2 className="font-heading mt-1 text-3xl sm:text-4xl">
              Первый месяц, если начать в ближайший выходной
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {plan.map((week) => (
                <div
                  key={week.week}
                  className="rounded-2xl bg-primary-foreground/6 p-5 ring-1 ring-primary-foreground/10"
                >
                  <p className="text-xs tracking-[0.18em] text-primary/80 uppercase">
                    {week.week}
                  </p>
                  <h3 className="font-heading mt-1 text-2xl">{week.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-primary-foreground/80">
                    {week.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {searches.map((item) => (
                <div key={item.place} className="border-t border-primary-foreground/15 pt-4">
                  <p className="font-medium">{item.place}</p>
                  <p className="mt-1 text-sm text-primary-foreground/70">{item.how}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="caution" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16">
          <div className="flex items-center gap-2 text-copper">
            <ShieldAlert className="size-5" />
            <p className="text-xs tracking-[0.22em] uppercase">Красный коридор</p>
          </div>
          <h2 className="font-heading mt-1 text-3xl text-navy sm:text-4xl">
            Это не работа, даже если написано «удалённо без опыта»
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {redFlags.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-card p-5 ring-1 ring-foreground/10"
              >
                <h3 className="font-medium text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="font-heading text-2xl text-navy">Коротко по делу</h3>
            <div className="mt-4 divide-y divide-foreground/10">
              {[
                {
                  q: "Сколько реально получить в первый месяц?",
                  a: "Если не везёт на оклад — 0–8 тысяч. Если поймали 1–2 селлера или кворки — 8–20. Это нормальный старт, не провал. Стабильные 25–40 на подработке появляются ближе ко 2–3 месяцу, когда есть повторные задачи.",
                },
                {
                  q: "Нужно ли увольняться, чтобы «войти в IT»?",
                  a: "Нет. И не нужно входить в IT, если вас туда не тянет. При вашем графике и возрасте ребёнка быстрее окупаются тексты, кабинеты маркетплейсов и HR. Код — длинный марафон.",
                },
                {
                  q: "Что сказать на собеседовании про ребёнка и рейсы?",
                  a: "Про ребёнка — ничего, пока не спросили про график. Про рейсы — правду: «работаю бортпроводником, ростер на неделю, задачи закрываю пакетами, дедлайны держу, на фиксированные слоты пока не опираемся». Скрывать авиацию не стоит: это ваш плюс.",
                },
                {
                  q: "Английский обязателен?",
                  a: "Нет. Для карточек, ассистента, сорсинга русскоязычного линейного персонала достаточно русского. Английский B2+ открывает репетиторство и международный сервис — но это бонус, не входной билет.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-2.5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-left text-sm font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="pt-1 pb-2.5 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-foreground/8 px-4 py-8 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-heading text-foreground">На земле</p>
          <p>
            Гид собран под бортпроводника «Северсталь Авиа» с ребёнком 3,5 лет.
            Зарплаты — ориентиры рынка РФ, не оффер.
          </p>
        </div>
      </footer>
    </div>
  );
}
