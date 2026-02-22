import { motion } from "framer-motion";
import { Globe, Zap, Shield, Sparkles } from "lucide-react";

const features = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI-Crafted Itineraries",
    description: "Structured, time-blocked plans with transit details, costs, and local tips.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Real-Time Grounding",
    description: "Every venue is validated — no hallucinated restaurants or closed attractions.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Adaptive Planning",
    description: "Modify plans on the fly based on weather, mood, or spontaneous discoveries.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Instant Booking",
    description: "One-click booking links for tours, hotels, and experiences integrated into your plan.",
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-bl from-[#146C7C] via-[#0E4966] to-[#1A5366] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(217,124,90,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-sand font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 block">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white">
            Not Your Average <span className="italic text-sand">Planner</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sand/20 text-sand flex items-center justify-center mb-4 sm:mb-5">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/70 font-body leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
