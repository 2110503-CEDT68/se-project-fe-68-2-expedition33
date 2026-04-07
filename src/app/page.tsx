import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background flex flex-col justify-center pt-24 pb-12 overflow-hidden">      
    
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">        
        
        <div className="w-full flex flex-col md:flex-row items-center gap-10 bg-background/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-surface-border/50 shadow-2xl">
          
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-tight drop-shadow-sm">
              ONLINE <span className="text-primary whitespace-nowrap">JOB FAIR</span> 2022
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/80 font-medium leading-relaxed mx-auto md:mx-0 max-w-2xl">
              Explore Career Opportunities at Our Online Job Fair.
              Connect with Top Companies, Schedule Interviews,
              and Take the Next Step Toward Your Future.
            </p>

            <div className="pt-4 flex justify-center md:justify-start">
              <Link href="/companies">
                <button className="bg-primary hover:bg-primary-hover text-white px-12 py-4 rounded-full font-bold text-lg tracking-widest uppercase shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
                  Booking
                </button>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full relative min-h-75 sm:min-h-87.5 md:min-h-112.5">
             <Image 
              src="/images/interview.svg" 
              alt="Online Interview Illustration"
              fill
              className="object-contain"
              priority 
            />
          </div>

        </div>

      </section>

    </main>
  );
}