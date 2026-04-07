import Image from "next/image";
import { UserItem } from "../../interfaces";

interface Props {
  user: UserItem;
}

export default function UserProfile({ user }: Props) {
  return (
    <>
      <div className="w-full max-w-3xl flex flex-col items-center z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">

        <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-widest uppercase mb-10 drop-shadow-sm">
          User Profile
        </h1>

        <div className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-[80px_20px_1fr] md:grid-cols-[100px_30px_1fr] gap-y-6 md:gap-y-8 items-center text-lg md:text-xl font-bold">

            <span className="text-primary tracking-widest text-right">Name</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide">{user.name}</span>

            <span className="text-primary tracking-widests text-right">Email</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide break-all">{user.email}</span>

            <span className="text-primary tracking-widest text-right">Tel</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide">{user.tel}</span>

            <span className="text-primary tracking-widest text-right">Role</span>
            <span className="text-primary/70 text-center">:</span>
            <span className="text-foreground tracking-wide capitalize">{user.role}</span>

          </div>
        </div>

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