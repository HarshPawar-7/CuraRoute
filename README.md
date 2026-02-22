<div align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-3.4.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Supabase-Edge_Functions-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</div>

<br />

<div align="center">
  <h1>🌍 CuraRoute</h1>
  <p><strong>AI-Powered Travel Itinerary Planner</strong></p>
  <p>Create personalized trip plans in seconds with Google Gemini AI</p>
</div>

<br />

<div align="center">
  <img src="https://img.shields.io/badge/status-active-success?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square" alt="PRs Welcome" />
</div>

---

## ✨ Features

- **Smart Destination Search** - Autocomplete with 150+ destinations worldwide
- **AI-Generated Itineraries** - Get detailed day-by-day plans with activities, dining, and transit
- **Interactive Maps** - Visualize your destinations with embedded OpenStreetMap
- **Travel Style Matching** - Choose from adventure, cultural, relaxation, foodie, romantic, or family trips
- **Budget Planning** - Customize itineraries based on your budget range
- **Dark/Light Theme** - Glassmorphic UI with system-aware theme switching
- **Mobile Responsive** - Works seamlessly on all devices

## � Screenshots

<div align="center">
  <img src="public/Screenshot_Hero.png" alt="Hero Section" width="800" />
  <p><em>Beautiful glassmorphic hero section with AI-powered planning</em></p>
</div>

<br />

<div align="center">
  <img src="public/Screenshot_Timeline.png" alt="Itinerary Timeline" width="800" />
  <p><em>Interactive timeline view with day-by-day activities</em></p>
</div>

<div align="center">
  <img src="public/Screenshot_Timeline.png" alt="Overview Timeline" width="800" />
  <p><em>Overview of the CuraRoute
</div>

## �🛠️ Tech Stack

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

## 🏗️ Architecture

```mermaid
graph TB
    subgraph "Frontend Layer (React + TypeScript)"
        A[User Browser]
        B[Navbar Component<br/>Theme Toggle, Navigation]
        C[Hero Component<br/>Framer Motion Animations]
        D[TripPlannerForm<br/>Destination, Dates, Budget, Style]
        E[DestinationAutocomplete<br/>150+ Destinations Search]
        F[InteractiveMap<br/>OpenStreetMap Integration]
        G[ItineraryTimeline<br/>Activity Cards Display]
        H[Features Component<br/>Glassmorphic Cards]
    end
    
    subgraph "State Management"
        I[React Hooks<br/>useState, useEffect]
        J[TanStack Query<br/>Data Fetching & Caching]
    end
    
    subgraph "Styling System"
        K[Tailwind CSS<br/>Utility Classes]
        L[Glassmorphism<br/>backdrop-blur, translucent]
        M[Shadcn UI + Radix<br/>30+ Components]
        N[Theme Provider<br/>Dark/Light Mode]
    end
    
    subgraph "Backend Layer (Supabase)"
        O[Edge Function<br/>generate-itinerary]
        P[Deno Runtime<br/>Serverless Execution]
        Q[Environment Secrets<br/>API Keys]
    end
    
    subgraph "AI Layer"
        R[Google Gemini API<br/>1.5 Flash Preview]
        S[Structured Prompts<br/>Context + User Preferences]
        T[JSON Response<br/>Days, Activities, Costs]
    end
    
    subgraph "External Services"
        U[OpenStreetMap<br/>Map Tiles & Coordinates]
        V[Supabase Project<br/>Hosting & Config]
    end
    
    A -->|Interact| B
    A -->|Scroll| C
    A -->|Fill Form| D
    D -->|Search| E
    E -->|Select| F
    D -->|Submit| I
    I -->|HTTP POST| J
    J -->|Request| O
    O -->|Auth| Q
    O -->|API Call| R
    R -->|Process| S
    S -->|Generate| T
    T -->|Return| O
    O -->|JSON| J
    J -->|Update State| G
    F -->|Embed| U
    O -->|Deploy| V
    
    K --> D
    K --> E
    K --> G
    L --> D
    L --> G
    M --> D
    M --> E
    N --> B
    
    style A fill:#61DAFB,stroke:#333,color:#000
    style O fill:#3FCF8E,stroke:#333,color:#000
    style R fill:#4285f4,stroke:#333,color:#fff
    style U fill:#ff9800,stroke:#333,color:#000
    style J fill:#FF4154,stroke:#333,color:#fff
    style L fill:#d4a574,stroke:#333,color:#000
```

### Architecture Layers

**🎨 Frontend (Client-Side)**
- Built with React 18 + TypeScript + Vite
- Component-based architecture with reusable UI elements
- Glassmorphic design with backdrop-blur effects
- Real-time search with 150+ pre-loaded destinations
- Interactive maps with OpenStreetMap embedding
- TanStack Query for efficient data fetching and caching

**⚡ Backend (Serverless)**
- Supabase Edge Functions running on Deno
- Single endpoint: `/functions/v1/generate-itinerary`
- Validates user input and constructs AI prompts
- Secure API key management via Supabase secrets

**🤖 AI Layer**
- Google Gemini 1.5 Flash for rapid generation
- Structured prompts with travel preferences
- Returns detailed JSON itineraries with timing and costs

**🗺️ External Services**
- OpenStreetMap for destination visualization
- Supabase for hosting and configuration

## 🚀 Getting Started

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

## 📁 Project Structure

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

## 📦 Building for Production

```bash
npm run build
```

Output goes to `dist/` and can be deployed to Vercel, Netlify, or any static host.

## 🔄 How It Works

```mermaid
graph TD
    A[👤 User] -->|Fill Form| B[📝 Trip Details<br/>Destination, Dates, Budget, Style]
    B -->|Submit| C[⚡ Supabase Edge Function]
    C -->|API Request| D[🤖 Google Gemini AI]
    D -->|Structured Prompt| E[🧠 AI Processing<br/>Generate Itinerary]
    E -->|JSON Response| F[📊 Itinerary Data<br/>Days, Activities, Times, Costs]
    F -->|Render| G[🎨 Timeline UI<br/>Interactive Display]
    G -->|Display| H[✅ User Views Plan]
    
    style A fill:#d4a574
    style D fill:#4285f4
    style F fill:#34a853
    style G fill:#ea4335
```

### Flow Breakdown

1. **User Input** - Fill out the trip planning form with destination, dates, budget, and travel style
2. **Request Handling** - Form data is sent to a Supabase Edge Function (serverless)
3. **AI Generation** - Edge function calls Google Gemini with structured prompts
4. **Data Processing** - AI generates detailed itinerary with activities, timing, and costs
5. **UI Rendering** - Results are displayed in a beautiful glassmorphic timeline view

## 🤝 Contributing

Feel free to open issues or submit PRs. This is a personal project but contributions are welcome.

## 📄 License

MIT

