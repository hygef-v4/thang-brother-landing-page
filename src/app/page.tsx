"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Brain, Clock, Download, FileText, User, Users, Play, HelpCircle, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Colorful hover effect for titles (like Coolors.co)
const ColorfulTitle = ({ children, className = "" }: { children: string, className?: string }) => {
  // Generate infinite beautiful colors using HSL
  // High saturation (60-90%) and medium-dark lightness (30-50%) for readability on white
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
    const lightness = Math.floor(Math.random() * 20) + 35; // 35-55%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  
  const letters = children.split('');
  
  return (
    <span className={`inline-block ${className}`}>
      {letters.map((letter, i) => {
        const LetterWithHover = () => {
          const [hoverColor, setHoverColor] = useState<string | null>(null);
          const [shouldFade, setShouldFade] = useState(false);
          
          return (
            <motion.span
              className="inline-block cursor-pointer"
              initial={{ color: 'inherit' }}
              animate={{ 
                color: shouldFade ? 'inherit' : (hoverColor || 'inherit'),
                scale: hoverColor && !shouldFade ? 1.1 : 1,
                textShadow: hoverColor && !shouldFade ? '1px 1px 2px rgba(0,0,0,0.1)' : 'none'
              }}
              transition={{
                color: { 
                  duration: shouldFade ? 2.5 : 0.3,
                  ease: shouldFade ? [0.4, 0.0, 0.2, 1] : [0.25, 0.1, 0.25, 1]
                },
                scale: { 
                  duration: 0.3,
                  ease: [0.34, 1.56, 0.64, 1]
                },
                textShadow: { duration: 0.3 }
              }}
              onMouseEnter={() => {
                const color = getRandomColor();
                setHoverColor(color);
                setShouldFade(false);
                
                setTimeout(() => {
                  setShouldFade(true);
                  setTimeout(() => {
                    setHoverColor(null);
                    setShouldFade(false);
                  }, 2000);
                }, 3000);
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          );
        };
        
        return <LetterWithHover key={i} />;
      })}
    </span>
  );
};

// Reusable Reveal Component
const RevealOnScroll = ({ 
  children, 
  delay = 0, 
  duration = 0.8,
  direction = 'up',
  blur = false,
  className = ""
}: { 
  children: React.ReactNode, 
  delay?: number, 
  duration?: number,
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale',
  blur?: boolean,
  className?: string
}) => {
  const getInitial = () => {
    switch (direction) {
      case 'left': return { opacity: 0, x: -50, y: 0 };
      case 'right': return { opacity: 0, x: 50, y: 0 };
      case 'up': return { opacity: 0, y: 50, x: 0 };
      case 'down': return { opacity: 0, y: -50, x: 0 };
      case 'scale': return { opacity: 0, scale: 0.9, y: 0 };
      default: return { opacity: 0, y: 30, x: 0 };
    }
  };

  const getTarget = () => {
     switch (direction) {
      case 'scale': return { opacity: 1, scale: 1, y: 0 };
      default: return { opacity: 1, x: 0, y: 0 };
    }
  };

  return (
    <motion.div
      initial={{ ...getInitial(), filter: blur ? "blur(10px)" : "blur(0px)" }}
      whileInView={{ ...getTarget(), filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }} // Trigger a bit earlier/later
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white relative z-10">
      {/* Header Minimalist */}
      <nav className="fixed top-0 w-full z-50 bg-paper/80 backdrop-blur-sm border-b border-line">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 relative">
               <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="font-serif font-bold text-xl">CLB Triết Học Anh Thắng</span>
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium text-ink-light">
            <a href="#dossier" className="hover:text-black transition-colors">Vụ Việc</a>
            <a href="#characters" className="hover:text-black transition-colors">Nhân Vật</a>
            <a href="#mystery" className="hover:text-black transition-colors">Bí Ẩn</a>
          </div>
          <div className="flex gap-3">
             <a 
              href="https://hygef-v4.itch.io/brother-thang-philosophy-club"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-paper border border-black text-black text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              <Play size={14} /> Chơi Online
            </a>
            <a 
              href="https://hygef-v4.itch.io/brother-thang-philosophy-club"
              target="_blank"
              className="hidden sm:flex px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-accent hover:border-accent transition-colors"
            >
              Tải Demo
            </a>
          </div>
        </div>
      </nav>

      <main className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        
        {/* HERO: Editorial Cover */}
        <section className="max-w-6xl mx-auto mb-16 md:mb-32 lg:mb-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-black"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-ink-light">Visual Novel • Trinh Thám • Triết Học</span>
            </div>
            
            <h1 className="editorial-title mb-4 md:mb-6 max-w-4xl leading-tight text-4xl md:text-5xl lg:text-6xl">
                <ColorfulTitle>Thoát Khỏi Cái Hang.</ColorfulTitle>
              </h1>
            
            <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start mt-12">
              <div className="text-sm font-mono text-ink-light border-t border-black pt-4">
                <p>FILE: #001-THANG</p>
                <p>STATUS: NGUY CẤP</p>
                <p>THỜI HẠN: 15 NGÀY</p>
              </div>
              
              <div>
                <p className="editorial-text mb-8">
                  Bạn là <strong className="text-black">Thắng</strong>. Một tân sinh viên trượt nguyện vọng 1. 
                  Một ông bố Đại tá muốn tống bạn vào quân đội. 
                  Và <strong className="bg-black text-white px-1">15 ngày</strong> cuối cùng để chứng minh: Triết học có thể cứu rỗi cuộc đời bạn (hoặc phá hủy nó).
                </p>
                <div className="flex gap-4">
                  <a href="#dossier" className="group flex items-center gap-2 border-b border-black pb-1 hover:text-accent hover:border-accent transition-colors">
                    Xem Hồ Sơ Vụ Việc <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* STORY: The Dossier */}
        <section id="dossier" className="section-divide bg-paper-dark -mx-4 px-4 md:-mx-6 md:px-6 max-w-none">
            <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              <RevealOnScroll direction="left" delay={0.2}>
                <div>
                  <h2 className="editorial-title"><ColorfulTitle>Vụ Việc.</ColorfulTitle></h2>
                  <p className="editorial-text mb-6">
                    Chuyện gì xảy ra khi một thanh niên Gen Z bị kẹt giữa áp lực gia đình và những tư tưởng triết học quái đản?
                  </p>
                  <ul className="space-y-4 font-mono text-sm text-ink-light mt-8">
                    <li className="flex gap-4 items-start">
                      <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full shrink-0">1</span>
                      <p>Trượt đại học. Bị bố (Đại tá Quân đội) dọa bắt đi nghĩa vụ quân sự.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full shrink-0">2</span>
                      <p>Tham gia CLB Triết Học để "lấy le" nhưng lại bị cuốn vào những cuộc tranh luận sinh tử.</p>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full shrink-0">3</span>
                      <p>Đối mặt với các luồng tư tưởng: Chủ nghĩa Khoái lạc (Xỉu) vs Chủ nghĩa Khắc kỷ (Hải Nữ).</p>
                    </li>
                  </ul>
                </div>
              </RevealOnScroll>
              
              <RevealOnScroll direction="right" delay={0.4}>
                <div className="relative">
                   {/* Embed Placeholder */}
                  <div className="aspect-[16/9] bg-gray-100 border border-line flex items-center justify-center relative shadow-lg">
                      <iframe 
                        src="https://itch.io/embed/4237431?linkback=true&bg_color=fafaf9&fg_color=1c1917&link_color=000000&border_color=e7e5e4" 
                        width="100%" 
                        height="100%" 
                        frameBorder="0"
                        className="w-full h-full"
                      />
                  </div>
                  <p className="font-mono text-xs text-center mt-2 text-ink-light">BẰNG CHỨNG #01: GAMEPLAY FOOTAGE</p>
                </div>
              </RevealOnScroll>
            </div>
            </div>
        </section>

        <section id="mystery" className="section-divide max-w-4xl mx-auto text-center">
             <RevealOnScroll direction="scale" duration={0.6}>
               <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent/10 text-accent mb-6">
                 <HelpCircle size={32} />
               </div>
             </RevealOnScroll>
             
             <RevealOnScroll direction="down" delay={0.2}>
              <h2 className="editorial-title mb-8"><ColorfulTitle>Những Bí Ẩn Bỏ Ngỏ.</ColorfulTitle></h2>
                <p className="editorial-text mx-auto mb-12">
                  Tại sao bố Thắng lại căm ghét Triết học đến vậy? 
                  Liệu Xỉu có thực sự là một "dân chơi" hay đang che giấu một quá khứ đen tối? 
                  Và quan trọng nhất... ai là người điều khiển thực tại này?
                </p>
             </RevealOnScroll>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-left">
                {[
                  "Căn phòng bí mật của Bố.",
                  "Cuốn nhật ký của Xỉu.",
                  "Thí nghiệm 'Cái Hang' của Nữ."
                ].map((item, i) => (
                  <RevealOnScroll key={i} delay={0.4 + (i * 0.1)} direction="up">
                    <div className="bg-white p-6 border border-line shadow-sm h-full">
                       <span className="block font-mono text-xs text-accent mb-2">FILE #{i+10}</span>
                       <p className="font-medium">{item}</p>
                    </div>
                  </RevealOnScroll>
                ))}
             </div>
        </section>

        {/* CHARACTERS: Personnel Files */}
        <section id="characters" className="section-divide bg-paper-dark -mx-4 px-4 md:-mx-6 md:px-6 max-w-none">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll direction="up">
              <h2 className="editorial-title mb-16"><ColorfulTitle>Hồ Sơ Nhân Vật.</ColorfulTitle></h2>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  id: "NV-01",
                  name: "Võ Thắng",
                  role: "The Protagonist (Người Chơi)",
                  desc: "Sinh viên trượt nguyện vọng 1. Bị bố Đại tá dọa bắt đi nghĩa vụ quân sự. Tìm kiếm ý nghĩa cuộc sống qua triết học.",
                  icon: <User size={24} />
                },
                {
                  id: "NV-02",
                  name: "Võ Minh Xỉu",
                  role: "The Hedonist (Khoái Lạc)",
                  desc: "Dân chơi, thích cá cược. Quá khứ bí ẩn tại Campuchia. Luôn tin rằng 'Vui là chính'.",
                  icon: <Download size={24} />
                },
                {
                  id: "NV-03",
                  name: "Vũ Hải Nữ",
                  role: "The Idealist (Lý Tưởng)",
                  desc: "Hội trưởng CLB. Nghiêm túc, ám ảnh với 'Cái Hang Plato'. Muốn tìm ra Chân lý tuyệt đối.",
                  icon: <BookOpen size={24} />
                },
                {
                  id: "NV-04",
                  name: "Đại Tá Hưng",
                  role: "The Authority (Quyền Lực)",
                  desc: "Bố của Thắng. Tin vào Kỷ luật thép. 'Quân đội sẽ dạy mày làm người'.",
                  icon: <Users size={24} />
                },
                {
                  id: "NV-05",
                  name: "T31 (DaoChiCuong)",
                  role: "The Observer (Quan Sát)",
                  desc: "Robot bán hàng do FPT sản xuất. Xuất hiện tại căng tin. Có thể biết nhiều hơn ta tưởng...",
                  icon: <Brain size={24} />
                }
              ].map((char, i) => (
                <RevealOnScroll key={i} delay={i * 0.2} direction="up">
                  <motion.div 
                    whileHover={{ y: -5 }} 
                    className="dossier-card group h-full"
                  >
                    <div className="flex justify-between items-start mb-6 border-b border-line pb-4">
                      <span className="font-mono text-xs text-accent">{char.id}</span>
                      {char.icon}
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-2 group-hover:text-accent transition-colors">{char.name}</h3>
                    <p className="font-mono text-xs uppercase tracking-wider text-ink-light mb-4">{char.role}</p>
                    <p className="text-sm leading-relaxed text-ink-light">
                      {char.desc}
                    </p>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY PLACEHOLDERS */}
        <section id="gallery" className="section-divide max-w-6xl mx-auto">
             <RevealOnScroll direction="up">
                <h2 className="editorial-title mb-12"><ColorfulTitle>Tư Liệu Hình Ảnh.</ColorfulTitle></h2>
             </RevealOnScroll>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
                <RevealOnScroll delay={0.1} direction="scale" className="md:col-span-2 md:row-span-2 h-full">
                  <div className="h-full w-full bg-gray-100 border border-line flex flex-col items-center justify-center text-ink-light">
                      <ImageIcon size={48} className="mb-2 opacity-20" />
                      <span className="font-mono text-xs">NO SIGNAL</span>
                  </div>
                </RevealOnScroll>
                
                {[
                  "IMG_001.JPG", "IMG_002.JPG", "IMG_003.JPG", "EVIDENCE_A.PNG"
                ].map((name, i) => (
                   <RevealOnScroll key={i} delay={0.2 + (i * 0.1)} direction="scale" className="h-full">
                      <div className="h-full w-full bg-gray-100 border border-line flex flex-col items-center justify-center text-ink-light">
                        <span className="font-mono text-xs">{name}</span>
                      </div>
                   </RevealOnScroll>
                ))}
             </div>
        </section>

        {/* TIMELINE: The Path */}
        <section className="section-divide bg-paper-dark -mx-4 px-4 md:-mx-6 md:px-6 max-w-none">
          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll direction="up">
              <h2 className="editorial-title mb-8"><ColorfulTitle>15 Ngày Định Mệnh.</ColorfulTitle></h2>
              <p className="editorial-text mx-auto mb-16">
                Hành trình từ bóng tối ra ánh sáng (hoặc ngược lại).
              </p>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { 
                  step: "01", 
                  name: "Eikasia", 
                  vi: "Ảo Ảnh",
                  desc: "Kẹt trong 'Cái Hang'. Nhìn đời qua những chiếc bóng và tin đó là sự thật."
                },
                { 
                  step: "02", 
                  name: "Pistis", 
                  vi: "Niềm Tin",
                  desc: "Bắt đầu nhận thức được các sự vật hữu hình, nhưng chưa chạm tới bản chất." 
                },
                { 
                  step: "03", 
                  name: "Dianoia", 
                  vi: "Suy Luận",
                  desc: "Sử dụng logic và toán học để đặt câu hỏi về thực tại giả dối."
                },
                { 
                  step: "04", 
                  name: "Noesis", 
                  vi: "Tri Thức",
                  desc: "Giác ngộ. Thoát khỏi hang động và đối diện với Mặt Trời rực rỡ."
                }
              ].map((item, i) => (
                <RevealOnScroll key={i} delay={i * 0.15} direction="left">
                   <div className="border border-line p-6 hover:border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-300 cursor-default group h-full flex flex-col justify-between bg-white">
                      <div>
                        <span className="font-mono text-sm opacity-50 block mb-2">{item.step}</span>
                        <h3 className="font-serif text-xl font-bold">{item.name}</h3>
                        <p className="text-xs uppercase tracking-widest mt-1 opacity-70 group-hover:text-accent mb-4">{item.vi}</p>
                      </div>
                      <p className="text-sm leading-relaxed opacity-80 border-t border-line/30 pt-4 group-hover:border-black/10">
                        {item.desc}
                      </p>
                    </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-line pt-8 pb-6 mt-12 relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-black/5 rounded-full blur-3xl rounded-bl-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            
            {/* Main Links */}
            <RevealOnScroll direction="up" delay={0.1}>
              <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-ink-light font-medium uppercase tracking-wider">
                 <a href="#dossier" className="hover:text-black transition-colors">Vụ Việc</a>
                 <a href="#characters" className="hover:text-black transition-colors">Nhân Vật</a>
                 <a href="#mystery" className="hover:text-black transition-colors">Bí Ẩn</a>
                 <a href="https://hygef-v4.itch.io/brother-thang-philosophy-club" target="_blank" className="hover:text-black transition-colors">Tải Game</a>
              </div>
            </RevealOnScroll>

            {/* Brand/Signature Area */}
            <RevealOnScroll direction="scale" delay={0.2} duration={0.8}>
              <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 relative opacity-90 transition-transform hover:scale-105 duration-500">
                      <Image src="/images/kumo.png" alt="Kumo Studio" fill className="object-contain" />
                  </div>
                  
                  <div className="space-y-1">
                     <h3 className="font-serif font-bold text-base">CLB Triết Học</h3>
                     <p className="text-xs text-ink-light mx-auto max-w-md leading-relaxed">
                       "Triết học không nuôi sống được ai, nhưng nó giúp bạn hiểu tại sao mình chết đói."
                     </p>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-xs font-mono text-ink-light/60 uppercase">
                      <span>© 2026 Kumo Studio</span>
                      <span>•</span>
                      <span className="cursor-pointer hover:text-black transition-colors">Privacy</span>
                      <span>•</span>
                      <span className="cursor-pointer hover:text-black transition-colors">Terms</span>
                  </div>
              </div>
            </RevealOnScroll>
          </div>
        </footer>
      </main>
    </div>
  );
}
