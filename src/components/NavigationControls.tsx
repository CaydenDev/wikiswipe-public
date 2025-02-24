import React, { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function NavigationControls({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: NavigationControlsProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // Don't handle wheel events when text is selected
      if (window.getSelection()?.toString()) {
        return;
      }

      // Check if we're scrolling on an interactive element
      const target = event.target as HTMLElement;
      if (target.closest('button, a, input, select, textarea, [role="button"], [tabindex]')) {
        return;
      }

      if (event.deltaY > 0 && hasNext) {
        event.preventDefault();
        onNext();
      } else if (event.deltaY < 0 && hasPrevious) {
        event.preventDefault();
        onPrevious();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      // Don't handle touch events on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, select, textarea, [role="button"], [tabindex]')) {
        return;
      }

      setTouchEnd(null);
      setTouchStart(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Don't handle touch events on interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, select, textarea, [role="button"], [tabindex]')) {
        return;
      }

      setTouchEnd(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isSwipe = Math.abs(distance) >= minSwipeDistance;

      if (isSwipe) {
        if (distance > 0 && hasNext) {
          onNext();
        } else if (distance < 0 && hasPrevious) {
          onPrevious();
        }
      }

      setTouchStart(null);
      setTouchEnd(null);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [hasNext, hasPrevious, onNext, onPrevious, touchStart, touchEnd]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-4">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`p-2 rounded-full transition-all ${
          hasPrevious 
            ? 'opacity-75 hover:opacity-100 bg-white/10 hover:bg-white/20 cursor-pointer' 
            : 'opacity-0 cursor-default'
        }`}
        aria-label="Previous article"
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`p-2 rounded-full transition-all ${
          hasNext 
            ? 'opacity-75 hover:opacity-100 bg-white/10 hover:bg-white/20 cursor-pointer' 
            : 'opacity-0 cursor-default'
        }`}
        aria-label="Next article"
      >
        <ChevronDown className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}