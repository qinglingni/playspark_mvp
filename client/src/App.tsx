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
  const isOnboardingComplete = localStorageService.isOnboardingComplete();
  
  // If onboarding not complete, show onboarding
  if (!isOnboardingComplete) {
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
