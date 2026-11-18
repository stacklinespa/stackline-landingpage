const MARQUEE_ITEMS = [
  "SOFTWARE A MEDIDA",
  "SISTEMAS EMPRESARIALES",
  "PLATAFORMAS WEB & SAAS",
  "EMPRESA JOVEN",
  "TRATO DIRECTO CON INGENIERÍA",
  "CÓDIGO 100% PROPIO",
];

export function KineticMarquee() {
  return (
    <div
      aria-hidden="true"
      className="marquee-wrapper overflow-hidden bg-accent py-4 text-white select-none"
    >
      <div className="animate-studio-marquee flex w-max items-center">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {MARQUEE_ITEMS.map((item) => (
              <span
                key={`${dup}-${item}`}
                className="flex items-center gap-6 pr-6 font-display text-sm font-bold tracking-[0.06em] sm:gap-8 sm:pr-8 sm:text-base"
              >
                <span>{item}</span>
                <svg viewBox="0 0 18 16" fill="none" className="h-3.5 w-auto opacity-85">
                  <path
                    d="M1 8.5L16.5 1.5L13.2 14.5L9.2 10L4.8 13L6.2 8.8L1 8.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
