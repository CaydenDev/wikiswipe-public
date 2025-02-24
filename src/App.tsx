import React, { useEffect, useCallback } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useStore } from './store';
import { fetchRandomArticles } from './api';
import { ArticleCard } from './components/ArticleCard';
import { CategorySelector } from './components/CategorySelector';
import { NavigationControls } from './components/NavigationControls';
import { Navbar } from './components/Navbar';
import { Loader2 } from 'lucide-react';

const LOAD_MORE_THRESHOLD = 3;

function App() {
  const {
    articles,
    currentIndex,
    loading,
    loadingMore,
    selectedCategory,
    setArticles,
    appendArticles,
    setCurrentIndex,
    setLoading,
    setLoadingMore,
  } = useStore();

  const loadMoreArticles = useCallback(async () => {
    if (loadingMore) return;
    
    setLoadingMore(true);
    try {
      const newArticles = await fetchRandomArticles(selectedCategory.query);
      const uniqueArticles = newArticles.filter(
        newArticle => !articles.some(
          existingArticle => existingArticle.pageid === newArticle.pageid
        )
      );
      if (uniqueArticles.length > 0) {
        appendArticles(uniqueArticles);
      } else {
        const retryArticles = await fetchRandomArticles(selectedCategory.query);
        appendArticles(retryArticles);
      }
    } catch (error) {
      console.error('Failed to fetch more articles:', error);
    }
    setLoadingMore(false);
  }, [selectedCategory, loadingMore, appendArticles, setLoadingMore, articles]);

  const navigateToNext = useCallback(() => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);

      if (articles.length - currentIndex <= LOAD_MORE_THRESHOLD) {
        loadMoreArticles();
      }
    }
  }, [currentIndex, articles.length, setCurrentIndex, loadMoreArticles]);

  const navigateToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, setCurrentIndex]);

  const handlers = useSwipeable({
    onSwipedUp: navigateToNext,
    onSwipedDown: navigateToPrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'k') {
        navigateToPrevious();
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        navigateToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateToNext, navigateToPrevious]);

  useEffect(() => {
    async function loadInitialArticles() {
      setLoading(true);
      try {
        const initialArticles = await fetchRandomArticles(selectedCategory.query);
        setArticles(initialArticles);
        setCurrentIndex(0);
        
        const moreArticles = await fetchRandomArticles(selectedCategory.query);
        const uniqueArticles = moreArticles.filter(
          newArticle => !initialArticles.some(
            existingArticle => existingArticle.pageid === newArticle.pageid
          )
        );
        appendArticles(uniqueArticles);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
      setLoading(false);
    }

    loadInitialArticles();
  }, [selectedCategory]);

  const categories = [
    { name: 'Science', query: 'science discoveries breakthroughs research' },
    { name: 'Technology', query: 'technology innovation computing gadgets' },
    { name: 'Space', query: 'space astronomy cosmos planets NASA' },
    { name: 'AI & Robotics', query: 'artificial intelligence robotics machine learning' },
    { name: 'Medicine', query: 'medicine medical health discoveries treatments' },
    
    { name: 'History', query: 'historical events civilizations' },
    { name: 'Ancient History', query: 'ancient civilizations archaeology ruins' },
    { name: 'World Wars', query: 'world war military history battles' },
    { name: 'Mythology', query: 'mythology legends folklore gods' },
    { name: 'Culture', query: 'cultural traditions customs society' },
    
    { name: 'Art', query: 'art paintings sculptures artists' },
    { name: 'Music', query: 'music musicians bands composers' },
    { name: 'Cinema', query: 'films movies directors cinema' },
    { name: 'Literature', query: 'literature books authors novels' },
    { name: 'Architecture', query: 'architecture buildings design' },
    
    { name: 'Nature', query: 'nature wildlife ecosystems' },
    { name: 'Animals', query: 'animals species wildlife behavior' },
    { name: 'Plants', query: 'plants botany flowers trees' },
    { name: 'Ocean Life', query: 'marine life ocean sea creatures' },
    { name: 'Climate', query: 'climate environment ecology conservation' },
    
    { name: 'Philosophy', query: 'philosophy philosophers ideas theories' },
    { name: 'Psychology', query: 'psychology human behavior mind' },
    { name: 'Religion', query: 'religion faith spirituality beliefs' },
    { name: 'Politics', query: 'political history governments systems' },
    { name: 'Economics', query: 'economics financial systems markets' },
    
    { name: 'Sports', query: 'sports athletics competitions' },
    { name: 'Olympics', query: 'olympic games athletes medals' },
    { name: 'Chess', query: 'chess strategy grandmasters tournaments' },
    { name: 'Video Games', query: 'video games gaming industry' },
    
    { name: 'Physics', query: 'physics quantum mechanics energy' },
    { name: 'Chemistry', query: 'chemistry elements reactions compounds' },
    { name: 'Biology', query: 'biology organisms genetics evolution' },
    { name: 'Geology', query: 'geology earth rocks minerals' },
    
    { name: 'Food', query: 'food cuisine cooking culinary' },
    { name: 'Fashion', query: 'fashion design clothing style' },
    { name: 'Transportation', query: 'vehicles transportation aviation' },
    { name: 'Mysteries', query: 'unsolved mysteries phenomena' },
    { name: 'Inventions', query: 'inventions innovation discoveries' }
  ];

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-900 text-white">
      <Navbar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={(category) => {
          setArticles([]);
          setCurrentIndex(0);
          setLoading(true);
          useStore.setState({ selectedCategory: category });
        }}
      />

      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        articles.map((article, index) => (
          <ArticleCard
            key={article.pageid}
            article={article}
            isActive={index === currentIndex}
            position={index - currentIndex}
          />
        ))
      )}

      <NavigationControls
        onPrevious={navigateToPrevious}
        onNext={navigateToNext}
        hasPrevious={currentIndex > 0}
        hasNext={currentIndex < articles.length - 1}
      />

      {loadingMore && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
          <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
}

export default App;