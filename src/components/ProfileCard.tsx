import Image from "next/image";
import { UserItem } from "../../interfaces";

export default function ProfileCard({ user }: Readonly<{ user: UserItem }>) {
  return (

    <div className="max-h-full h-full flex flex-col items-center">

      <div className="w-full bg-surface border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm">
        <div className="grid grid-cols-[80px_20px_1fr] md:grid-cols-[100px_30px_1fr] gap-y-6 md:gap-y-8 items-center text-lg md:text-xl font-bold">
          <span className="text-primary tracking-widest text-right">Role</span>
          <span className="text-primary/70 text-center">:</span>
          <span className="text-foreground tracking-wide capitalize">{user.role}</span>

          <span className="text-primary tracking-widest text-right">Name</span>
          <span className="text-primary/70 text-center">:</span>
          <span className="text-foreground tracking-wide">{user.name}</span>

          <span className="text-primary tracking-widest text-right">Email</span>
          <span className="text-primary/70 text-center">:</span>
          <span className="text-foreground tracking-wide break-all">{user.email}</span>

          <span className="text-primary tracking-widest text-right">Tel</span>
          <span className="text-primary/70 text-center">:</span>
          <span className="text-foreground tracking-wide">{user.tel}</span>
        </div>
      </div>

      <div className="grow"/>

      <footer>
        <div className="absolute bottom-0 left-0 w-48 md:w-80 h-48 md:h-80 opacity-90 pointer-events-none -z-10">
          <Image
            src="/images/people-stance.svg"
            alt="3 people standing illustration"
            fill
            className="object-contain object-bottom left-0"
            priority
          />
        </div>
      </footer>
    </div>
  );
}