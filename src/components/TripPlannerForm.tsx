import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Sparkles, BadgeIndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DestinationAutocomplete } from "@/components/DestinationAutocomplete";
import { InteractiveMap } from "@/components/InteractiveMap";

export interface TripFormData {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: string;
  style: string;
}

const TripPlannerForm = ({ onSubmit }: {onSubmit: (data: TripFormData) => void;}) => {
  const [form, setForm] = useState<TripFormData>({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelers: "2",
    style: ""
  });
  const [selectedCoordinates, setSelectedCoordinates] = useState<[number, number] | undefined>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <section id="plan" className="relative py-16 sm:py-20 md:py-24 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E4966] via-[#146C7C] to-[#1A5366] opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,124,90,0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16">

          <span className="text-sand font-body text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 block">
            Start Planning
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Where to <span className="italic text-sand">Next?</span>
          </h2>
          <p className="text-sm sm:text-base text-white/80 font-body max-w-lg mx-auto px-4">
            Tell us about your dream trip and our AI will craft a personalized itinerary in seconds.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto glass-card rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_20px_70px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_90px_rgba(0,0,0,0.2)] transition-shadow duration-500">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Destination */}
            <div className="md:col-span-2">
              <Label className="font-body text-white mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sand" />
                Destination
              </Label>
              <DestinationAutocomplete
                value={form.destination}
                onChange={(value) => setForm({ ...form, destination: value })}
                onSelect={(dest) => {
                  setForm({ ...form, destination: `${dest.name}, ${dest.country}` });
                  setSelectedCoordinates(dest.coordinates);
                }}
              />
            </div>

            {/* Interactive Map */}
            {selectedCoordinates && (
              <div className="md:col-span-2">
                <InteractiveMap
                  destination={form.destination}
                  coordinates={selectedCoordinates}
                />
              </div>
            )}

            {/* Dates */}
            <div>
              <Label className="font-body text-white mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sand" />
                Start Date
              </Label>
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="bg-white/10 border-white/20 font-body h-12 text-white placeholder:text-white/50"
                required />

            </div>
            <div>
              <Label className="font-body text-white mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sand" />
                End Date
              </Label>
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="bg-white/10 border-white/20 font-body h-12 text-white placeholder:text-white/50"
                required />

            </div>

            {/* Budget */}
            <div>
              <Label className="font-body text-white mb-2 flex items-center gap-2">
                <BadgeIndianRupee className="w-4 h-4 text-sand" />
                Budget
              </Label>
              <Select value={form.budget} onValueChange={(v) => setForm({ ...form, budget: v })}>
                <SelectTrigger className="bg-white/10 border-white/20 font-body h-12 text-white">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget ($500–$1,000)</SelectItem>
                  <SelectItem value="moderate">Moderate ($1,000–$3,000)</SelectItem>
                  <SelectItem value="luxury">Luxury ($3,000–$7,000)</SelectItem>
                  <SelectItem value="ultra">Ultra Luxury ($7,000+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travelers */}
            <div>
              <Label className="font-body text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-sand" />
                Travelers
              </Label>
              <Select value={form.travelers} onValueChange={(v) => setForm({ ...form, travelers: v })}>
                <SelectTrigger className="bg-white/10 border-white/20 font-body h-12 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Solo Traveler</SelectItem>
                  <SelectItem value="2">Couple</SelectItem>
                  <SelectItem value="3-4">Small Group (3–4)</SelectItem>
                  <SelectItem value="5+">Large Group (5+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Travel Style */}
            <div className="md:col-span-2">
              <Label className="font-body text-white mb-3 block">Travel Style</Label>
              <div className="flex flex-wrap gap-2">
                {["Adventure", "Cultural", "Relaxation", "Foodie", "Romantic", "Family"].map((style) =>
                <button
                  key={style}
                  type="button"
                  onClick={() => setForm({ ...form, style })}
                  className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-body font-medium transition-all duration-200 ${
                  form.style === style ?
                  "bg-sand text-foreground shadow-[0_4px_20px_rgba(217,124,90,0.3)] scale-105" :
                  "bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:scale-105"}`
                  }>

                    {style}
                  </button>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-6 sm:mt-8 h-12 sm:h-14 text-sm sm:text-base font-body font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-[0_8px_30px_rgba(217,124,90,0.3)] hover:shadow-[0_12px_40px_rgba(217,124,90,0.4)] transition-all duration-300 hover:scale-[1.02] rounded-xl">

            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Generate My Itinerary
          </Button>
        </motion.form>
      </div>
    </section>);

};

export default TripPlannerForm;