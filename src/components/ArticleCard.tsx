import React from 'react';
import { ExternalLink } from 'lucide-react';
import { WikiArticle } from '../types';

interface ArticleCardProps {
  article: WikiArticle;
  isActive: boolean;
  position: number;
}

export function ArticleCard({ article, isActive, position }: ArticleCardProps) {
  const getTransform = () => {
    if (!isActive) {
      const direction = position > 0 ? 1 : -1;
      const scale = Math.max(0.8, 1 - Math.abs(position) * 0.1);
      const translateY = `${direction * Math.min(Math.abs(position) * 100, 100)}vh`;
      const opacity = Math.max(0, 1 - Math.abs(position) * 0.5);
      return {
        transform: `translate3d(0, ${translateY}, 0) scale(${scale})`,
        opacity,
        zIndex: isActive ? 1 : 0,
      };
    }
    return {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      zIndex: 2,
    };
  };

  return (
    <div
      className="fixed inset-0 w-full h-full transition-all duration-300 ease-out"
      style={getTransform()}
    >
      <div className="relative w-full h-full bg-gray-900">
        {article.thumbnail && (
          <div className="absolute inset-0">
            <img
              src={article.thumbnail.source}
              alt={article.title}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
        
        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
          <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
          <p className="text-lg mb-6 line-clamp-4">{article.extract}</p>
          <a
            href={`https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <span>Read More</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-gray-900 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}