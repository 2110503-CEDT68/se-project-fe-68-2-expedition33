"use client"
import { CompanyItem } from "../../interfaces";
import BookButton from "./BookButton";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function CompanyDetail({
  company,
  token,
  isAdmin, 
  showBookButton = true,
  footerActions
}: Readonly<{
  company: CompanyItem;
  token?: string;
  isAdmin: boolean;
  showBookButton?: boolean;
  footerActions?: ReactNode;
}>) {
  const pathname = usePathname();
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
    <div className="bg-surface rounded-2xl shadow-md w-[98%] max-w-4xl p-6 md:p-10 relative border border-surface-border mx-auto">

      {/* ปุ่ม Back */}
      { pathname !== "/api/auth/profile" &&
        <Link
          href="/companies"
          className="absolute top-6 right-6 md:top-8 md:right-8 text-primary hover:text-primary-hover transition-colors z-10 bg-surface rounded-full p-1"
          title="Go to Company List"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" {...iconProps}>
            <path d="M19 12H6" />
            <path d="M12 18l-6-6 6-6" />
          </svg>
        </Link>
      }

      {/* ── 1. Header ── */}
      <div className="flex items-center gap-3 text-primary mb-6 pr-12">
        <svg className="w-6 h-6 md:w-7 md:h-7 shrink-0" {...iconProps}>
          <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-wide truncate">
          {company.name}
        </h2>
      </div>

      <hr className="border-t-2 border-surface-border mb-8" />

      {/* ── 2. Top Info (Logo + Contact Details) ── */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center md:items-start">
        
        {/* Logo section */}
        <div className="w-40 h-40 bg-background border border-surface-border rounded-xl flex items-center justify-center shrink-0 overflow-hidden shadow-sm mx-auto md:mx-0">
          {
            company.logo?.url ?
            <Image
              src={company.logo.url}
              alt={company.name + " logo"}
              className="object-cover w-full h-full"
              width={0}
              height={0}
              sizes="100vw"
              priority
            />
            : 
            <div className="text-foreground/50 font-bold text-center text-sm">
              LOGO<br />{company.name}
            </div>
          }
        </div>

        {/* Info section */}
        <div className="flex flex-col gap-4 font-medium grow justify-center w-full text-foreground/80 md:pt-2">
          
          <div className="flex items-start gap-3">
            <svg className={iconClassName} {...iconProps}>
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span className="leading-relaxed wrap-break-word text-base">
              {company.address}, {company.district}, {company.province} {company.postalcode}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <svg className={iconClassName} {...iconProps}>
              <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
            </svg>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-primary font-medium hover:text-primary-hover hover:underline truncate max-w-md"
            >
              {company.website || `Link ${company.name}`}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <svg className={iconClassName} {...iconProps}>
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span className="text-base">{company.tel}</span>
          </div>

        </div>
      </div>

      <hr className="border-t-2 border-surface-border my-8" />

      {/* ── 3. Pictures ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-10 max-w-4xl mx-auto px-4 md:px-12">
        {[0, 1, 2].map((i: number) => (
          company.photoList?.[i]?.url ?
          <div
            key={i}
            className="rounded-2xl flex items-center justify-center overflow-hidden"
          >
            <Image
              src={company.photoList[i].url}
              alt={`${company.name} picture ${i}`}
              className="w-full h-auto rounded-2xl"
              width={600} 
              height={400} 
              sizes="100vw"
              priority
            />
          </div> 
          :
          <div
            key={i}
            className="rounded-2xl flex items-center justify-center overflow-hidden"
          >
            <div className="text-foreground/80 font-medium text-center text-base bg-surface-border/30 w-full h-full flex items-center justify-center p-4 rounded-2xl">
              {company.name}<br />Picture {i + 1}
            </div>
          </div>
        ))}
      </div>

      

      {/* ── 4. Description ── */}
      <div className="flex items-start gap-4 relative pr-6 min-h-20 mb-8">
        <svg className={`${iconClassName} mt-0.5`} {...iconProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <path d="M14 2v6h6"/>
          <path d="M16 13H8"/>
          <path d="M16 17H8"/>
          <path d="M10 9H8"/>
        </svg>
        
        <p className="leading-relaxed text-sm md:text-base pr-8 text-foreground/60 font-medium">
          {company.description || "No description available."}
        </p>
        
        {/* ขีดสีส้มแนวตั้งด้านขวาสุด */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-primary rounded-full"></div>
      </div>

      <hr className="border-t-2 border-surface-border my-8" />

      {/* ── 5. Buttons (Booking & Footer Actions) ── */}
      <div className="flex flex-col items-center justify-center gap-6 mt-6 w-full">
        {showBookButton && (
          <div className="w-full flex justify-center">
            {token ? (
              <BookButton company={company} token={token} isAdmin={isAdmin} />
            ) : (
              <p className="text-foreground/50 text-sm font-medium text-center">
                Please{" "}
                <Link href="/api/auth/login" className="text-primary hover:text-primary-hover hover:underline font-bold">
                  sign in
                </Link>{" "}
                to book an interview session.
              </p>
            )}
          </div>
        )}

        {/* ปุ่มจาก AdminCompanyDetail จะถูกนำมาโชว์ตรงนี้ */}
        {footerActions && (
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 w-full mt-2">
            {footerActions}
          </div>
        )}
      </div>

    </div>
  );
}