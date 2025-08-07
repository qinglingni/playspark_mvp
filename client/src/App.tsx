import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import { localStorageService } from "./lib/storage";
import { useEffect } from "react";

import Home from "@/pages/home";
import Onboarding from "@/pages/onboarding";
import Results from "@/pages/results";
import Saved from "@/pages/saved";
import Settings from "@/pages/settings";
import NotFound from "@/pages/not-found";

function AppRouter() {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['/api/profile'],
    enabled: true,
    retry: false
  });

  const isOnboardingComplete = localStorageService.isOnboardingComplete();

  useEffect(() => {
    // If we have a profile but onboarding isn't marked complete, mark it as complete
    if (profile && !isOnboardingComplete) {
      localStorageService.setOnboardingComplete(true);
    }
  }, [profile, isOnboardingComplete]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-4 animate-pulse"></div>
          <p className="text-neutral-500">Loading PlaySpark...</p>
        </div>
      </div>
    );
  }

  // Show onboarding if no profile exists and onboarding not complete
  if (!profile && !isOnboardingComplete) {
    return <Onboarding />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/onboarding" component={Onboarding} />
      <Route path="/results" component={Results} />
      <Route path="/saved" component={Saved} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
