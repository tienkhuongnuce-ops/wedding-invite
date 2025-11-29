import { Coffee, GlassWater, Music } from 'lucide-react';
import React from 'react';

// --- CONFIGURATION START ---
// Customize your wedding details here.

export const weddingConfig = {
  groom: {
    firstName: "Tiến Khương",
    fullName: "Nguyễn Tiến Khương",
    father: "", // Added to satisfy TypeScript interface in Invitation.tsx. Leave empty if not applicable.
    mother: "Tiến Thị Hằng",
    address: "Hưng Đạo, Quốc Oai, Hà Nội",
    role: "Chú Rể (The Groom)",
    mapUrl: "https://www.google.com/maps/dir/?api=1&destination=20.976492453098412, 105.67053970444307"
  },
  bride: {
    firstName: "Thu Phương",
    fullName: "Đào Thu Phương",
    father: "Đào Xuân Tùng",
    mother: "Lê Thị Thúy",
    address: "Tiền Hải, Thái Bình",
    role: "Cô Dâu (The Bride)",
    mapUrl: "https://www.google.com/maps/dir/?api=1&destination=20.4399119892005, 106.53997740644134"
  },
  date: {
    fullDate: "28 . 12 . 2025",
    dayOfWeek: "Chủ Nhật (Sunday)",
    day: "28",
    month: "12",
    year: "2025",
    time: "11:30",
    rsvpDeadline: "01/12/2025"
  },
  video: {
    title: "Pre-wedding Film",
    subtitle: "Lưu giữ khoảnh khắc",
    // Replace this with your YouTube Embed URL
    // Format: https://www.youtube.com/embed/VIDEO_ID
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=Example", 
    description: "Tình yêu không phải là tìm thấy một người hoàn hảo, mà là học cách nhìn thấy những điều tuyệt vời từ một người chưa hoàn hảo."
  },
  images: {
    // The main large photo at the top
    hero: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    // Photos for the gallery section
    gallery: [
      "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519225448526-0645155be456?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1623940866099-da1869e5d774?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=800&auto=format&fit=crop",
    ]
  },
  timeline: [
    {
      time: "09:00 AM",
      title: "Lễ Vu Quy (Tea Ceremony)",
      location: "Nhà Riêng Cô Dâu",
      iconType: "Coffee" // Maps to Lucide icons in Timeline.tsx
    },
    {
      time: "11:30 AM",
      title: "Lễ Thành Hôn (Wedding Ceremony)",
      location: "Trung Tâm Hội Nghị Gem Center",
      iconType: "GlassWater"
    },
    {
      time: "12:30 PM",
      title: "Khai Tiệc (Reception)",
      location: "Sảnh Pollux - Gem Center",
      iconType: "Music"
    }
  ]
};