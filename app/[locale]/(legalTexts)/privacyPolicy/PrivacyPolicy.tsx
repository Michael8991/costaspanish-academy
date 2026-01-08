"use client";

type KVItem = { label: string; value: string };

type ItemsSection = {
  title: string;
  items: KVItem[];
};

type ParagraphsSection = {
  title: string;
  paragraphs: string[];
};

type Section = ItemsSection | ParagraphsSection;

type PrivacyPolicyContent = {
  title: string;
  intro?: string;
  sections: Section[];
};

function hasItems(section: Section): section is ItemsSection {
  return Array.isArray((section as ItemsSection).items);
}

export default function PrivacyPolicy({
  content,
}: {
  content: PrivacyPolicyContent;
}) {
  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{content.title}</h1>
        {content.intro && (
          <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            {content.intro}
          </p>
        )}
      </header>

      <div className="space-y-8">
        {content.sections.map((sec, idx) => (
          <article
            key={idx}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
          >
            <h2 className="text-lg font-semibold">{sec.title}</h2>

            {hasItems(sec) ? (
              <dl className="mt-4 space-y-3">
                {sec.items.map((it, i) => (
                  <div key={i} className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                      {it.label}
                    </dt>
                    <dd className="text-sm text-neutral-600 dark:text-neutral-300 sm:col-span-2">
                      {it.value}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="mt-4 space-y-3">
                {sec.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-sm leading-6 text-neutral-600 dark:text-neutral-300"
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
