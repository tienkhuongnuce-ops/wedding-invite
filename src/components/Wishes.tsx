import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { Send, Heart } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

const Wishes: React.FC = () => {
  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, name: "Minh Anh", message: "Chúc hai bạn trăm năm hạnh phúc! Sớm sinh quý tử nhé.", date: "20/12/2025" },
    { id: 2, name: "Hoàng Nam", message: "Chúc mừng hạnh phúc hai bạn. Mong hai bạn luôn yêu thương và nhường nhịn nhau.", date: "21/12/2025" },
    { id: 3, name: "Thu Hà", message: "Đám cưới như mơ, chúc mừng chúc mừng!", date: "22/12/2025" }
  ]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    const newWish: Wish = {
      id: Date.now(),
      name,
      message,
      date: new Date().toLocaleDateString('vi-VN')
    };
    
    setWishes([newWish, ...wishes]);
    setName('');
    setMessage('');
  };

  return (
    <section className="py-24 bg-white border-t border-wedding-gold/10">
      <div className="max-w-5xl mx-auto px-4">
         <SectionTitle title="Guest Book" subtitle="Lưu bút ngày chung đôi" />
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form - 4 Columns */}
            <div className="lg:col-span-5 bg-wedding-cream p-8 rounded-2xl shadow-inner border border-wedding-gold/20">
               <h3 className="text-2xl font-serif text-wedding-text mb-6">Gửi Lời Chúc</h3>
               <form onSubmit={handleSubmit} className="space-y-5">
                  <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-wedding-gold rounded-lg outline-none transition-all shadow-sm"
                    placeholder="Tên của bạn..."
                    required
                  />
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-wedding-gold rounded-lg outline-none transition-all shadow-sm h-40 resize-none"
                    placeholder="Viết lời chúc..."
                    required
                  />
                  <button type="submit" className="w-full bg-wedding-red text-white py-3 rounded-lg font-medium hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-md">
                    <Send size={16} />
                    Gửi Lời Chúc
                  </button>
               </form>
            </div>

            {/* List - 8 Columns */}
            <div className="lg:col-span-7">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {wishes.map((wish) => (
                     <div key={wish.id} className="bg-white p-6 rounded-xl border border-wedding-gold/10 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                           <span className="font-bold text-wedding-red">{wish.name}</span>
                           <Heart size={14} className="text-wedding-red fill-wedding-red" />
                        </div>
                        <p className="text-gray-600 text-sm italic mb-3 leading-relaxed">"{wish.message}"</p>
                        <p className="text-xs text-wedding-gold text-right">{wish.date}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};
export default Wishes;