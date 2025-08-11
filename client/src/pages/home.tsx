import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Settings, Heart, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { FilterButton } from "@/components/FilterButton";
import { localStorageService, calculateAge } from "@/lib/storage";
import { ActivityFilters, KidProfile } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState<Partial<ActivityFilters>>({
    allowRepeats: true
  });

  const { data: profile } = useQuery<KidProfile | null>({
    queryKey: ['/api/profile'],
    enabled: true
  });

  useEffect(() => {
    // Load saved filters or use good defaults
    const savedFilters = localStorageService.getFilters();
    const defaultFilters = {
      allowRepeats: true,
      whoPlaying: "together",
      energyLevel: "focused",
      location: "indoor",
      ...savedFilters // Keep any existing filters that work
    };
    setFilters(defaultFilters);
    localStorageService.setFilters(defaultFilters);
  }, []);

  const updateFilter = (key: keyof ActivityFilters, value: any) => {
    const currentValue = filters[key];
    const newFilters = { ...filters };
    
    // Allow deselection - if clicking the same value, remove it
    if (currentValue === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
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
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-gradient-to-b from-pink-50 to-purple-50">
      {/* Header */}
      <div className="rainbow-gradient p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bounce-gentle">Hey there! 👋</h1>
            <p className="text-white/90 text-lg">Ready for some fun, {displayName}?</p>
          </div>
          <button
            onClick={() => navigate('/settings')}
            className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-all scale-on-hover"
          >
            <Settings className="text-white" size={24} />
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-purple-800 mb-2 sparkle">Let's find the perfect activity!</h3>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mx-auto"></div>
        </div>

        {/* Who's Playing Filter */}
        <div>
          <label className="block text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">👥</span>
            Who's playing?
          </label>
          <div className="grid grid-cols-3 gap-3">
            <FilterButton
              isSelected={filters.whoPlaying === "alone"}
              onClick={() => updateFilter('whoPlaying', 'alone')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">🧒</div>
              <span className="text-sm font-bold">Kid Alone</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.whoPlaying === "together"}
              onClick={() => updateFilter('whoPlaying', 'together')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">👨‍👧‍👦</div>
              <span className="text-sm font-bold">You + Kid</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.whoPlaying === "group"}
              onClick={() => updateFilter('whoPlaying', 'group')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">👥</div>
              <span className="text-sm font-bold">Group Fun</span>
            </FilterButton>
          </div>
        </div>

        {/* Time Available Filter */}
        <div>
          <label className="block text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">⏰</span>
            How much time do you have?
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['15', '30', '60'].map(time => (
              <FilterButton
                key={time}
                isSelected={filters.timeAvailable === time}
                onClick={() => updateFilter('timeAvailable', time)}
                className="p-4 scale-on-hover"
              >
                <div className="text-2xl font-bold text-orange-500">{time}</div>
                <div className="text-sm font-semibold">mins</div>
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Energy Level Filter */}
        <div>
          <label className="block text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">⚡</span>
            What's your energy like?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <FilterButton
              isSelected={filters.energyLevel === "calm"}
              onClick={() => updateFilter('energyLevel', 'calm')}
              className="p-4 scale-on-hover"
            >
              <div className="text-3xl mb-1">🧘</div>
              <span className="text-base font-bold">Calm</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.energyLevel === "focused"}
              onClick={() => updateFilter('energyLevel', 'focused')}
              className="p-4 scale-on-hover"
            >
              <div className="text-3xl mb-1">🧠</div>
              <span className="text-base font-bold">Focused</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.energyLevel === "active"}
              onClick={() => updateFilter('energyLevel', 'active')}
              className="p-4 scale-on-hover"
            >
              <div className="text-3xl mb-1">🏃</div>
              <span className="text-base font-bold">Active</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.energyLevel === "silly"}
              onClick={() => updateFilter('energyLevel', 'silly')}
              className="p-4 scale-on-hover"
            >
              <div className="text-3xl mb-1">🤪</div>
              <span className="text-base font-bold">Silly</span>
            </FilterButton>
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">📍</span>
            Where are you playing?
          </label>
          <div className="grid grid-cols-2 gap-4">
            <FilterButton
              isSelected={filters.location === "indoor"}
              onClick={() => updateFilter('location', 'indoor')}
              className="p-5 scale-on-hover"
            >
              <div className="text-4xl mb-2">🏠</div>
              <span className="text-base font-bold">Inside</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.location === "outdoor"}
              onClick={() => updateFilter('location', 'outdoor')}
              className="p-5 scale-on-hover"
            >
              <div className="text-4xl mb-2">🌳</div>
              <span className="text-base font-bold">Outside</span>
            </FilterButton>
          </div>
        </div>

        {/* Mess Level Filter */}
        <div>
          <label className="block text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">🧽</span>
            How messy is okay?
          </label>
          <div className="grid grid-cols-3 gap-3">
            <FilterButton
              isSelected={filters.messLevel === "no-mess"}
              onClick={() => updateFilter('messLevel', 'no-mess')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">✨</div>
              <span className="text-sm font-bold">No Mess</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.messLevel === "little-mess"}
              onClick={() => updateFilter('messLevel', 'little-mess')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">🧻</div>
              <span className="text-sm font-bold">Little Mess</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.messLevel === "messy"}
              onClick={() => updateFilter('messLevel', 'messy')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">🎨</div>
              <span className="text-sm font-bold">Let's Get Messy!</span>
            </FilterButton>
          </div>
        </div>

        {/* Materials Available Filter */}
        <div>
          <label className="block text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="text-2xl mr-2">🎒</span>
            What materials do you have?
          </label>
          <div className="grid grid-cols-3 gap-3">
            <FilterButton
              isSelected={filters.materialsNeeded === "none"}
              onClick={() => updateFilter('materialsNeeded', 'none')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">🙌</div>
              <span className="text-sm font-bold">Just Us!</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.materialsNeeded === "basic"}
              onClick={() => updateFilter('materialsNeeded', 'basic')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">📎</div>
              <span className="text-sm font-bold">Basic Stuff</span>
            </FilterButton>
            <FilterButton
              isSelected={filters.materialsNeeded === "special"}
              onClick={() => updateFilter('materialsNeeded', 'special')}
              className="p-4 scale-on-hover"
            >
              <div className="text-2xl mb-1">🎨</div>
              <span className="text-sm font-bold">Craft Supplies</span>
            </FilterButton>
          </div>
        </div>

        {/* Repeats Toggle */}
        <div className="flex items-center justify-between p-5 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-200">
          <div>
            <div className="font-bold text-purple-800 flex items-center">
              <span className="text-xl mr-2">🔄</span>
              Include recent activities?
            </div>
            <div className="text-sm text-purple-600">Show activities we've done recently</div>
          </div>
          <Switch
            checked={filters.allowRepeats}
            onCheckedChange={(checked) => updateFilter('allowRepeats', checked)}
          />
        </div>
      </div>

      {/* Generate Button */}
      <div className="p-6 bg-gradient-to-b from-pink-50 to-purple-50">
        <Button
          onClick={handleGenerateIdeas}
          className="w-full rainbow-gradient text-white py-5 rounded-2xl font-bold text-xl shadow-xl flex items-center justify-center space-x-3 wiggle"
        >
          <Sparkles size={24} className="sparkle" />
          <span>✨ SPARK IDEAS! ✨</span>
          <Sparkles size={24} className="sparkle" />
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="flex bg-white border-t-4 border-purple-200 pb-safe">
        <button className="flex-1 p-4 text-center text-purple-600 bg-purple-50">
          <Home className="text-xl mb-1 mx-auto bounce-gentle" size={24} />
          <span className="text-sm font-bold">Home</span>
        </button>
        <button 
          onClick={() => navigate('/saved')}
          className="flex-1 p-4 text-center text-pink-400 hover:text-pink-600 transition-colors scale-on-hover"
        >
          <Heart className="text-xl mb-1 mx-auto" size={24} />
          <span className="text-sm font-bold">Saved</span>
        </button>
      </div>
    </div>
  );
}
