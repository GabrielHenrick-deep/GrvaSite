import React from 'react';
import { useNavigate } from 'react-router-dom';
import { news } from '../data/news';

export function BlogPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">
          Blog LabResearch
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => navigate(`/blog/${article.slug}`)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{article.author}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}