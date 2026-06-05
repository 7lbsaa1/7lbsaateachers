import React, { useState, useEffect } from 'react';
import teachersData from './teachers.json';
import { Sun, Moon, Search, Layers, ExternalLink } from 'lucide-react';

function App() {
  // States
  const [teachers] = useState(teachersData);
  const [filteredTeachers, setFilteredTeachers] = useState(teachersData);
  const [activeSubject, setActiveSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [particles, setParticles] = useState([]);

  // Dark/Light Mode Switcher
  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.remove('light-mode');
    } else {
      body.classList.add('light-mode');
    }
  }, [darkMode]);

  // Generate background particles dynamically on mount
  useEffect(() => {
    const pArray = [];
    for (let i = 0; i < 50; i++) {
      pArray.push({
        id: i,
        left: Math.random() * 100 + '%',
        delay: Math.random() * 8 + 's',
        duration: Math.random() * 10 + 10 + 's',
        size: Math.random() * 3 + 2 + 'px'
      });
    }
    setParticles(pArray);
  }, []);

  // Filter & Search Engine Logic
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
    { id: 'all', label: 'الكل', icon: <Layers size={14} /> },
    { id: 'كيمياء', label: 'كيمياء', icon: '🧪' },
    { id: 'أحياء', label: 'أحياء', icon: '🧬' },
    { id: 'فيزياء', label: 'فيزياء', icon: '⚡' },
    { id: 'عربي', label: 'عربي', icon: '📚' },
    { id: 'إنجليزي', label: 'إنجليزي', icon: '🌍' },
    { id: 'رياضيات', label: 'رياضيات', icon: '🔢' },
    { id: 'جغرافيا', label: 'جغرافيا', icon: '🌏' },
    { id: 'تاريخ', label: 'تاريخ', icon: '📜' },
    { id: 'فلسفة', label: 'فلسفة', icon: '🧠' }
  ];

return (
  <div dir="rtl" className="container-app">
    
    {/* الهيدر أو الناف بار */}
    <nav>
      <div className="nav-brand">
        <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-color)' }}>منصة حلبسة</span>
        <span style={{ fontSize: '10px', opacity: 0.7 }}>بوابتك لمنصات الثانوية العامة</span>
      </div>

      <div className="search-box">
        <Search size={16} style={{ color: '#94a3b8' }} />
        <input 
          type="text"
          placeholder="ابحث عن اسم المدرس..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button onClick={() => setDarkMode(!darkMode)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        {darkMode ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: '#334155' }} />}
      </button>
    </nav>

    {/* عنوان الصفحة */}
    <header>
      <h1>مدرسي <span style={{ color: 'var(--accent-color)' }}>الثانوية العامة</span> في مكان واحد</h1>
      <p>اختر المادة، تصفح المدرسين، واضغط على كارت المدرس للانتقال لمنصته الرسمية مباشرة.</p>
    </header>

    {/* أزرار المواد */}
    <div className="filters-container">
      {filterCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveSubject(cat.id)}
          className={`filter-btn ${activeSubject === cat.id ? 'active' : ''}`}
        >
          {cat.label}
        </button>
      ))}
    </div>

    {/* شبكة المدرسين */}
    <main>
      {filteredTeachers.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>لم نجد أي مدرس يطابق بحثك حالياً.</div>
      ) : (
        <div className="teachers-grid">
          {filteredTeachers.map((teacher) => (
            <a key={teacher.id} href={teacher.url} target="_blank" rel="noopener noreferrer" className="glass-card">
              <div>
                <div className="image-container">
                  <img src={teacher.image} alt={teacher.name} loading="lazy" />
                  <span className="subject-badge">{teacher.badge}</span>
                </div>
                <div className="teacher-info">
                  <h3>{teacher.name}</h3>
                  <p>مدرس {teacher.subject}</p>
                </div>
              </div>
              <div className="visit-btn">
                <span>زيارة المنصة الرسمية</span>
                <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      )}
    </main>

    <footer style={{ textAlignment: 'center', marginTop: '60px', padding: '20px', borderTop: '1px solid var(--card-border)', fontSize: '12px', color: '#64748b', textAlign: 'center' }}>
      منصة حلبسة لمدرسين الثانوية العامة • جميع الحقوق محفوظة © 2026
    </footer>

  </div>
);
