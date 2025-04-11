import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { news } from '../data/news';

export function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = news.find(n => n.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Artigo não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2" />
          Voltar para o blog
        </button>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                {article.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(article.date).toLocaleDateString('pt-BR')}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <div className="flex items-center text-sm text-gray-500 mb-8">
              <span>Por {article.author}</span>
            </div>

            <div className="prose max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}