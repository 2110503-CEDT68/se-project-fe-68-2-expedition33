import { PaymentEvent } from "@/../interfaces";

// The 3 "happy path" steps that always render
const STEPS = [
  {
    eventType: "PAYMENT_INITIATED" as const,
    title: "Payment Created",
    description: "Your payment has been created. Waiting for confirmation.",
  },
  {
    eventType: "PAYMENT_AUTHORIZED" as const,
    title: "Payment Authorized",
    description: "Please confirm or cancel your payment.",
  },
  {
    eventType: "PAYMENT_SUCCESS" as const,
    title: "Payment Completed",
    description: "Your payment was successful.",
  },
];

const FAILURE_TITLE: Record<string, string> = {
  PAYMENT_CANCELLED: "Payment Cancelled",
  PAYMENT_FAILED: "Payment Failed",
};

const FAILURE_DESC: Record<string, string> = {
  PAYMENT_CANCELLED: "Your payment has been cancelled.",
  PAYMENT_FAILED: "Your payment has failed.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  });
}

/* ── Icon SVGs ─────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12l5 5L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="white" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ── Main component ────────────────────────────────────── */

export default function PaymentEventLog({ events }: Readonly<{ events: PaymentEvent[] }>) {

  // Build a lookup: eventType → actual event (for timestamps)
  const eventMap = new Map<string, PaymentEvent>();
  for (const e of events) {
    eventMap.set(e.eventType, e);
  }

  // Check if there's a failure event
  const failureEvent = events.find(
    (e) => e.eventType === "PAYMENT_FAILED" || e.eventType === "PAYMENT_CANCELLED"
  );

  // Build timeline rows
  type TimelineRow = {
    key: string;
    title: string;
    description: string;
    timestamp: string | null;
    reached: boolean;
    isFailed: boolean;
    isLast: boolean;
  };

  const rows: TimelineRow[] = [];

  for (const step of STEPS) {
    const actual = eventMap.get(step.eventType);

    // If this payment failed/cancelled, stop before "Payment Completed"
    if (failureEvent && step.eventType === "PAYMENT_SUCCESS") break;

    rows.push({
      key: step.eventType,
      title: step.title,
      description: step.description,
      timestamp: actual ? formatDate(actual.createdAt) : null,
      reached: !!actual,
      isFailed: false,
      isLast: false,
    });
  }

  // Append the failure row if present
  if (failureEvent) {
    rows.push({
      key: failureEvent.eventType,
      title: FAILURE_TITLE[failureEvent.eventType] || "Payment Error",
      description: FAILURE_DESC[failureEvent.eventType] || "An error occurred.",
      timestamp: formatDate(failureEvent.createdAt),
      reached: true,
      isFailed: true,
      isLast: false,
    });
  }

  // Mark the last row
  if (rows.length > 0) {
    rows.at(-1)!.isLast = true;
  }

  // Find the index of the last reached step (to colour lines correctly)
  let lastReachedIndex = -1;
  for (let i = rows.length - 1; i >= 0; i--) {
    if (rows[i].reached) {
      lastReachedIndex = i;
      break;
    }
  }

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
        {rows.map((row, index) => {
          // Dot colour
          let dotClass = "bg-foreground/20"; // grey (not reached)
          if (row.reached && row.isFailed) {
            dotClass = "bg-button-red";
          } else if (row.reached) {
            dotClass = "bg-button-green";
          }

          // Line colour: green if this line leads to a reached step, grey otherwise
          // The line below row[i] connects to row[i+1].
          // It should be coloured if the current step AND the next step are both reached.
          let lineClass = "bg-foreground/20"; // grey
          if (row.reached && index + 1 <= lastReachedIndex) {
            // Next step is also reached — the line between them is coloured
            const nextRow = rows[index + 1];
            if (nextRow?.isFailed) {
              lineClass = "bg-button-red";
            } else {
              lineClass = "bg-button-green";
            }
          }

          return (
            <div key={row.key} className="flex gap-4">
              {/* Dot + connector */}
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${dotClass}`}>
                  {row.reached && (row.isFailed ? <CrossIcon /> : <CheckIcon />)}
                </div>
                {!row.isLast && (
                  <div className={`w-0.5 flex-1 min-h-7 my-1 ${lineClass}`} />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 flex items-start justify-between gap-4 ${row.isLast ? 'pb-5' : ''}`}>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">{row.title}</p>
                  <p className="text-xs text-foreground/40 mt-0.5">{row.description}</p>
                </div>
                <p className="text-sm text-foreground/40 whitespace-nowrap shrink-0 pt-0.5">
                  {row.timestamp || "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
