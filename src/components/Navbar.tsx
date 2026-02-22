import { useState, useEffect } from "react";
import { Compass, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Plan Trip", id: "plan" },
    { label: "Features", id: "features" },
    { label: "Itinerary", id: "itinerary" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-strong shadow-lg"
          : "glass"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 group"
          >
            <div className={cn(
              "w-10 h-10 rounded-xl backdrop-blur-sm flex items-center justify-center transition-all duration-300",
              isScrolled ? "bg-primary/10 group-hover:bg-primary/20" : "bg-white/20 group-hover:bg-white/30"
            )}>
              <Compass className={cn(
                "w-6 h-6 transition-colors",
                isScrolled ? "text-primary" : "text-white drop-shadow-lg"
              )} />
            </div>
            <span className={cn(
              "font-display font-bold text-xl transition-colors",
              isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
            )}>
              CuraRoute
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "font-body font-medium text-sm transition-colors",
                  isScrolled ? "text-foreground/80 hover:text-primary" : "text-white/90 hover:text-white drop-shadow-md"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle & CTA */}
          <div className="hidden md:flex items-center gap-4">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                  "rounded-lg transition-all backdrop-blur-sm",
                  isScrolled ? "hover:bg-accent" : "hover:bg-white/10"
                )}
              >
                {theme === "dark" ? (
                  <Sun className={cn(
                    "w-5 h-5 transition-colors",
                    isScrolled ? "text-primary" : "text-white drop-shadow-md"
                  )} />
                ) : (
                  <Moon className={cn(
                    "w-5 h-5 transition-colors",
                    isScrolled ? "text-primary" : "text-white drop-shadow-md"
                  )} />
                )}
              </Button>
            )}
            <Button
              onClick={() => scrollToSection("plan")}
              className="font-body font-semibold bg-white/95 hover:bg-white text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.2)] transition-all duration-300 backdrop-blur-sm rounded-lg"
            >
              Start Planning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "md:hidden p-2 sm:p-2.5 rounded-lg transition-colors backdrop-blur-sm",
              isScrolled ? "hover:bg-accent" : "hover:bg-white/10"
            )}
          >
            {isMobileMenuOpen ? (
              <X className={cn(
                "w-6 h-6 transition-colors",
                isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
              )} />
            ) : (
              <Menu className={cn(
                "w-6 h-6 transition-colors",
                isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
              )} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cn(
            "md:hidden py-4 pb-6 border-t transition-colors",
            isScrolled ? "border-border" : "border-white/10"
          )}>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "font-body font-medium text-left px-4 py-2 rounded-lg transition-colors",
                    isScrolled ? "text-foreground hover:bg-accent" : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </button>
              ))}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={cn(
                    "font-body font-medium text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2",
                    isScrolled ? "text-foreground hover:bg-accent" : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {theme === "dark" ? (
                    <><Sun className="w-4 h-4" /> Light Mode</>
                  ) : (
                    <><Moon className="w-4 h-4" /> Dark Mode</>
                  )}
                </button>
              )}
              <Button
                onClick={() => scrollToSection("plan")}
                className="mx-4 font-body font-semibold bg-white/95 hover:bg-white text-foreground shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.2)] transition-all duration-300 backdrop-blur-sm rounded-lg"
              >
                Start Planning
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
