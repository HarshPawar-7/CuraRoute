import { Compass } from "lucide-react";

const Footer = () => (
  <footer className="relative py-8 sm:py-10 md:py-12 overflow-hidden">
    {/* Background with gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0E4966] via-[#1A5366] to-[#146C7C] opacity-95" />
    
    <div className="container mx-auto px-4 sm:px-6 relative z-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-sand" />
          <span className="font-display font-bold text-lg text-white">CuraRoute</span>
        </div>
        <p className="text-sm text-white/50 font-body">
          © 2026 CuraRoute. AI-powered travel planning.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
