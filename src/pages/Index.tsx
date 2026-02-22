import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TripPlannerForm from "@/components/TripPlannerForm";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { TripFormData } from "@/components/TripPlannerForm";
import type { ItineraryDay } from "@/components/ItineraryTimeline";

const Index = () => {
  const planRef = useRef<HTMLDivElement>(null);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const scrollToPlan = () => {
    planRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = async (data: TripFormData) => {
    setIsLoading(true);
    setDestination(data.destination);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-itinerary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({ error: "Failed to generate itinerary" }));
        throw new Error(err.error || `Error ${resp.status}`);
      }

      const result = await resp.json();
      setItinerary(result.days);

      // Scroll to itinerary
      setTimeout(() => {
        document.getElementById("itinerary")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } catch (e) {
      console.error(e);
      toast({
        title: "Generation Failed",
        description: e instanceof Error ? e.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0E4966] via-[#146C7C] to-[#1A5366]">
      <Navbar />
      <div id="home">
        <Hero onStartPlanning={scrollToPlan} />
      </div>
      <div id="plan" ref={planRef}>
        <TripPlannerForm onSubmit={handleFormSubmit} />
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="relative py-24 flex flex-col items-center justify-center gap-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E4966] via-[#146C7C] to-[#1A5366] opacity-95" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-sand animate-spin" />
            <p className="text-white/80 font-body text-lg">
              Crafting your perfect itinerary for <span className="font-semibold text-white">{destination}</span>...
            </p>
          </div>
        </div>
      )}

      <div id="features">
        <Features />
      </div>
      <div id="itinerary">
        <ItineraryTimeline days={itinerary ?? undefined} destination={destination || undefined} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
