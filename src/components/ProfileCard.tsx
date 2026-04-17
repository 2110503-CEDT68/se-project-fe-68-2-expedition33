import Image from "next/image";
import { UserItem } from "../../interfaces";

export default function ProfileCard({ user }: Readonly<{ user: UserItem }>) {
  return (
    <div className="max-h-full h-full flex flex-col items-center relative">
      <div className="w-full bg-surface/50 border border-surface-border rounded-3xl p-8 md:p-14 shadow-xl backdrop-blur-sm">
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
        <div className="mt-auto relative w-62.5 md:w-100 h-62.5 md:h-87.5 opacity-90 pointer-events-none">
            <Image
              src="/images/people-stance.svg"
              alt="3 people standing illustration"
              fill
              className="object-contain object-bottom"
              priority
            />
        </div>
      </footer>
    </div>
  );
}