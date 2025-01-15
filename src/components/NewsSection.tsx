import React, { useState } from 'react';
import { format } from 'date-fns';
import { MessageCircle, ThumbsUp } from 'lucide-react';

interface Comment {
  id: number;
  username: string;
  content: string;
  created_at: string;
}

interface NewsItem {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  comments: Comment[];
  likes: number;
}

// Temporary static data until database connection is implemented
const staticNews: NewsItem[] = [
  {
    id: 1,
    title: "¡Nueva actualización disponible!",
    content: "Descubre las nuevas características y mejoras en la última actualización del juego.",
    image_url: "https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1000",
    created_at: "2024-01-15T10:00:00Z",
    comments: [
      {
        id: 1,
        username: "Usuario1",
        content: "¡Increíbles novedades!",
        created_at: "2024-01-15T11:00:00Z"
      }
    ],
    likes: 15
  },
  {
    id: 2,
    title: "Evento especial de primavera",
    content: "Prepárate para el evento especial de primavera con recompensas únicas.",
    image_url: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=1000",
    created_at: "2024-01-14T15:00:00Z",
    comments: [],
    likes: 8
  }
];

export default function NewsSection() {
  const [news] = useState<NewsItem[]>(staticNews);
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (newsId: number) => {
    if (!newComment.trim()) return;
    
    // Temporary comment handling until database connection is implemented
    setNewComment('');
    alert('La funcionalidad de comentarios estará disponible próximamente');
  };

  const handleLike = (newsId: number) => {
    // Temporary like handling until database connection is implemented
    alert('La funcionalidad de likes estará disponible próximamente');
  };

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Últimas <span className="text-amber-500">Noticias</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-slate-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300">
              <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-amber-500 text-sm mb-2">
                  {format(new Date(item.created_at), 'dd MMM yyyy')}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.content}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => handleLike(item.id)}
                    className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {item.likes}
                  </button>
                  <button 
                    onClick={() => setSelectedNews(selectedNews === item.id ? null : item.id)}
                    className="flex items-center text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {item.comments.length}
                  </button>
                </div>

                {selectedNews === item.id && (
                  <div className="mt-4 space-y-4">
                    <div className="space-y-4">
                      {item.comments.map((comment) => (
                        <div key={comment.id} className="bg-slate-800 rounded p-3">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-amber-500 text-sm">{comment.username}</span>
                            <span className="text-gray-500 text-xs">
                              {format(new Date(comment.created_at), 'dd MMM yyyy')}
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Añade un comentario..."
                        className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        onClick={() => handleAddComment(item.id)}
                        className="px-4 py-2 bg-amber-500 text-slate-900 rounded text-sm hover:bg-amber-400 transition-colors"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}