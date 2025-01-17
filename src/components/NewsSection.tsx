import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { MessageCircle, ThumbsUp, Loader2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import DOMPurify from 'dompurify';

interface Comment {
  id: string;
  username: string;
  content: string;
  created_at: string;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
  comments: Comment[];
  likes: number;
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newComment, setNewComment] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchNews();
  }, [page]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('news')
        .select(`
          *,
          comments:news_comments(*)
        `)
        .order('created_at', { ascending: false })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (error) throw error;

      if (data) {
        setNews(prev => page === 1 ? data : [...prev, ...data]);
        setHasMore(data.length === itemsPerPage);
      }
    } catch (err) {
      setError('Error al cargar las noticias');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (newsId: string) => {
    if (!newComment.trim()) return;

    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      setError('Debes iniciar sesión para comentar');
      return;
    }

    try {
      const { error } = await supabase
        .from('news_comments')
        .insert({
          news_id: newsId,
          user_id: user.data.user.id,
          content: newComment
        });

      if (error) throw error;

      setNewComment('');
      fetchNews();
    } catch (err) {
      setError('Error al añadir el comentario');
      console.error('Error:', err);
    }
  };

  const handleLike = async (newsId: string) => {
    const user = await supabase.auth.getUser();
    if (!user.data.user) {
      setError('Debes iniciar sesión para dar like');
      return;
    }

    try {
      const { error } = await supabase.rpc('increment_likes', {
        news_id: newsId
      });

      if (error) throw error;
      fetchNews();
    } catch (err) {
      setError('Error al dar like');
      console.error('Error:', err);
    }
  };

  const createMarkup = (content: string) => {
    return {
      __html: DOMPurify.sanitize(content, {
        ALLOWED_TAGS: ['b', 'em', 'a', 'p', 'strong', 'i', 'ul', 'li'],
        ALLOWED_ATTR: ['href', 'target', 'rel']
      })
    };
  };

  return (
    <section className="py-20 bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          Últimas <span className="text-[#ff4d00]">Noticias</span>
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div 
              key={item.id} 
              className="bg-[#2a2a2a] rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => setSelectedNews(item)}
            >
              <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="text-[#ff4d00] text-sm mb-2">
                  {format(new Date(item.created_at), 'dd MMM yyyy')}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="text-gray-400 mb-4 line-clamp-3">
                  <div dangerouslySetInnerHTML={createMarkup(item.content)} />
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(item.id);
                    }}
                    className="flex items-center text-gray-400 hover:text-[#ff4d00] transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {item.likes}
                  </button>
                  <div className="flex items-center text-gray-400">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    {item.comments?.length || 0}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de Noticia */}
        {selectedNews && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2a2a2a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-[#2a2a2a] p-4 border-b border-[#ff4d00]/20 flex justify-between items-center">
                <h3 className="text-2xl font-bold">{selectedNews.title}</h3>
                <button 
                  onClick={() => setSelectedNews(null)}
                  className="text-gray-400 hover:text-[#ff4d00] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6">
                <img 
                  src={selectedNews.image_url} 
                  alt={selectedNews.title} 
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                
                <div className="prose prose-invert max-w-none mb-8">
                  <div dangerouslySetInnerHTML={createMarkup(selectedNews.content)} />
                </div>

                <div className="border-t border-[#ff4d00]/20 pt-6">
                  <h4 className="text-xl font-semibold mb-4">Comentarios</h4>
                  
                  <div className="space-y-4 mb-6">
                    {selectedNews.comments?.map((comment) => (
                      <div key={comment.id} className="bg-[#1a1a1a] rounded p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-[#ff4d00] text-sm">{comment.username}</span>
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
                      className="flex-1 bg-[#1a1a1a] border border-[#ff4d00]/20 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] focus:border-transparent"
                    />
                    <button
                      onClick={() => handleAddComment(selectedNews.id)}
                      className="px-4 py-2 bg-[#ff4d00] text-white rounded text-sm hover:bg-[#ff8533] transition-colors"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-center mt-8">
            <Loader2 className="w-8 h-8 text-[#ff4d00] animate-spin" />
          </div>
        )}

        {hasMore && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-2 bg-[#ff4d00] text-white rounded hover:bg-[#ff8533] transition-colors"
            >
              Cargar más
            </button>
          </div>
        )}
      </div>
    </section>
  );
}