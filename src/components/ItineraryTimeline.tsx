import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Camera,
  Bus,
  Landmark,
  ShoppingBag,
  Waves,
  Clock,
  DollarSign,
  MapPin,
  ExternalLink,
  Footprints,
} from "lucide-react";

interface Activity {
  time: string;
  name: string;
  description: string;
  type: "dining" | "sightseeing" | "transit" | "culture" | "shopping" | "nature";
  duration: string;
  cost: string;
  transitTo?: string;
  transitTime?: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
}

const activityIcons: Record<Activity["type"], React.ReactNode> = {
  dining: <UtensilsCrossed className="w-4 h-4" />,
  sightseeing: <Camera className="w-4 h-4" />,
  transit: <Bus className="w-4 h-4" />,
  culture: <Landmark className="w-4 h-4" />,
  shopping: <ShoppingBag className="w-4 h-4" />,
  nature: <Waves className="w-4 h-4" />,
};

const activityColors: Record<Activity["type"], string> = {
  dining: "bg-sand/20 text-sand border-sand/40",
  sightseeing: "bg-blue-400/20 text-blue-300 border-blue-400/40",
  transit: "bg-white/10 text-white/80 border-white/20",
  culture: "bg-purple-400/20 text-purple-300 border-purple-400/40",
  shopping: "bg-amber-400/20 text-amber-300 border-amber-400/40",
  nature: "bg-emerald-400/20 text-emerald-300 border-emerald-400/40",
};

const sampleItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: "Day 1 — Arrival",
    theme: "First Impressions & Local Flavors",
    activities: [
      {
        time: "10:00 AM",
        name: "Arrive at Charles de Gaulle Airport",
        description: "Clear customs and take the RER B train to central Paris.",
        type: "transit",
        duration: "1.5 hrs",
        cost: "$12",
        transitTo: "Hotel Le Marais",
        transitTime: "45 min by metro",
      },
      {
        time: "12:30 PM",
        name: "Lunch at Café de Flore",
        description: "Iconic Parisian café in Saint-Germain-des-Prés. Try the croque-monsieur.",
        type: "dining",
        duration: "1.5 hrs",
        cost: "$35",
        transitTo: "Seine River",
        transitTime: "10 min walk",
      },
      {
        time: "2:30 PM",
        name: "Seine River Walk & Notre-Dame",
        description: "Stroll along the Seine and admire the ongoing restoration of Notre-Dame Cathedral.",
        type: "sightseeing",
        duration: "2 hrs",
        cost: "Free",
        transitTo: "Le Marais district",
        transitTime: "15 min walk",
      },
      {
        time: "5:00 PM",
        name: "Explore Le Marais",
        description: "Browse boutiques, galleries, and the historic Place des Vosges.",
        type: "shopping",
        duration: "2 hrs",
        cost: "$50",
      },
      {
        time: "7:30 PM",
        name: "Dinner at Le Comptoir du Panthéon",
        description: "Classic French bistro with seasonal menu. Reservations recommended.",
        type: "dining",
        duration: "2 hrs",
        cost: "$65",
      },
    ],
  },
  {
    day: 2,
    date: "Day 2 — Art & Culture",
    theme: "Museums, Masterpieces & Montmartre",
    activities: [
      {
        time: "9:00 AM",
        name: "The Louvre Museum",
        description: "See the Mona Lisa, Winged Victory, and Venus de Milo. Book skip-the-line tickets.",
        type: "culture",
        duration: "3 hrs",
        cost: "$22",
        transitTo: "Tuileries Garden",
        transitTime: "5 min walk",
      },
      {
        time: "12:30 PM",
        name: "Lunch at Angelina",
        description: "Famous for their hot chocolate and Mont-Blanc pastry.",
        type: "dining",
        duration: "1 hr",
        cost: "$30",
        transitTo: "Montmartre",
        transitTime: "25 min by metro",
      },
      {
        time: "2:00 PM",
        name: "Sacré-Cœur & Montmartre",
        description: "Climb to the basilica for panoramic views, then explore the artistic neighborhood.",
        type: "sightseeing",
        duration: "3 hrs",
        cost: "Free",
        transitTo: "Eiffel Tower",
        transitTime: "30 min by metro",
      },
      {
        time: "6:00 PM",
        name: "Eiffel Tower at Sunset",
        description: "Summit access for breathtaking golden hour views over the entire city.",
        type: "sightseeing",
        duration: "2 hrs",
        cost: "$28",
      },
      {
        time: "8:30 PM",
        name: "Dinner Cruise on the Seine",
        description: "Gourmet French cuisine while gliding past illuminated landmarks.",
        type: "dining",
        duration: "2.5 hrs",
        cost: "$120",
      },
    ],
  },
  {
    day: 3,
    date: "Day 3 — Royal Escape",
    theme: "Versailles & Farewell Dinner",
    activities: [
      {
        time: "8:30 AM",
        name: "Train to Versailles",
        description: "Take the RER C to the Palace of Versailles. Arrive early to beat crowds.",
        type: "transit",
        duration: "45 min",
        cost: "$8",
      },
      {
        time: "9:30 AM",
        name: "Palace of Versailles",
        description: "Explore the Hall of Mirrors, Royal Apartments, and the magnificent gardens.",
        type: "culture",
        duration: "4 hrs",
        cost: "$22",
        transitTo: "Versailles town",
        transitTime: "10 min walk",
      },
      {
        time: "1:30 PM",
        name: "Lunch in Versailles Market",
        description: "Fresh produce, cheese, and charcuterie at the local market.",
        type: "dining",
        duration: "1.5 hrs",
        cost: "$25",
        transitTo: "Paris center",
        transitTime: "45 min by train",
      },
      {
        time: "4:00 PM",
        name: "Jardin du Luxembourg",
        description: "Relax in this beautiful garden. Perfect for a final Parisian afternoon.",
        type: "nature",
        duration: "2 hrs",
        cost: "Free",
      },
      {
        time: "7:00 PM",
        name: "Farewell Dinner at Le Jules Verne",
        description: "Michelin-starred restaurant inside the Eiffel Tower. A magical finale.",
        type: "dining",
        duration: "2.5 hrs",
        cost: "$200",
      },
    ],
  },
];

