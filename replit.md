# PlaySpark - Activity Ideas for Kids

## Overview

PlaySpark is a lightweight, just-in-time idea generator for parents to quickly find engaging, age-appropriate activities for their children. The application provides personalized activity suggestions based on child profiles (age, interests) and contextual filters (time available, energy level, location, etc.). The MVP focuses on reducing decision fatigue by surfacing 3-5 tailored activity ideas within seconds with minimal setup required.

## Recent Changes (August 2025)

### Built-in Details Feature Implementation (August 12, 2025)
- **Mobile-First Details Panel**: Redesigned from real-time AI calls to built-in detailed information system
- **Comprehensive Detail Structure**: Added `detailed_info` JSONB column with detailed steps, learning benefits, safety tips, variations, and parent coaching
- **Mobile-Optimized Modal**: Created sliding panel from bottom on mobile, centered modal on desktop with proper scrolling
- **Database Population**: Added detailed information to 6+ activities including Kitchen Chemistry Lab, Science Journal, Music Composition, Engineering Challenge
- **Performance Improvement**: Eliminated real-time AI dependency for faster, more reliable user experience
- **Fix: Pagination Details**: Resolved issue where "View Details" button only appeared for first 2 activities
- **Fix: Modal Scrolling**: Fixed mobile scrolling issues and close button functionality

### Claude AI Integration and Complete Database Coverage
- **Claude AI System**: Successfully integrated Claude 3.5 Sonnet for automated activity generation
- **Database Expansion**: Generated 29 new activities using AI (93 → 122 total activities)
- **Complete Filter Coverage**: All age/energy/location/whoPlaying combinations now have sufficient activities
- **"Silly" Energy Level**: Added missing silly activities - now fully supported across all age ranges
- **Gap Analysis System**: Built comprehensive system to identify and fill 57 missing filter combinations
- **Flexible Age Filtering**: Implemented ±1 year buffer for age matching to increase activity variety
  - Example: 6-year-olds can now access both 5-6 and 6-7 activities (29-94% more options)
- **Age Calculation Fix**: Fixed incorrect age calculation - August 2019 birth now correctly shows 6 years old (was showing 5)
- **Profile Persistence Fix**: Removed localStorage clearing that was deleting saved profiles on each home page visit

### Pagination System Implementation (August 11, 2025)
- **Proper Pagination**: Implemented 2 activities per page instead of 5 at once
- **"Show More Ideas" Feature**: Incremental loading of 2 more activities per click
- **Activity Counter**: Shows current/total activities (e.g., "Show More Ideas (2/31)")
- **Dual Action Buttons**: 
  - "Show More Ideas" - loads next 2 activities from same filtered set
  - "Get Different Ideas" - completely refreshes with new random selection
- **Consistent Ordering**: Uses seed-based shuffling for stable pagination within sessions
- **Backend API**: RESTful pagination with page parameter and hasMore indicator

### Activity Distribution
- All age ranges (5-6, 6-7, 7-8): Full coverage across all filter combinations
- All energy levels (calm, focused, active, silly): Complete coverage
- All play styles (alone, together, group): Comprehensive options
- **Status**: System fully operational with complete activity coverage, flexible age matching, and proper pagination

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for profile management, activity generation, and saved activities
- **Development**: tsx for TypeScript execution in development, esbuild for production builds
- **Request Logging**: Custom middleware for API request/response logging

### Data Storage Solutions
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: PostgreSQL (via Neon serverless) for persistent data storage with DatabaseStorage implementation
- **Local Storage**: Browser localStorage for client-side caching of user preferences and filters
- **Migration Tool**: Database schema changes managed through `npm run db:push` command
- **Data Seeding**: Automatic seeding of activity data on server startup to populate the database

### Database Schema Design
- **Kid Profiles**: Stores child information (name, birth date, interests)
- **Activities**: Pre-seeded activity database with metadata (materials, steps, age ranges, tags)
- **Saved Activities**: User favorites with usage tracking
- **Users**: Basic user authentication structure (prepared for future auth implementation)

### Authentication and Authorization
- **Current State**: No authentication implemented (MVP focuses on single-user experience)
- **Prepared Infrastructure**: User schema and session storage setup ready for future auth integration
- **Session Management**: connect-pg-simple for PostgreSQL session storage when auth is implemented

### External Dependencies
- **Database Hosting**: Neon serverless PostgreSQL for managed database infrastructure
- **UI Components**: Extensive Radix UI ecosystem for accessible, unstyled primitives
- **Development Tools**: Replit-specific plugins for development environment integration
- **Fonts**: Google Fonts (Inter) for typography
- **Icons**: Font Awesome and Lucide React for iconography

### Architecture Patterns
- **Monorepo Structure**: Client, server, and shared code organized in separate directories
- **Shared Types**: Common TypeScript types and Zod schemas in shared directory
- **Service Layer**: Abstracted data access through storage interfaces for flexibility
- **Component Composition**: Reusable UI components with consistent prop interfaces
- **Query Caching**: Aggressive caching strategy with TanStack Query for optimal performance

### Build and Deployment
- **Development**: Vite dev server with hot module replacement
- **Production**: Client assets built to dist/public, server bundled with esbuild
- **Type Safety**: Comprehensive TypeScript configuration across all packages
- **Path Aliases**: Configured import aliases for clean import statements