import { create } from 'zustand';
import { Category, WikiArticle } from './types';

interface AppState {
  articles: WikiArticle[];
  currentIndex: number;
  loading: boolean;
  loadingMore: boolean;
  selectedCategory: Category;
  categories: Category[];
  setArticles: (articles: WikiArticle[]) => void;
  appendArticles: (articles: WikiArticle[]) => void;
  setCurrentIndex: (index: number) => void;
  setLoading: (loading: boolean) => void;
  setLoadingMore: (loading: boolean) => void;
  setSelectedCategory: (category: Category) => void;
}

export const useStore = create<AppState>((set) => ({
  articles: [],
  currentIndex: 0,
  loading: false,
  loadingMore: false,
  selectedCategory: { id: 'science', name: 'Science', query: 'science scientific research discoveries' },
  categories: [
    { id: 'science', name: 'Science', query: 'science scientific research discoveries' },
    { id: 'technology', name: 'Technology', query: 'technology technological advancement innovation' },
    { id: 'space', name: 'Space', query: 'space exploration astronomy cosmos' },
    { id: 'ai-robotics', name: 'AI & Robotics', query: 'artificial intelligence robotics machine learning' },
    { id: 'computer-science', name: 'Computer Science', query: 'computer science programming software' },
    { id: 'physics', name: 'Physics', query: 'physics physical science quantum mechanics' },
    { id: 'chemistry', name: 'Chemistry', query: 'chemistry chemical science molecules' },
    { id: 'biology', name: 'Biology', query: 'biology life science organisms' },
    { id: 'mathematics', name: 'Mathematics', query: 'mathematics mathematical concepts theorems' },
    { id: 'engineering', name: 'Engineering', query: 'engineering mechanical electrical civil' },
    { id: 'astronomy', name: 'Astronomy', query: 'astronomy celestial objects planets stars' },
    { id: 'electronics', name: 'Electronics', query: 'electronics circuits electronic devices' },
    { id: 'quantum-physics', name: 'Quantum Physics', query: 'quantum physics mechanics particle physics' },
    { id: 'neuroscience', name: 'Neuroscience', query: 'neuroscience brain research neural' },

    { id: 'history', name: 'History', query: 'history historical events civilization' },
    { id: 'ancient-history', name: 'Ancient History', query: 'ancient history civilization archaeology' },
    { id: 'world-wars', name: 'World Wars', query: 'world war military history conflict' },
    { id: 'medieval-history', name: 'Medieval History', query: 'medieval history middle ages' },
    { id: 'ancient-civilizations', name: 'Ancient Civilizations', query: 'ancient civilizations empires cultures' },
    { id: 'military-history', name: 'Military History', query: 'military history warfare battles strategy' },
    { id: 'renaissance', name: 'Renaissance', query: 'renaissance art culture history' },
    { id: 'historical-figures', name: 'Historical Figures', query: 'historical figures famous people biography' },
    { id: 'archaeology', name: 'Archaeology', query: 'archaeology archaeological discoveries ancient' },
    { id: 'mythology', name: 'Mythology', query: 'mythology myths legends folklore' },

    { id: 'art', name: 'Art', query: 'art artwork artists painting sculpture' },
    { id: 'music', name: 'Music', query: 'music musicians bands composers' },
    { id: 'cinema', name: 'Cinema', query: 'cinema film movies directors' },
    { id: 'literature', name: 'Literature', query: 'literature books authors writing' },
    { id: 'architecture', name: 'Architecture', query: 'architecture buildings design structures' },
    { id: 'theater', name: 'Theater', query: 'theater theatre drama performing arts' },
    { id: 'dance', name: 'Dance', query: 'dance dancing choreography performers' },
    { id: 'photography', name: 'Photography', query: 'photography photographers images camera' },
    { id: 'animation', name: 'Animation', query: 'animation animated films cartoons' },
    { id: 'comics', name: 'Comics', query: 'comics graphic novels comic books' },
    { id: 'classical-music', name: 'Classical Music', query: 'classical music orchestra symphony' },
    { id: 'popular-music', name: 'Popular Music', query: 'popular music pop rock jazz' },

    { id: 'nature', name: 'Nature', query: 'nature natural world wildlife environment' },
    { id: 'animals', name: 'Animals', query: 'animals wildlife species fauna' },
    { id: 'plants', name: 'Plants', query: 'plants flora botany vegetation' },
    { id: 'ocean-life', name: 'Ocean Life', query: 'marine life ocean sea creatures' },
    { id: 'climate', name: 'Climate', query: 'climate weather atmospheric science' },
    { id: 'birds', name: 'Birds', query: 'birds ornithology avian species' },
    { id: 'mammals', name: 'Mammals', query: 'mammals mammalian species animals' },
    { id: 'insects', name: 'Insects', query: 'insects entomology bugs arthropods' },
    { id: 'forests', name: 'Forests', query: 'forests woodland trees ecosystem' },
    { id: 'marine-biology', name: 'Marine Biology', query: 'marine biology ocean life sea' },
    { id: 'ecosystems', name: 'Ecosystems', query: 'ecosystems ecology environment habitat' },
    { id: 'conservation', name: 'Conservation', query: 'conservation preservation wildlife protection' },

    { id: 'philosophy', name: 'Philosophy', query: 'philosophy philosophical thinking concepts' },
    { id: 'psychology', name: 'Psychology', query: 'psychology human behavior mind' },
    { id: 'religion', name: 'Religion', query: 'religion religious beliefs faith' },
    { id: 'politics', name: 'Politics', query: 'politics political systems government' },
    { id: 'economics', name: 'Economics', query: 'economics economy financial systems' },
    { id: 'sociology', name: 'Sociology', query: 'sociology social science society' },
    { id: 'education', name: 'Education', query: 'education learning teaching methods' },
    { id: 'law', name: 'Law', query: 'law legal system justice courts' },
    { id: 'ethics', name: 'Ethics', query: 'ethics moral philosophy principles' },
    { id: 'anthropology', name: 'Anthropology', query: 'anthropology human cultures society' },

    { id: 'sports', name: 'Sports', query: 'sports athletics competition games' },
    { id: 'olympics', name: 'Olympics', query: 'olympics olympic games athletes' },
    { id: 'football', name: 'Football', query: 'football soccer sport teams' },
    { id: 'basketball', name: 'Basketball', query: 'basketball nba sport teams' },
    { id: 'tennis', name: 'Tennis', query: 'tennis sport players tournaments' },
    { id: 'martial-arts', name: 'Martial Arts', query: 'martial arts fighting techniques' },
    { id: 'chess', name: 'Chess', query: 'chess strategy board game' },
    { id: 'esports', name: 'E-sports', query: 'esports competitive gaming tournaments' },

    { id: 'inventions', name: 'Inventions', query: 'inventions inventors innovation technology' },
    { id: 'innovation', name: 'Innovation', query: 'innovation technological advancement progress' },
    { id: 'space-technology', name: 'Space Technology', query: 'space technology rockets satellites' },
    { id: 'green-technology', name: 'Green Technology', query: 'green technology sustainable eco-friendly' },
    { id: 'transportation', name: 'Transportation', query: 'transportation vehicles mobility' },
    { id: 'biotechnology', name: 'Biotechnology', query: 'biotechnology genetic engineering' },
    { id: 'nanotechnology', name: 'Nanotechnology', query: 'nanotechnology molecular technology' }
  ],
  setArticles: (articles) => set({ articles }),
  appendArticles: (newArticles) => 
    set((state) => ({ 
      articles: [...state.articles, ...newArticles] 
    })),
  setCurrentIndex: (currentIndex) => set({ currentIndex }),
  setLoading: (loading) => set({ loading }),
  setLoadingMore: (loadingMore) => set({ loadingMore }),
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
}));