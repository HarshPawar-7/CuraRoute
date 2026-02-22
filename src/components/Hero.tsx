import { motion } from "framer-motion";
import { MapPin, Calendar, Compass } from "lucide-react";
import heroImage from "@/assets/hero-travel.jpg";

const Hero = ({ onStartPlanning }: { onStartPlanning: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">{/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Beautiful travel destination at golden hour"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-5 h-5 text-sand" />
              <span className="text-sand font-body text-sm tracking-[0.2em] uppercase">
                AI-Powered Travel Planning
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary-foreground leading-[1.1] sm:leading-[0.95] mb-6">
              Your Next
              <br />
              <span className="italic text-sand">Adventure</span>
              <br />
              Starts Here
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-primary-foreground/80 font-body max-w-xl mb-10 leading-relaxed">
              Let AI craft your perfect itinerary — from hidden gems to iconic landmarks, 
              personalized to your style, budget, and pace.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
          >
            <button
              onClick={onStartPlanning}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white/95 text-foreground font-body font-semibold rounded-xl hover:scale-105 hover:bg-white transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_10px_40px_rgb(0,0,0,0.2)] flex items-center justify-center gap-2 text-sm sm:text-base backdrop-blur-sm"
            >
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              Plan My Trip
            </button>
            <button
              onClick={onStartPlanning}
              className="px-6 sm:px-8 py-3 sm:py-4 glass-strong text-primary-foreground font-body font-medium rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              View Sample Itinerary
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex gap-6 sm:gap-8 md:gap-12 mt-12 sm:mt-16"
          >
            {[
              { value: "50+", label: "Countries" },
              { value: "10K+", label: "Trips Planned" },
              { value: "4.9★", label: "Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-primary-foreground/90">
                <div className="text-xl sm:text-2xl md:text-3xl font-display font-bold">{stat.value}</div>
                <div className="text-xs sm:text-sm font-body text-primary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
