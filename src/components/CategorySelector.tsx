import React from 'react';
import { useStore } from '../store';

export function CategorySelector() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-2 bg-gray-900/80 backdrop-blur-sm p-2 rounded-full overflow-x-auto max-w-[90vw] no-scrollbar">
        {categories.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-white/80`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}