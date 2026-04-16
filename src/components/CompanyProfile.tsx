"use client";

import Image from "next/image";
import { UserItem } from "../../interfaces";
import ProfileCard from "./ProfileCard";

export default function CompanyProfile({ user }: Readonly<{ user: UserItem }>) {

  return (
    
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
    <h1 className="col-span-5 text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase drop-shadow-sm">
          Company Profile
        </h1>
      {/* ── Left: Company Profile ── */}
      <div className="flex flex-col items-center col-span-2">
        

        <ProfileCard user={user} />

        {/* Illustration */}
        <div className="mt-auto relative w-62.5 md:w-100 h-62.5 md:h-87.5 opacity-90 pointer-events-none">
          <Image
            src="/images/people-stance.svg"
            alt="Admin illustration"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div>
      </div>

      {/* ── Right: Company INFO ── */}
      <div className="flex flex-col items-center col-span-3">

        <div className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-5 shadow-xl backdrop-blur-sm">
          <div className="flex flex-column">
            <div className="flex-0 rounded-3xl w-auto h-auto bg-gray-200 p-10 text-4xl">
              Logo
            </div>
            <div className="flex-1 rounded-3xl w-auto h-auto bg-gray-200 p-5 text-xl ml-5">
              <div className="grid grid-cols-[80px_20px_1fr] md:grid-cols-[100px_30px_1fr] gap-y-4 md:gap-y-1 items-center text-lg md:text-md ">
                <span className="text-primary tracking-widest text-right">
                  Name
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide capitalize">
                  Example Name
                </span>

                <span className="text-primary tracking-widest text-right">
                  Address
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide">
                  Example Address
                </span>

                <span className="text-primary tracking-widest text-right">
                  Website
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide break-all">
                  ExampleWebsite.com
                </span>

                <span className="text-primary tracking-widest text-right">
                  Phone
                </span>
                <span className="text-primary/70 text-center">:</span>
                <span className="text-foreground tracking-wide">
                  0801234567
                </span>
              </div>
            </div>
          </div>

          <div className="my-5">
            <span className="text-2xl font-md text-primary">Description </span><span className="text-2xl font-md">Company A</span>
            <div className="text-sm">
              Description Company ADescription Company ADescription Company
              ADescription Company A
            </div>
          </div>

          <div className="flex flex-column border-b-2 border-surface-border pb-3">
            <div className="flex-1 rounded-3xl w-50 h-50 bg-gray-200 p-10 text-2xl m-2">
              Picture1
            </div>
            <div className="flex-1 rounded-3xl w-50 h-50 bg-gray-200 p-10 text-2xl m-2">
              Picture2
            </div>
            <div className="flex-1 rounded-3xl w-50 h-50 bg-gray-200 p-10 text-2xl m-2">
              Picture3
            </div>
          </div>

          <div className="my-5 mx-30 flex items-center ">
            {/* Update Button */}
            <button className="flex-1 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold mx-5">
              UPDATE
            </button>
            {/* Delete Button */}
            <button className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold mx-5">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
