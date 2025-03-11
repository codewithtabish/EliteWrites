import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FeaturedBlogsSkeleton = () => {
  return (
    <div className="bg-transparent py-12 px-6">
      <h2 className="text-white opacity-50 text-3xl font-bold mb-8 text-center">
        Featured Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-40 rounded-lg" />
            
            {/* Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded" />

            {/* Category & Text Skeleton */}
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogsSkeleton;
