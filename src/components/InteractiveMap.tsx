import { useEffect, useRef, useState } from "react";
import { MapPin, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface InteractiveMapProps {
  destination?: string;
  coordinates?: [number, number];
  className?: string;
}

export function InteractiveMap({ destination, coordinates, className }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>(coordinates || [20, 0]);
  const [zoom, setZoom] = useState(2);

  useEffect(() => {
    if (coordinates) {
      setMapCenter(coordinates);
      setZoom(10);
    }
  }, [coordinates]);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Embedded map URL (using OpenStreetMap)
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    mapCenter[1] - 0.1
  }%2C${mapCenter[0] - 0.1}%2C${mapCenter[1] + 0.1}%2C${
    mapCenter[0] + 0.1
  }&layer=mapnik&marker=${mapCenter[0]}%2C${mapCenter[1]}`;

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.15)] transition-all duration-300 glass-card",
        isFullscreen ? "fixed inset-2 sm:inset-4 z-50" : "h-[300px] sm:h-[400px]",
        className
      )}
    >
      {/* Map Header */}
      <div className="absolute top-0 left-0 right-0 z-10 glass-strong p-3 sm:p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-sand shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-white text-sm sm:text-base truncate">
              {destination || "Explore Destinations"}
            </h3>
            {coordinates && (
              <p className="text-xs text-white/60 font-body">
                {coordinates[0].toFixed(4)}°, {coordinates[1].toFixed(4)}°
              </p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreen}
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white"
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full">
        {coordinates ? (
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src={mapUrl}
            style={{ border: 0 }}
            title={`Map of ${destination}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground font-body">
                Select a destination to view location
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Map Controls */}
      {coordinates && (
        <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setZoom(Math.min(zoom + 1, 18))}
            className="shadow-lg"
          >
            +
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setZoom(Math.max(zoom - 1, 1))}
            className="shadow-lg"
          >
            −
          </Button>
        </div>
      )}
    </div>
  );
}
