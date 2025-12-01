import React, { useState, useEffect } from 'react';
import SectionTitle from './SectionTitle';
import { Send, Heart, Loader2 } from 'lucide-react';
import { weddingConfig } from '../config';

interface Wish {
  name: string;
  message: string;
  date: string;
}

const Wishes: React.FC = () => {
  // START EMPTY: No hardcoded samples
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const { rsvpApiUrl } = weddingConfig;

  // Fetch Wishes from Google Sheet
  useEffect(() => {
    const fetchWishes = async () => {
      // If no API URL is set, we just stop loading and show empty state
      if (!rsvpApiUrl) {
         setFetching(false);
         return;
      }

      try {
        const response = await fetch(rsvpApiUrl);
        const data = await response.json();
        if (Array.isArray(data)) {
          setWishes(data);
        }
      } catch (error) {
        console.error("Error fetching wishes:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchWishes();
  }, [rsvpApiUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    setLoading(true);

    try {
        if (rsvpApiUrl) {
            await fetch(rsvpApiUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message, type: 'wish' })
            });
        }
        
        // Optimistic UI update (Show immediately)
        const newWish: Wish = {
            name,
            message,
            date: new Date().toLocaleDateString('vi-VN')
        };
        
        setWishes([newWish, ...wishes]);
        setName('');
        setMessage('');
    } catch (error) {
        console.error("Error submitting wish", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white border-t border-wedding-primary/10">
      <div className="max-w-5xl mx-auto px-4">
         <SectionTitle title="Guest Book" subtitle="Lưu bút ngày chung đôi" />
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form - 4 Columns */}
            <div className="lg:col-span-5 bg-wedding-bg p-8 rounded-2xl shadow-inner border border-wedding-primary/10 h-fit">
               <h3 className="text-2xl font-serif text-wedding-text mb-6">Gửi Lời Chúc</h3>
               <form onSubmit={handleSubmit} className="space-y-5">
                  <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-wedding-primary rounded-lg outline-none transition-all shadow-sm"
                    placeholder="Tên của bạn..."
                    required
                  />
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-wedding-primary rounded-lg outline-none transition-all shadow-sm h-40 resize-none"
                    placeholder="Viết lời chúc..."
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-wedding-primary text-white py-3 rounded-lg font-medium hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <Send size={16} />}
                    {loading ? "Đang gửi..." : "Gửi Lời Chúc"}
                  </button>
               </form>
            </div>

            {/* List - 8 Columns */}
            <div className="lg:col-span-7">
               {fetching ? (
                 <div className="flex justify-center items-center h-40">
                    <Loader2 className="animate-spin text-wedding-primary" size={32} />
                 </div>
               ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {wishes.length === 0 ? (
                        <div className="col-span-1 md:col-span-2 text-center py-10 opacity-70">
                            <Heart className="w-12 h-12 text-wedding-primary/30 mx-auto mb-3" />
                            <p className="text-gray-500 italic">Chưa có lời chúc nào.</p>
                            <p className="text-wedding-primary font-medium mt-1">Hãy là người đầu tiên gửi lời chúc!</p>
                        </div>
                    ) : (
                        wishes.map((wish, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl border border-wedding-primary/10 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                <span className="font-bold text-wedding-primary">{wish.name}</span>
                                <Heart size={14} className="text-wedding-primary fill-wedding-primary" />
                                </div>
                                <p className="text-gray-600 text-sm italic mb-3 leading-relaxed">"{wish.message}"</p>
                                <p className="text-xs text-wedding-primary/60 text-right">{wish.date}</p>
                            </div>
                        ))
                    )}
                </div>
               )}
            </div>
         </div>
      </div>
    </section>
  );
};
export default Wishes;