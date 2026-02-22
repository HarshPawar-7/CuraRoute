import { useState, useRef, useEffect } from "react";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DestinationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (destination: { name: string; country: string; coordinates: [number, number] }) => void;
  className?: string;
}

// Popular destinations with coordinates
const popularDestinations = [
  // Europe
  { name: "Paris", country: "France", coordinates: [48.8566, 2.3522] as [number, number] },
  { name: "London", country: "UK", coordinates: [51.5074, -0.1278] as [number, number] },
  { name: "Rome", country: "Italy", coordinates: [41.9028, 12.4964] as [number, number] },
  { name: "Barcelona", country: "Spain", coordinates: [41.3851, 2.1734] as [number, number] },
  { name: "Amsterdam", country: "Netherlands", coordinates: [52.3676, 4.9041] as [number, number] },
  { name: "Prague", country: "Czech Republic", coordinates: [50.0755, 14.4378] as [number, number] },
  { name: "Vienna", country: "Austria", coordinates: [48.2082, 16.3738] as [number, number] },
  { name: "Istanbul", country: "Turkey", coordinates: [41.0082, 28.9784] as [number, number] },
  { name: "Santorini", country: "Greece", coordinates: [36.3932, 25.4615] as [number, number] },
  { name: "Athens", country: "Greece", coordinates: [37.9838, 23.7275] as [number, number] },
  { name: "Berlin", country: "Germany", coordinates: [52.52, 13.405] as [number, number] },
  { name: "Munich", country: "Germany", coordinates: [48.1351, 11.582] as [number, number] },
  { name: "Venice", country: "Italy", coordinates: [45.4408, 12.3155] as [number, number] },
  { name: "Florence", country: "Italy", coordinates: [43.7696, 11.2558] as [number, number] },
  { name: "Madrid", country: "Spain", coordinates: [40.4168, -3.7038] as [number, number] },
  { name: "Lisbon", country: "Portugal", coordinates: [38.7223, -9.1393] as [number, number] },
  { name: "Edinburgh", country: "Scotland", coordinates: [55.9533, -3.1883] as [number, number] },
  { name: "Dublin", country: "Ireland", coordinates: [53.3498, -6.2603] as [number, number] },
  { name: "Copenhagen", country: "Denmark", coordinates: [55.6761, 12.5683] as [number, number] },
  { name: "Stockholm", country: "Sweden", coordinates: [59.3293, 18.0686] as [number, number] },
  { name: "Reykjavik", country: "Iceland", coordinates: [64.1466, -21.9426] as [number, number] },
  { name: "Budapest", country: "Hungary", coordinates: [47.4979, 19.0402] as [number, number] },
  { name: "Zurich", country: "Switzerland", coordinates: [47.3769, 8.5417] as [number, number] },
  { name: "Brussels", country: "Belgium", coordinates: [50.8503, 4.3517] as [number, number] },
  
  // Asia
  { name: "Tokyo", country: "Japan", coordinates: [35.6762, 139.6503] as [number, number] },
  { name: "Kyoto", country: "Japan", coordinates: [35.0116, 135.7681] as [number, number] },
  { name: "Osaka", country: "Japan", coordinates: [34.6937, 135.5023] as [number, number] },
  { name: "Bangkok", country: "Thailand", coordinates: [13.7563, 100.5018] as [number, number] },
  { name: "Phuket", country: "Thailand", coordinates: [7.8804, 98.3923] as [number, number] },
  { name: "Chiang Mai", country: "Thailand", coordinates: [18.7883, 98.9853] as [number, number] },
  { name: "Singapore", country: "Singapore", coordinates: [1.3521, 103.8198] as [number, number] },
  { name: "Bali", country: "Indonesia", coordinates: [-8.3405, 115.092] as [number, number] },
  { name: "Jakarta", country: "Indonesia", coordinates: [-6.2088, 106.8456] as [number, number] },
  { name: "Seoul", country: "South Korea", coordinates: [37.5665, 126.978] as [number, number] },
  { name: "Busan", country: "South Korea", coordinates: [35.1796, 129.0756] as [number, number] },
  { name: "Hong Kong", country: "Hong Kong", coordinates: [22.3193, 114.1694] as [number, number] },
  { name: "Kuala Lumpur", country: "Malaysia", coordinates: [3.139, 101.6869] as [number, number] },
  { name: "Langkawi", country: "Malaysia", coordinates: [6.3501, 99.8001] as [number, number] },
  { name: "Hanoi", country: "Vietnam", coordinates: [21.0285, 105.8542] as [number, number] },
  { name: "Ho Chi Minh City", country: "Vietnam", coordinates: [10.8231, 106.6297] as [number, number] },
  { name: "Siem Reap", country: "Cambodia", coordinates: [13.3671, 103.8448] as [number, number] },
  { name: "Manila", country: "Philippines", coordinates: [14.5995, 120.9842] as [number, number] },
  { name: "Taipei", country: "Taiwan", coordinates: [25.033, 121.5654] as [number, number] },
  { name: "Shanghai", country: "China", coordinates: [31.2304, 121.4737] as [number, number] },
  { name: "Beijing", country: "China", coordinates: [39.9042, 116.4074] as [number, number] },
  
  // India
  { name: "Mumbai", country: "India", coordinates: [19.076, 72.8777] as [number, number] },
  { name: "Delhi", country: "India", coordinates: [28.7041, 77.1025] as [number, number] },
  { name: "Bangalore", country: "India", coordinates: [12.9716, 77.5946] as [number, number] },
  { name: "Goa", country: "India", coordinates: [15.2993, 74.124] as [number, number] },
  { name: "Jaipur", country: "India", coordinates: [26.9124, 75.7873] as [number, number] },
  { name: "Agra", country: "India", coordinates: [27.1767, 78.0081] as [number, number] },
  { name: "Kerala", country: "India", coordinates: [10.8505, 76.2711] as [number, number] },
  { name: "Udaipur", country: "India", coordinates: [24.5854, 73.7125] as [number, number] },
  { name: "Varanasi", country: "India", coordinates: [25.3176, 82.9739] as [number, number] },
  { name: "Kolkata", country: "India", coordinates: [22.5726, 88.3639] as [number, number] },
  { name: "Chennai", country: "India", coordinates: [13.0827, 80.2707] as [number, number] },
  { name: "Hyderabad", country: "India", coordinates: [17.385, 78.4867] as [number, number] },
  { name: "Pune", country: "India", coordinates: [18.5204, 73.8567] as [number, number] },
  { name: "Rishikesh", country: "India", coordinates: [30.0869, 78.2676] as [number, number] },
  { name: "Shimla", country: "India", coordinates: [31.1048, 77.1734] as [number, number] },
  { name: "Manali", country: "India", coordinates: [32.2396, 77.1887] as [number, number] },
  { name: "Leh", country: "India", coordinates: [34.1526, 77.577] as [number, number] },
  
  // Middle East
  { name: "Dubai", country: "UAE", coordinates: [25.2048, 55.2708] as [number, number] },
  { name: "Abu Dhabi", country: "UAE", coordinates: [24.4539, 54.3773] as [number, number] },
  { name: "Doha", country: "Qatar", coordinates: [25.2854, 51.531] as [number, number] },
  { name: "Jerusalem", country: "Israel", coordinates: [31.7683, 35.2137] as [number, number] },
  { name: "Tel Aviv", country: "Israel", coordinates: [32.0853, 34.7818] as [number, number] },
  { name: "Petra", country: "Jordan", coordinates: [30.3285, 35.4444] as [number, number] },
  
  // Africa
  { name: "Cairo", country: "Egypt", coordinates: [30.0444, 31.2357] as [number, number] },
  { name: "Marrakech", country: "Morocco", coordinates: [31.6295, -7.9811] as [number, number] },
  { name: "Cape Town", country: "South Africa", coordinates: [-33.9249, 18.4241] as [number, number] },
  { name: "Nairobi", country: "Kenya", coordinates: [-1.2921, 36.8219] as [number, number] },
  { name: "Zanzibar", country: "Tanzania", coordinates: [-6.1659, 39.2026] as [number, number] },
  { name: "Victoria Falls", country: "Zimbabwe", coordinates: [-17.9243, 25.8572] as [number, number] },
  
  // Americas - North
  { name: "New York", country: "USA", coordinates: [40.7128, -74.006] as [number, number] },
  { name: "Los Angeles", country: "USA", coordinates: [34.0522, -118.2437] as [number, number] },
  { name: "San Francisco", country: "USA", coordinates: [37.7749, -122.4194] as [number, number] },
  { name: "Las Vegas", country: "USA", coordinates: [36.1699, -115.1398] as [number, number] },
  { name: "Miami", country: "USA", coordinates: [25.7617, -80.1918] as [number, number] },
  { name: "Chicago", country: "USA", coordinates: [41.8781, -87.6298] as [number, number] },
  { name: "Seattle", country: "USA", coordinates: [47.6062, -122.3321] as [number, number] },
  { name: "Boston", country: "USA", coordinates: [42.3601, -71.0589] as [number, number] },
  { name: "Orlando", country: "USA", coordinates: [28.5383, -81.3792] as [number, number] },
  { name: "Hawaii", country: "USA", coordinates: [21.3099, -157.8581] as [number, number] },
  { name: "Toronto", country: "Canada", coordinates: [43.6532, -79.3832] as [number, number] },
  { name: "Vancouver", country: "Canada", coordinates: [49.2827, -123.1207] as [number, number] },
  { name: "Montreal", country: "Canada", coordinates: [45.5017, -73.5673] as [number, number] },
  { name: "Cancun", country: "Mexico", coordinates: [21.1619, -86.8515] as [number, number] },
  { name: "Mexico City", country: "Mexico", coordinates: [19.4326, -99.1332] as [number, number] },
  
  // Americas - South
  { name: "Rio de Janeiro", country: "Brazil", coordinates: [-22.9068, -43.1729] as [number, number] },
  { name: "São Paulo", country: "Brazil", coordinates: [-23.5505, -46.6333] as [number, number] },
  { name: "Buenos Aires", country: "Argentina", coordinates: [-34.6037, -58.3816] as [number, number] },
  { name: "Lima", country: "Peru", coordinates: [-12.0464, -77.0428] as [number, number] },
  { name: "Machu Picchu", country: "Peru", coordinates: [-13.1631, -72.545] as [number, number] },
  { name: "Cusco", country: "Peru", coordinates: [-13.5319, -71.9675] as [number, number] },
  { name: "Bogotá", country: "Colombia", coordinates: [4.711, -74.0721] as [number, number] },
  { name: "Cartagena", country: "Colombia", coordinates: [10.3910, -75.4794] as [number, number] },
  { name: "Santiago", country: "Chile", coordinates: [-33.4489, -70.6693] as [number, number] },
  { name: "Quito", country: "Ecuador", coordinates: [-0.1807, -78.4678] as [number, number] },
  
  // Oceania
  { name: "Sydney", country: "Australia", coordinates: [-33.8688, 151.2093] as [number, number] },
  { name: "Melbourne", country: "Australia", coordinates: [-37.8136, 144.9631] as [number, number] },
  { name: "Brisbane", country: "Australia", coordinates: [-27.4698, 153.0251] as [number, number] },
  { name: "Perth", country: "Australia", coordinates: [-31.9505, 115.8605] as [number, number] },
  { name: "Gold Coast", country: "Australia", coordinates: [-28.0167, 153.4] as [number, number] },
  { name: "Cairns", country: "Australia", coordinates: [-16.9186, 145.7781] as [number, number] },
  { name: "Auckland", country: "New Zealand", coordinates: [-36.8485, 174.7633] as [number, number] },
  { name: "Queenstown", country: "New Zealand", coordinates: [-45.0312, 168.6626] as [number, number] },
  { name: "Wellington", country: "New Zealand", coordinates: [-41.2865, 174.7762] as [number, number] },
  { name: "Fiji", country: "Fiji", coordinates: [-17.7134, 178.065] as [number, number] },
  { name: "Bora Bora", country: "French Polynesia", coordinates: [-16.5004, -151.7415] as [number, number] },
  
  // Islands & Special Destinations
  { name: "Maldives", country: "Maldives", coordinates: [3.2028, 73.2207] as [number, number] },
  { name: "Seychelles", country: "Seychelles", coordinates: [-4.6796, 55.492] as [number, number] },
  { name: "Mauritius", country: "Mauritius", coordinates: [-20.1609, 57.5012] as [number, number] },
  { name: "Phuket", country: "Thailand", coordinates: [7.8804, 98.3923] as [number, number] },
  { name: "Ibiza", country: "Spain", coordinates: [38.9067, 1.4206] as [number, number] },
  { name: "Mykonos", country: "Greece", coordinates: [37.4467, 25.3289] as [number, number] },
  { name: "Crete", country: "Greece", coordinates: [35.2401, 24.8093] as [number, number] },
];

