import Link from "next/link";
import Image from "next/image";
import { CompanyItem } from "../../interfaces";

export default function CompanyCard({ company }: { company: CompanyItem }) {
  return (
    <Link
      href={`/companies/${company.id}`}
      className="flex flex-col rounded-2xl border border-surface-border bg-surface shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
    >
      {/* Top: logo + info side by side */}
      <div className="flex flex-1 p-4 gap-4">
        
        <div className="w-32 h-32 shrink-0 rounded-2xl bg-background border border-surface-border shadow-sm flex items-center justify-center text-center text-[11px] text-foreground/45 font-bold tracking-wide overflow-hidden">
          <Image
            src={`/images/${company.id}.png`}
            alt={company.name + " logo"}
            className="object-cover w-full h-full"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.style.display = 'none';
              const fallback: HTMLSpanElement = document.createElement('span');
              fallback.className = 'text-foreground/50 font-bold text-center text-sm';
              fallback.innerHTML = `LOGO<br />${company.name}`;
              e.currentTarget.parentNode?.appendChild(fallback);
            }}
            width={0}
            height={0}
            sizes="100vw"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 text-base font-bold tracking-wide text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5" />
            </svg>
            <span className="truncate">{company.name}</span>
          </div>

          <div className="flex items-start gap-1.5 text-xs font-medium tracking-wide text-foreground/65">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-2">
              {company.address && `${company.address}, `}
              {company.district && `${company.district}, `}
              {company.province && `${company.province} `}
              {company.postalcode && `${company.postalcode}`}
            </span>
          </div>

          {company.website && (
            <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="truncate text-primary hover:underline">{company.website}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-foreground/55">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{company.tel}</span>
          </div>
        </div>
      </div>

      <div className="text-right px-4 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground/45 border-t border-surface-border bg-foreground/5">
        Click for more details
      </div>
    </Link>
  );
}