interface DateListProps {
  dates: { date: number; month: string }[];
  onAddMore?: () => void;
}

export default function DateListComponent({ dates, onAddMore }: Readonly<DateListProps>) {
  return (
    <div className="bg-surface border border-surface-border rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span>📅</span> Date List
        </h2>
        <button
          onClick={onAddMore}
          className="text-primary hover:text-primary-hover font-semibold text-sm"
        >
          Add Additional Dates (THB 300 per day)
        </button>
      </div>
      
      <div className="flex gap-4 flex-wrap">
        {dates.map((date, index) => (
          <button
            key={`${date.month}-${date.date}`}
            className={`py-4 px-6 rounded-lg font-semibold text-center text-white transition-all ${
              index === 1 || index === 2
                ? 'bg-primary hover:bg-primary-hover'
                : 'bg-primary/60 hover:bg-primary/80'
            }`}
          >
            <div className="text-lg font-bold">{date.date}</div>
            <div className="text-sm">{date.month}</div>
            <div className="text-xs">2022</div>
          </button>
        ))}
      </div>
    </div>
  );
}