export function DestinationAutocomplete({ 
  value, 
  onChange, 
  onSelect,
  className 
}: DestinationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState(popularDestinations);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    onChange(inputValue);

    // Only show dropdown if user has typed at least 1 character
    if (inputValue.trim().length > 0) {
      const filtered = popularDestinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          dest.country.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredDestinations(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredDestinations([]);
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    // Only show dropdown if there's already text in the input
    if (value.trim().length > 0) {
      const filtered = popularDestinations.filter(
        (dest) =>
          dest.name.toLowerCase().includes(value.toLowerCase()) ||
          dest.country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDestinations(filtered);
      setIsOpen(filtered.length > 0);
    }
  };

  const handleSelect = (destination: typeof popularDestinations[0]) => {
    onChange(`${destination.name}, ${destination.country}`);
    setIsOpen(false);
    if (onSelect) {
      onSelect(destination);
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder="Start typing destination..."
          value={value}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className={cn("bg-white/10 border-white/20 font-body h-12 text-base pr-10 text-white placeholder:text-white/50", className)}
          required
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
      </div>

      {isOpen && filteredDestinations.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 glass-card rounded-xl shadow-[0_20px_70px_rgba(0,0,0,0.2)] max-h-[250px] sm:max-h-[300px] overflow-y-auto backdrop-blur-xl"
        >
          {filteredDestinations.map((destination, index) => (
            <button
              key={`${destination.name}-${index}`}
              type="button"
              onClick={() => handleSelect(destination)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-2 sm:gap-3 border-b border-white/5 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              <MapPin className="w-4 h-4 text-sand shrink-0" />
              <div className="flex-1">
                <div className="font-body font-medium text-white">
                  {destination.name}
                </div>
                <div className="font-body text-xs text-white/60">
                  {destination.country}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
