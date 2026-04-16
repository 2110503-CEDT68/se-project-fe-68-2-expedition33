import Image from "next/image";
import { UserItem } from "../../interfaces";
import ProfileCard from "./ProfileCard";

export default function UserProfile({ user }: Readonly<{ user: UserItem }>) {
  return (
    <>
      <div className="w-full max-w-3xl flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase mb-10 drop-shadow-sm">
          User Profile
        </h1>

        <ProfileCard user={user} />

      </div>

      <div className="mt-auto relative w-62.5 md:w-100 h-62.5 md:h-87.5 opacity-90 z-0 pointer-events-none">
        <Image
          src="/images/people-stance.svg"
          alt="Profile Background Decoration"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>
    </>
  );
}