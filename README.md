# CuraRoute

An AI-powered travel itinerary planner that helps you create personalized trip plans in seconds. Built with modern web technologies and powered by Google's Gemini AI.

## Features

- **Smart Destination Search** - Autocomplete with 150+ destinations worldwide
- **AI-Generated Itineraries** - Get detailed day-by-day plans with activities, dining, and transit
- **Interactive Maps** - Visualize your destinations with embedded OpenStreetMap
- **Travel Style Matching** - Choose from adventure, cultural, relaxation, foodie, romantic, or family trips
- **Budget Planning** - Customize itineraries based on your budget range
- **Dark/Light Theme** - Glassmorphic UI with system-aware theme switching
- **Mobile Responsive** - Works seamlessly on all devices

## Tech Stack

**Frontend**
- React 18 with TypeScript
- Vite for blazing fast builds
- Tailwind CSS for styling
- Shadcn UI + Radix UI components
- Framer Motion for animations
- TanStack Query for data fetching

**Backend**
- Supabase Edge Functions (serverless)
- Google Gemini 1.5 Flash for AI generation

## Getting Started

### Prerequisites

- Node.js 16+ and npm/bun
- Supabase account
- Google AI API key (Gemini)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/curaroute.git
cd curaroute

# Install dependencies
npm install

# Start dev server
npm run dev
```

The app will be available at `http://localhost:8080`

### Environment Setup

You'll need to configure environment variables for Supabase and the AI generation function.

**For local development**, create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

**For the Supabase Edge Function**, set these secrets:

```bash
supabase secrets set GEMINI_API_KEY=your_google_ai_api_key
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (buttons, inputs, etc)
│   ├── Hero.tsx        # Landing hero section
│   ├── Navbar.tsx      # Navigation with theme toggle
│   ├── TripPlannerForm.tsx
│   ├── ItineraryTimeline.tsx
│   └── Features.tsx
├── pages/              # Route pages
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── integrations/       # External service integrations

supabase/
└── functions/
    └── generate-itinerary/  # Edge function for AI generation
```

## Building for Production

```bash
npm run build
```

Output goes to `dist/` and can be deployed to Vercel, Netlify, or any static host.

## How It Works

1. User fills out the trip planning form (destination, dates, budget, style)
2. Form data is sent to a Supabase Edge Function
3. Edge function calls Google Gemini with structured prompts
4. AI generates a detailed itinerary with activities, timing, and costs
5. Results are displayed in a beautiful timeline view

## Contributing

Feel free to open issues or submit PRs. This is a personal project but contributions are welcome.

## License

MIT

