export default function DateListComponent({ 
  dates, 
  onAddMore 
}: 
Readonly<{
  dates: string[],
  onAddMore?: () => void; 
}>) {
  return (
    <div className="bg-background rounded-2xl border border-surface-border px-6 py-5 mb-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center">
            <svg width="18" height="18" fill="none" stroke="var(--primary)" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-foreground">Date List</h2>
        </div>
        <button
          onClick={onAddMore}
          className="text-primary hover:text-primary-hover font-semibold text-sm transition-colors"
        >
          {"Add Additional Dates (THB 300 per day)"}
        </button>
      </div>

      {/* Date chips */}
      <div className="flex items-center gap-3 flex-wrap">
        {dates.map((date, index) => {
          const dateObj = new Date(date);
          const day = dateObj.toLocaleString("en-GB", { day: "numeric" });
          const month = dateObj.toLocaleString("en-GB", { month: "long" });
          const year = dateObj.toLocaleString("en-GB", { year: "numeric" });
          return (
            <button
              key={date}
              className={`flex items-center gap-2 border rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                index === 1
                  ? 'border-primary text-primary bg-background'
                  : 'border-surface-border text-foreground bg-background hover:border-primary/50'
              }`}
            >
              <svg
                width="16"
                height="16"
                fill="none"
                stroke={index === 1 ? 'var(--primary)' : 'var(--foreground)'}
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                className={index === 1 ? 'date-icon-active' : 'date-icon-inactive'}
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              {day} {month} {year}
            </button>
          );
        })}
        {/* trailing line */}
        <div className="flex-1 h-px bg-surface-border min-w-10" />
      </div>
    </div>
  );
}
