import { Coffee, GlassWater, Music } from 'lucide-react';
import React from 'react';

// --- CONFIGURATION START ---
// Customize your wedding details here.

export const weddingConfig = {
  // RENAME THIS TO YOUR GOOGLE SCRIPT URL AFTER DEPLOYING (See README)
  rsvpApiUrl: "", 

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
    // IMPORTANT: Put these images in the "public" folder at the project root.
    // Example: public/hero.jpg
    hero: "/Couple.jpg", 
    
    // Rename your gallery photos to match these names:
    gallery: [
      "/gallery1.jpg",
      "/gallery2.jpg",
      "/gallery3.jpg",
      "/gallery4.jpg",
      "/gallery5.jpg",
      "/gallery6.jpg",
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