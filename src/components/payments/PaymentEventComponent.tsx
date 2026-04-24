import { PaymentEvent } from "@/../interfaces";

export default function PaymentEventComponent({ events }: Readonly<{ events: PaymentEvent[] }>) {


  const getDescription = (event: PaymentEvent) => {
    
    const eventTitleMap: Record<PaymentEvent["eventType"], string> = {
        PAYMENT_INITIATED: "Payment Created",
        PAYMENT_AUTHORIZED: "Payment Authorized",
        PAYMENT_SUCCESS: "Payment Completed",
        PAYMENT_CANCELLED: "Payment Cancelled",
        PAYMENT_FAILED: "Payment Failed",
    };
    const eventDescriptionMap: Record<PaymentEvent["eventType"], string> = {
        PAYMENT_INITIATED: "Your payment has been created.",
        PAYMENT_AUTHORIZED: "Please confirm or cancel your payment.",
        PAYMENT_SUCCESS: "Your payment was successful.",
        PAYMENT_CANCELLED: "Your payment has been cancelled.",
        PAYMENT_FAILED: "Your payment has failed.",
    };


    const title = eventTitleMap[event.eventType] || "Unknown Event";
    const description = eventDescriptionMap[event.eventType] || "Unknow Event has occured.";

    return { title, description };
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
        {events.map((event, index) => {
          const statusColor = (event.eventType === "PAYMENT_FAILED" || event.eventType === "PAYMENT_CANCELLED")
            ? 'bg-button-red'
            : 'bg-button-green';

          const isLast = index === events.length - 1;
          const { title, description } = getDescription(event);

          return (
            <div key={`${title}-${event.createdAt}`} className="flex gap-4">
            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  statusColor}`}
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
              {!isLast && (
                <div className="w-0.5 flex-1 min-h-7 bg-button-green my-1" />
              )}
            </div>

            {/* Content */}
            <div
              className={`flex-1 flex items-start justify-between gap-4 ${
                isLast ? 'pb-5' : ''
              }`}
            >
              <div>
                <p className="text-sm font-bold text-foreground leading-tight">{title}</p>
                <p className="text-xs text-foreground/40 mt-0.5">{description}</p>
              </div>
              <p className="text-sm text-foreground/40 whitespace-nowrap shrink-0 pt-0.5">
                {event.createdAt}
              </p>
            </div>
          </div>
          );
        })}
      </div>
    </div>
  );
}
