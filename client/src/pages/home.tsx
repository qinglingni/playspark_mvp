import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Settings, Heart, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FilterButton } from "@/components/FilterButton";
import { localStorageService, calculateAge } from "@/lib/storage";
import { ActivityFilters } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState<Partial<ActivityFilters>>({
    allowRepeats: true
  });

  const { data: profile } = useQuery({
    queryKey: ['/api/profile'],
    enabled: true
  });

  useEffect(() => {
    // Load saved filters from localStorage
    const savedFilters = localStorageService.getFilters();
    setFilters(prev => ({ ...prev, ...savedFilters }));
  }, []);

  const updateFilter = (key: keyof ActivityFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    localStorageService.setFilters(newFilters);
  };

  const handleGenerateIdeas = () => {
    // Save current filters and navigate to results
    localStorageService.setFilters(filters);
    navigate('/results');
  };

  const displayName = profile?.name || "there";
  const age = profile ? calculateAge(profile.birthMonth, profile.birthYear) : 5;

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Hey there! 👋</h1>
            <p className="text-indigo-100">Ready for some fun, {displayName}?</p>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            <Settings className="text-white" size={20} />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Let's find the perfect activity!</h3>
        </div>

        {/* Who's Playing Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Who's playing?</label>
          <div className="grid grid-cols-2 gap-3">
            <FilterButton
              isSelected={filters.whoPlaying === "alone"}
              onClick={() => updateFilter('whoPlaying', 'alone')}
              className="p-4"
            >
              <i className="fas fa-child text-2xl mb-2 block"></i>
              <span className="text-sm font-medium">Kid Alone</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.whoPlaying === "together"}
              onClick={() => updateFilter('whoPlaying', 'together')}
              className="p-4"
            >
              <i className="fas fa-users text-2xl mb-2 block"></i>
              <span className="text-sm font-medium">You + Kid</span>
            </FilterButton>
          </div>
        </div>

        {/* Time Available Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Time available?</label>
          <div className="grid grid-cols-3 gap-3">
            {['15', '30', '60'].map(time => (
              <FilterButton
                key={time}
                isSelected={filters.timeAvailable === time}
                onClick={() => updateFilter('timeAvailable', time)}
              >
                <div className="text-lg font-bold">{time}</div>
                <div className="text-xs">mins</div>
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Energy Level Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Energy level?</label>
          <div className="grid grid-cols-2 gap-3">
            <FilterButton
              isSelected={filters.energyLevel === "calm"}
              onClick={() => updateFilter('energyLevel', 'calm')}
            >
              <i className="fas fa-leaf text-xl mb-1 block"></i>
              <span className="text-sm font-medium">Calm</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.energyLevel === "focused"}
              onClick={() => updateFilter('energyLevel', 'focused')}
            >
              <i className="fas fa-brain text-xl mb-1 block"></i>
              <span className="text-sm font-medium">Focused</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.energyLevel === "active"}
              onClick={() => updateFilter('energyLevel', 'active')}
            >
              <i className="fas fa-running text-xl mb-1 block"></i>
              <span className="text-sm font-medium">Active</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.energyLevel === "silly"}
              onClick={() => updateFilter('energyLevel', 'silly')}
            >
              <i className="fas fa-laugh text-xl mb-1 block"></i>
              <span className="text-sm font-medium">Silly</span>
            </FilterButton>
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">Where are you?</label>
          <div className="grid grid-cols-2 gap-3">
            <FilterButton
              isSelected={filters.location === "indoor"}
              onClick={() => updateFilter('location', 'indoor')}
              className="p-4"
            >
              <i className="fas fa-home text-2xl mb-2 block"></i>
              <span className="text-sm font-medium">Indoor</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.location === "outdoor"}
              onClick={() => updateFilter('location', 'outdoor')}
              className="p-4"
            >
              <i className="fas fa-tree text-2xl mb-2 block"></i>
              <span className="text-sm font-medium">Outdoor</span>
            </FilterButton>
          </div>
        </div>

        {/* Repeats Toggle */}
        <div className="flex items-center justify-between p-4 bg-neutral-100 rounded-xl">
          <div>
            <div className="font-medium text-neutral-900">Include recent activities?</div>
            <div className="text-sm text-neutral-500">Show activities we've done recently</div>
          </div>
          <Switch
            checked={filters.allowRepeats}
            onCheckedChange={(checked) => updateFilter('allowRepeats', checked)}
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="p-6 bg-white border-t border-neutral-200">
        <Button
          onClick={handleGenerateIdeas}
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center space-x-2"
        >
          <Sparkles size={20} />
          <span>✨ Spark Ideas</span>
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex bg-white border-t border-neutral-200">
        <button className="flex-1 p-4 text-center text-primary">
          <Home className="text-xl mb-1 mx-auto" size={20} />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button 
          onClick={() => navigate('/saved')}
          className="flex-1 p-4 text-center text-neutral-400 hover:text-primary transition-colors"
        >
          <Heart className="text-xl mb-1 mx-auto" size={20} />
          <span className="text-xs font-medium">Saved</span>
        </button>
      </div>
    </div>
  );
}
