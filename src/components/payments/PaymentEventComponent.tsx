interface PaymentEvent {
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

interface PaymentEventProps {
  events: PaymentEvent[];
}

export default function PaymentEventComponent({ events }: PaymentEventProps) {
  return (
    <div className="bg-background rounded-2xl border border-surface-border px-6 py-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-primary-light rounded-lg flex items-center justify-center">
          <svg width="20" height="20" fill="none" stroke="var(--primary)" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M12 2l4.5 2.6v5.2L12 12.4 7.5 9.8V4.6L12 2z" strokeLinejoin="round" />
            <path d="M12 12.4v9.2M16.5 9.8l4 2.3M7.5 9.8l-4 2.3" opacity="0.4" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-foreground">Payment Events</h2>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4">
            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                  event.status === 'success'
                    ? 'bg-button-green'
                    : event.status === 'pending'
                    ? 'bg-yellow-400'
                    : 'bg-button-red'
                }`}
              >
                <svg
                  width="13"
                  height="13"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12l5 5L19 7" />
                </svg>
              </div>
              {index < events.length - 1 && (
                <div className="w-0.5 flex-1 min-h-[28px] bg-button-green my-1" />
              )}
            </div>

            {/* Content */}
            <div
              className={`flex-1 flex items-start justify-between gap-4 ${
                index < events.length - 1 ? 'pb-5' : ''
              }`}
            >
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">{event.title}</p>
                <p className="text-xs text-foreground/40 mt-0.5">{event.description}</p>
              </div>
              <p className="text-sm text-foreground/40 whitespace-nowrap flex-shrink-0 pt-0.5">
                {event.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
