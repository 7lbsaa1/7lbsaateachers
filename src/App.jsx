import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import teachersData from './teachers.json';
import { Sun, Moon, Search, ExternalLink, Sparkles, GraduationCap } from 'lucide-react';

function App() {
  const [teachers] = useState(teachersData);
  const [filteredTeachers, setFilteredTeachers] = useState(teachersData);
  const [activeSubject, setActiveSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const filterRef = useRef(null);

  // أنيميشن GSAP لدخول عناصر الـ Landing Page بنعومة
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .fromTo(titleRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
      .fromTo(subtitleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.2')
      .fromTo(filterRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1');
  }, []);

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    let result = teachers;
    if (activeSubject !== 'all') {
      result = result.filter(t => t.subject === activeSubject);
    }
    if (searchQuery.trim() !== '') {
      result = result.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredTeachers(result);
  }, [activeSubject, searchQuery, teachers]);

  // دالة سحرية لحساب حركة الماوس وعمل تأثير الـ 3D Tilt والـ Spotlight الإضاءة المتحركة
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 

    // تحديث مكان الإضاءة النيون جوة الكارت
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // حساب زوايا الميل الـ 3D
    const rotateX = ((y - rect.height / 2) / rect.height) * -15; // زاوية الميل الرأسي
    const rotateY = ((x - rect.width / 2) / rect.width) * 15;   // زاوية الميل الأفقي

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // إرجاع الكارت لوضعه الطبيعي عند خروج الماوس
  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const filterCategories = [
    { id: 'all', label: 'الكل' },
    { id: 'كيمياء', label: 'كيمياء' },
    { id: 'أحياء', label: 'أحياء' },
    { id: 'فيزياء', label: 'فيزياء' },
    { id: 'عربي', label: 'عربي' },
    { id: 'إنجليزي', label: 'إنجليزي' },
    { id: 'رياضيات', label: 'رياضيات' },
    { id: 'جغرافيا', label: 'جغرافيا' },
    { id: 'تاريخ', label: 'تاريخ' },
    { id: 'فلسفة', label: 'فلسفة' }
  ];

  return (
    <div dir="rtl" className="container-app">
      <div className="bg-glow blob-1"></div>
      <div className="bg-glow blob-2"></div>

      {/* الـ Navbar */}
      <nav ref={headerRef} className="glass-nav">
        <div className="nav-brand">
          <div className="logo-wrapper">
            <GraduationCap className="logo-icon" size={24} />
            <h1>منصة حلبسة</h1>
          </div>
          <span className="sub-brand">بوابتك الذكية لمنصات الثانوية العامة</span>
        </div>

        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input 
            type="text"
            placeholder="ابحث عن أستاذك المفضل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={20} className="sun" /> : <Moon size={20} className="moon" />}
        </button>
      </nav>

      {/* الـ Hero Section */}
      <header className="hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="badge-top"
        >
          <Sparkles size={14} /> <span>تأثيرات بصرية متفاعلة 3D</span>
        </motion.div>
        <h2 ref={titleRef} className="main-title">
          مدرسي <span className="neon-text">الثانوية العامة</span> في شاشة واحدة
        </h2>
        <p ref={subtitleRef} className="main-subtitle">
          تصفح أرشيف المنصات التعليمية الرسمية لأكبر نخبة من معلمي مصر، واختصر طريقك نحو التفوق بضغطة زر.
        </p>
      </header>

      {/* الفلاتر */}
      <div ref={filterRef} className="filters-wrapper">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveSubject(cat.id)}
            className={`premium-filter-btn ${activeSubject === cat.id ? 'active' : ''}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* شبكة الكروت المتفاعلة بالـ 3D Effect مثل الفيديو */}
      <main>
        <motion.div layout className="teachers-grid">
          <AnimatePresence mode="popLayout">
            {filteredTeachers.map((teacher, index) => (
              <motion.a
                layout
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.03, ease: [0.23, 1, 0.32, 1] }}
                key={teacher.id} 
                href={teacher.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="premium-card dynamic-glow-card"
                onMouseMove={(e) => handleMouseMove(e, teacher.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* طبقة الإضاءة النيون الخلفية المتفاعلة مع الماوس */}
                <div className="spotlight-glow"></div>

                <div className="card-top">
                  <div className="card-img-container">
                    <img src={teacher.image} alt={teacher.name} loading="lazy" />
                    <div className="card-overlay"></div>
                    <span className="premium-badge">{teacher.badge}</span>
                  </div>
                  <div className="card-info">
                    <h3>{teacher.name}</h3>
                    <p>مدرس أول مادة {teacher.subject}</p>
                  </div>
                </div>
                <div className="card-action-btn">
                  <span>دخول المنصة الرسمية</span>
                  <ExternalLink size={14} />
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTeachers.length === 0 && (
          <div className="no-results">نأسف، لم نجد أي مدرس يطابق هذا البحث حالياً.</div>
        )}
      </main>

      <footer className="premium-footer">
        <p>منصة حلبسة الذكية لمدرسي الثانوية العامة • تم التطوير بكل شغف © 2026</p>
      </footer>
    </div>
  );
}

export default App;
