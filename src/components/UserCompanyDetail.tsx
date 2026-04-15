"use client"
import { CompanyItem } from "../../interfaces";
import BookButton from "./BookButton";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

export default function UserCompanyDetail({
  company,
  token,
  isAdmin, 
  showBooking = true,
  footerActions
}: {
  company: CompanyItem;
  token?: string;
  isAdmin: boolean;
  showBooking?: boolean;
  footerActions?: ReactNode;
}) {
  const iconClassName: string = "w-5 h-5 text-primary shrink-0";
  const iconProps = {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <div className="bg-surface rounded-2xl shadow-md w-[98%] max-w-4xl p-4 sm:p-6 md:p-8 relative border border-surface-border mb-10">

      <Link
        href="/companies"
        className="absolute top-5 right-5 text-primary hover:text-primary-hover transition-colors"
        title="Back"
      >
        <svg className="w-7 h-7" {...iconProps}>
          <path d="M19 12H6" />
          <path d="M12 18l-6-6 6-6" />
        </svg>
      </Link>

      <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-6">
        {/* Logo section */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-background border border-surface-border rounded-2xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm mx-auto md:mx-0">
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

        {/* Info section */}
        <div className="flex flex-col gap-2 sm:gap-4 justify-center w-full md:w-auto mt-4 md:mt-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <svg className={iconClassName} {...iconProps}>
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5"/>
            </svg>
            <span className="text-base font-bold text-foreground">{company.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <svg className={iconClassName} {...iconProps}>
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className="text-base text-foreground font-medium">
              {company.address}, {company.district}, {company.province} {company.postalcode}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <svg className={iconClassName} {...iconProps}>
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-primary font-medium hover:text-primary-hover hover:underline"
            >
              {company.website}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <svg className={iconClassName} {...iconProps}>
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span className="text-base font-medium text-foreground">{company.tel}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-1 sm:gap-2 mb-2 flex-wrap">
          <svg className={iconClassName} {...iconProps}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <path d="M14 2v6h6"/>
            <path d="M8 13h8"/>
            <path d="M8 17h8"/>
          </svg>
          <span className="font-bold text-base text-foreground">Description</span>
        </div>
        <p className="text-foreground/60 text-sm leading-relaxed font-medium">
          {company.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {[0, 1, 2].map((i: number) => (
          <div
            key={i}
            className="bg-background border border-surface-border rounded-2xl aspect-square flex items-center justify-center overflow-hidden shadow-sm"
          >
            <Image
              src={`/images/${company.id}_pic${i}.png`}
              alt={`${company.name} picture ${i}`}
              className="object-cover w-full h-full rounded-xl"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.style.display = 'none';
                const fallback: HTMLSpanElement = document.createElement('span');
                fallback.className = 'text-foreground/50 font-bold text-center text-sm';
                fallback.innerHTML = `${company.name}<br />Picture`;
                e.currentTarget.parentNode?.appendChild(fallback);
              }}
              width={0}
              height={0}
              sizes="100vw"
              priority
            />
          </div>
        ))}
      </div>

      <hr className="border-surface-border my-4" />

      {showBooking && (
        <div className="flex flex-col items-center justify-center mt-4 w-full">
          {token ? (
            <BookButton company={company} token={token} isAdmin={isAdmin} />
          ) : (
            <p className="text-foreground/40 text-sm font-medium text-center">
              Please{" "}
              <Link href="/api/auth/login" className="text-primary hover:text-primary-hover hover:underline font-bold">
                sign in
              </Link>{" "}
              to book an interview session.
            </p>
          )}
        </div>
      )}

      {footerActions && (
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 w-full">
          {footerActions}
        </div>
      )}
    </div>
  );
}