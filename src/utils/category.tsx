import {
    BookOpen,
    Music,
    Film,
    Brush,
    HeartPulse,
    Dumbbell,
    Code,
    Briefcase,
    Globe,
    Home,
    GraduationCap,
    Plane,
    ShoppingCart,
    Utensils,
    Brain,
    Lightbulb,
    Camera,
    Gamepad,
    FolderOpen,
  } from "lucide-react";
  
  interface Category {
    id: string;
    label: string;
    icon: React.ReactNode;
  }
  
  export const categories: Category[] = [
    { id: "education", label: "Education", icon: <GraduationCap className="w-5 h-5" /> },
    { id: "sports", label: "Sports", icon: <FolderOpen className="w-5 h-5" /> },
    { id: "music", label: "Music", icon: <Music className="w-5 h-5" /> },
    { id: "movies", label: "Movies", icon: <Film className="w-5 h-5" /> },
    { id: "art", label: "Art & Design", icon: <Brush className="w-5 h-5" /> },
    { id: "health", label: "Health & Wellness", icon: <HeartPulse className="w-5 h-5" /> },
    { id: "fitness", label: "Fitness", icon: <Dumbbell className="w-5 h-5" /> },
    { id: "technology", label: "Technology", icon: <Code className="w-5 h-5" /> },
    { id: "business", label: "Business", icon: <Briefcase className="w-5 h-5" /> },
    { id: "travel", label: "Travel", icon: <Plane className="w-5 h-5" /> },
    { id: "food", label: "Food & Cooking", icon: <Utensils className="w-5 h-5" /> },
    { id: "fashion", label: "Fashion & Lifestyle", icon: <ShoppingCart className="w-5 h-5" /> },
    { id: "psychology", label: "Psychology", icon: <Brain className="w-5 h-5" /> },
    { id: "science", label: "Science", icon: <Lightbulb className="w-5 h-5" /> },
    { id: "photography", label: "Photography", icon: <Camera className="w-5 h-5" /> },
    { id: "gaming", label: "Gaming", icon: <Gamepad className="w-5 h-5" /> },
    { id: "news", label: "World News", icon: <Globe className="w-5 h-5" /> },
    { id: "home", label: "Home & Living", icon: <Home className="w-5 h-5" /> },
  ];
  