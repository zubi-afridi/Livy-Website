import Image from "next/image";
import Footer from "@/components/common/Footer";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="xl:h-6 lg:h-4 h-3 w-full bg-primary hidden sm:block" />

      <main className="flex-1 flex items-center justify-center px-4 sm:py-10 py-5">
        <div className="w-full max-w-105 flex flex-col items-center sm:gap-6 gap-2">
          <Image
            src="/icons/logo.svg"
            alt="Livy"
            width={120}
            height={60}
            className="h-auto w-26 lg:w-32 xl:w-39"
            priority
            data-aos="fade-down"
            data-aos-duration="800"
          />

          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
