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

  // أنيميشن الدخول الاحترافي باستخدام GSAP
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
      {/* الدوائر المضيئة المتفاعلة في الخلفية (Neon Glow) */}
      <div className="bg-glow blob-1"></div>
      <div className="bg-glow blob-2"></div>

      {/* الـ Navbar الزجاجي المطور */}
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

      {/* البطل (Hero Section) للـ Landing Page */}
      <header className="hero-section">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="badge-top"
        >
          <Sparkles size={14} /> <span>المستقبل يبدأ من هنا</span>
        </motion.div>
        <h2 ref={titleRef} className="main-title">
          مدرسي <span className="neon-text">الثانوية العامة</span> في شاشة واحدة
        </h2>
        <p ref={subtitleRef} className="main-subtitle">
          تصفح أرشيف المنصات التعليمية الرسمية لأكبر نخبة من معلمي مصر، واختصر طريقك نحو التفوق بضغطة زر.
        </p>
      </header>

      {/* أزرار الفلترة بأنيميشن الماوس */}
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

      {/* شبكة الكروت المتفاعلة بأنيميشن فريمير موشن */}
      <main>
        <motion.div layout className="teachers-grid">
          <AnimatePresence mode="popLayout">
            {filteredTeachers.map((teacher) => (
              <motion.a
                layout
                initial={{ opacity: 0, transform: 'perspective(1000px) rotateX(10deg) translateY(30px)' }}
                animate={{ opacity: 1, transform: 'perspective(1000px) rotateX(0deg) translateY(0px)' }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(56, 189, 248, 0.15)' }}
                key={teacher.id} 
                href={teacher.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="premium-card"
              >
                <div className="card-top">
                  <div className="card-img-container">
                    <img src={teacher.image} alt={teacher.name} loading="lazy" />
                    <div className="card-overlay"></div>
                    <span className="premium-badge">{teacher.badge}</span>
                  </div>
                  <div className="card-info">
                    <h3>{teacher.name}</h3>
                    <p>كبير مستشاري مادة {teacher.subject}</p>
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="no-results"
          >
            نأسف، لم نجد أي مدرس يطابق هذا البحث حالياً.
          </motion.div>
        )}
      </main>

      <footer className="premium-footer">
        <p>منصة حلبسة الذكية لمدرسي الثانوية العامة • تم التطوير بكل شغف © 2026</p>
      </footer>
    </div>
  );
}

export default App;
