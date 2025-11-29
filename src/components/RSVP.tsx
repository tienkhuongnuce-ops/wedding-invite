import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { CheckCircle } from 'lucide-react';
import { weddingConfig } from '../config';

const RSVP: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { date } = weddingConfig;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-24 bg-wedding-cream relative border-t border-wedding-gold/10">
      <div className="max-w-2xl mx-auto px-4 relative z-10">
        <SectionTitle title="R.S.V.P" subtitle={`Vui lòng phản hồi trước ngày ${date.rsvpDeadline}`} />

        {submitted ? (
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg animate-fade-in border border-wedding-gold/20">
            <CheckCircle className="mx-auto text-wedding-gold w-16 h-16 mb-4" />
            <h3 className="text-2xl font-serif text-gray-800 mb-2">Thank You!</h3>
            <p className="text-gray-600">Chúng mình đã nhận được phản hồi của bạn.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-wedding-red underline text-sm hover:text-red-800">
              Gửi lại
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-10 space-y-6 border border-wedding-gold/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Họ và Tên</label>
                    <input required type="text" className="w-full border-b-2 border-gray-100 focus:border-wedding-gold px-0 py-2 outline-none transition-colors bg-transparent text-gray-800" placeholder="Nguyễn Văn A" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Số điện thoại</label>
                    <input required type="tel" className="w-full border-b-2 border-gray-100 focus:border-wedding-gold px-0 py-2 outline-none transition-colors bg-transparent text-gray-800" placeholder="0912..." />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tham dự</label>
                <div className="flex gap-4">
                    <label className="flex-1 cursor-pointer">
                        <input type="radio" name="attending" value="yes" className="peer sr-only" defaultChecked />
                        <div className="text-center py-3 border border-gray-200 rounded-lg peer-checked:bg-wedding-red peer-checked:text-white peer-checked:border-transparent transition-all">
                            Có
                        </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                        <input type="radio" name="attending" value="no" className="peer sr-only" />
                        <div className="text-center py-3 border border-gray-200 rounded-lg peer-checked:bg-gray-400 peer-checked:text-white peer-checked:border-transparent transition-all">
                            Không
                        </div>
                    </label>
                </div>
              </div>

              <div>
                 <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Lời nhắn</label>
                 <textarea rows={2} className="w-full border-b-2 border-gray-100 focus:border-wedding-gold px-0 py-2 outline-none transition-colors bg-transparent resize-none text-gray-800" placeholder="Lời chúc..."></textarea>
              </div>

              <button type="submit" className="w-full bg-wedding-red text-white font-bold py-4 rounded-xl hover:bg-red-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Gửi Xác Nhận
              </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RSVP;