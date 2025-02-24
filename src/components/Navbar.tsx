import React, { useState, useEffect, useRef } from 'react';
import { Category } from '../types';
import { Search, X, ChevronDown, ChevronUp } from 'lucide-react';

interface NavbarProps {
  categories: Category[];
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

// Popular categories to show by default
const POPULAR_CATEGORIES = [
  'Science',
  'History',
  'Technology',
  'Nature',
  'Art',
  'Space',
  'Animals',
  'Music'
];

// Category groups for the modal
const CATEGORY_GROUPS = {
  'Science & Technology': [
    'Science', 'Technology', 'Space', 'AI & Robotics', 'Computer Science', 
    'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Engineering',
    'Astronomy', 'Electronics', 'Quantum Physics', 'Neuroscience'
  ],
  'History & Culture': [
    'History', 'Ancient History', 'World Wars', 'Medieval History', 
    'Ancient Civilizations', 'Military History', 'Renaissance',
    'Historical Figures', 'Archaeology', 'Mythology'
  ],
  'Arts & Entertainment': [
    'Art', 'Music', 'Cinema', 'Literature', 'Architecture', 
    'Theater', 'Dance', 'Photography', 'Animation', 'Comics',
    'Classical Music', 'Popular Music'
  ],
  'Nature & Environment': [
    'Nature', 'Animals', 'Plants', 'Ocean Life', 'Climate', 
    'Birds', 'Mammals', 'Insects', 'Forests', 'Marine Biology',
    'Ecosystems', 'Conservation'
  ],
  'Society & Philosophy': [
    'Philosophy', 'Psychology', 'Religion', 'Politics', 'Economics',
    'Sociology', 'Education', 'Law', 'Ethics', 'Anthropology'
  ],
  'Sports & Recreation': [
    'Sports', 'Olympics', 'Football', 'Basketball', 'Tennis',
    'Martial Arts', 'Chess', 'E-sports', 'Swimming', 'Athletics'
  ],
  'Health & Medicine': [
    'Medicine', 'Mental Health', 'Nutrition', 'Diseases', 
    'Medical Research', 'Public Health', 'Anatomy', 'Surgery'
  ],
  'Innovation & Technology': [
    'Inventions', 'Innovation', 'Space Technology', 'Green Technology',
    'Transportation', 'AI & Robotics', 'Biotechnology', 'Nanotechnology'
  ]
};

export function Navbar({ categories, selectedCategory, onSelectCategory }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const getCategoryByName = (name: string) => {
    return categories.find(cat => cat.name === name);
  };

  const popularCategories = POPULAR_CATEGORIES
    .map(getCategoryByName)
    .filter((cat): cat is Category => cat !== undefined);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => 
      prev.includes(group) 
        ? prev.filter(g => g !== group)
        : [...prev, group]
    );
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const CategoryModal = () => (
    <div className="fixed inset-0 bg-black/80 z-[200] flex items-start justify-center pt-20">
      <div className="bg-gray-900 rounded-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 p-4 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold">All Categories</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="bg-white/10 px-4 py-2 rounded-full outline-none w-64"
              />
            </div>
            <button
              onClick={() => {
                setIsMoreModalOpen(false);
                setSearchQuery('');
              }}
              className="p-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          {searchQuery ? (
            <div className="grid grid-cols-2 gap-2">
              {filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onSelectCategory(category);
                    setIsMoreModalOpen(false);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-lg text-left text-white bg-white/10`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          ) : (
            Object.entries(CATEGORY_GROUPS).map(([group, categoryNames]) => (
              <div key={group} className="mb-4">
                <button
                  onClick={() => toggleGroup(group)}
                  className="w-full flex items-center justify-between p-2 rounded-lg"
                >
                  <span className="font-bold">{group}</span>
                  {expandedGroups.includes(group) ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {expandedGroups.includes(group) && (
                  <div className="grid grid-cols-2 gap-2 mt-2 pl-2">
                    {categoryNames.map(name => {
                      const category = getCategoryByName(name);
                      if (!category) return null;
                      return (
                        <button
                          key={category.id}
                          onClick={() => {
                            onSelectCategory(category);
                            setIsMoreModalOpen(false);
                          }}
                          className={`px-4 py-2 rounded-lg text-left text-white bg-white/10`}
                        >
                          {category.name}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-[100] p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="mb-2">
            <h1 className="text-xl font-bold">WikiSwipe</h1>
          </div>
          
          {isSearchOpen && (
            <div className="flex items-center bg-white/10 rounded-full mb-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="bg-transparent px-4 py-2 outline-none text-white w-full"
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-2"
              >
                <X size={20} />
              </button>
            </div>
          )}
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {(searchQuery ? filteredCategories : popularCategories).map((category) => (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-white bg-white/10`}
              >
                {category.name}
              </button>
            ))}
            <button
              onClick={() => setIsMoreModalOpen(true)}
              className="px-4 py-2 rounded-full bg-white/10 flex items-center whitespace-nowrap"
            >
              More
            </button>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full bg-white/10 whitespace-nowrap"
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      </nav>
      {isMoreModalOpen && <CategoryModal />}
    </>
  );
}
