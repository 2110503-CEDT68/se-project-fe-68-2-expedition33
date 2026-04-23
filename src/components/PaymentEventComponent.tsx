interface PaymentEvent {
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

interface PaymentEventProps {
  events: PaymentEvent[];
}

export default function PaymentEventComponent({ events }: Readonly<PaymentEventProps>) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <span className="text-button-green text-2xl">✓</span>;
      case 'pending':
        return <span className="text-yellow-500 text-2xl">⏳</span>;
      case 'failed':
        return <span className="text-button-red text-2xl">✕</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-black mb-6 flex items-center gap-2">
        <span>⏱</span> Payment Events
      </h2>
      
      <div className="relative">
        {/* Timeline */}
        <div className="space-y-6">
          {events.map((event, index) => {
            
            let statusClasses;

            if (event.status === 'success')
              statusClasses = 'bg-button-green/20 border-button-green';
            else if (event.status === 'pending')
              statusClasses = 'bg-yellow-100 border-yellow-500';
            else
              statusClasses = 'bg-button-red/20 border-button-red';

            let lineClasses;
            if (event.status === 'success')
              lineClasses = 'bg-button-green';
            else if (event.status === 'pending')
              lineClasses = 'bg-yellow-500';
            else
              lineClasses = 'bg-button-red';

            return (
              <div key={`${event.timestamp}-${event.title}`} className="flex gap-4">
              {/* Timeline dot and line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${statusClasses}`}
                >
                  {getStatusIcon(event.status)}
                </div>
                {index < events.length - 1 && (
                  <div
                    className={`w-1 h-12 mt-2 ${lineClasses}`}
                  />
                )}
              </div>

              {/* Event content */}
              <div className="flex-1 pt-2">
                <h3 className="text-lg font-bold text-black">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{event.description}</p>
                <p className="text-gray-500 text-xs">{event.timestamp}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
