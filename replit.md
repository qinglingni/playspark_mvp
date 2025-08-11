# PlaySpark - Activity Ideas for Kids

## Overview

PlaySpark is a lightweight, just-in-time idea generator for parents to quickly find engaging, age-appropriate activities for their children. The application provides personalized activity suggestions based on child profiles (age, interests) and contextual filters (time available, energy level, location, etc.). The MVP focuses on reducing decision fatigue by surfacing 3-5 tailored activity ideas within seconds with minimal setup required.

## Recent Changes (January 2025)

### Database Expansion and Filter Issue Resolution
- **Issue Identified**: Filter mismatch between frontend default filters and available activities in database
- **Root Cause**: Frontend was sending `energyLevel: "calm"` while most 6-year-old activities had `energyLevel: "focused"`
- **Database Expansion**: Added 9 new activities (60 → 69 total) specifically targeting missing filter combinations
- **Coverage Improvements**: 
  - Calm indoor activities: 1 → 6 activities
  - Active indoor activities: 0 → 4 activities
  - Better distribution across energy levels for ages 5-6 and 6-7
- **Debugging Infrastructure**: Added comprehensive logging system to track filter matching and identify gaps
- **Filter Reset**: Cleared problematic localStorage filters and set working defaults
- **Status**: Database expanded, debugging system in place, some filtering issues may persist

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