const ActivityCard = ({ activity, index }: { activity: Activity; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    className="relative flex gap-3 sm:gap-4 glass-card rounded-xl p-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
  >
    {/* Timeline dot & line */}
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 ${activityColors[activity.type]} shrink-0`}>
        {activityIcons[activity.type]}
      </div>
      <div className="w-px flex-1 bg-border mt-2" />
    </div>

    {/* Content */}
    <div className="pb-6 sm:pb-8 flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="text-xs font-body font-semibold text-sand tracking-wide uppercase">{activity.time}</span>
        <span className="text-xs text-white/60 font-body">· {activity.duration}</span>
      </div>
      <h4 className="text-base sm:text-lg font-display font-semibold text-white mb-1">{activity.name}</h4>
      <p className="text-sm text-white/70 font-body leading-relaxed mb-3">{activity.description}</p>

      <div className="flex flex-wrap items-center gap-3 text-xs font-body">
        <span className="flex items-center gap-1 text-white/60">
          <DollarSign className="w-3 h-3" /> {activity.cost}
        </span>
        <span className="flex items-center gap-1 text-white/60">
          <Clock className="w-3 h-3" /> {activity.duration}
        </span>
        <button className="flex items-center gap-1 text-sand hover:text-sand/80 transition-colors">
          <ExternalLink className="w-3 h-3" /> Book Now
        </button>
      </div>

      {activity.transitTo && (
        <div className="mt-3 flex items-center gap-2 text-xs text-white/60 font-body bg-white/5 rounded-lg px-3 py-2">
          <Footprints className="w-3 h-3" />
          <span>
            → {activity.transitTo} · {activity.transitTime}
          </span>
        </div>
      )}
    </div>
  </motion.div>
);

export type { ItineraryDay, Activity };

const ItineraryTimeline = ({ days, destination }: { days?: ItineraryDay[]; destination?: string }) => {
  const itinerary = days && days.length > 0 ? days : sampleItinerary;
  const label = destination || "Paris";
  const isGenerated = days && days.length > 0;

  return (
    <section id="itinerary" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0E4966] via-[#1A5366] to-[#146C7C] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,124,90,0.08),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-sand font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 block">
            {isGenerated ? "Your AI Itinerary" : "Sample Itinerary"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {itinerary.length} Days in <span className="italic text-sand">{label}</span>
          </h2>
          <p className="text-sm sm:text-base text-white/80 font-body max-w-lg mx-auto px-4">
            {isGenerated
              ? "Your personalized itinerary, crafted by AI based on your preferences."
              : "A curated blend of culture, cuisine, and unforgettable moments in the City of Light."}
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
          {itinerary.map((day) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sand text-foreground flex items-center justify-center font-display font-bold text-base sm:text-lg shadow-warm shrink-0">
                  {day.day}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-white truncate">{day.date}</h3>
                  <p className="text-xs sm:text-sm text-white/70 font-body">{day.theme}</p>
                </div>
              </div>
              <div className="ml-1">
                {day.activities.map((activity, i) => (
                  <ActivityCard key={`${day.day}-${activity.name}`} activity={activity} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItineraryTimeline;
