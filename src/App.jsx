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
    <div dir="rtl" className="relative min-h-screen px-4 py-6 md:p-8 z-10 select-none">
      
      {/* Background Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map(p => (
          <div 
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: '-5vh',
              animationDelay: p.delay,
              animationDuration: p.duration,
              width: p.size,
              height: p.size
            }}
          />
        ))}
      </div>

      {/* Glassmorphic Navbar Container */}
      <nav className="glass-card max-w-7xl mx-auto rounded-2xl px-6 py-4 mb-10 flex items-center justify-between relative z-10">
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-black bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">
            منصة حلبسة
          </span>
          <span className="text-[10px] text-sky-400 font-semibold opacity-80 mt-0.5">بوابتك لمنصات الثانوية العامة</span>
        </div>

        {/* Global Control Tools */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-black/20 rounded-xl px-3 py-1.5 border border-white/5">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text"
              placeholder="ابحث عن اسم المدرس..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-white placeholder-gray-500 w-44"
            />
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center"
          >
            {darkMode ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>
        </div>
      </nav>

      {/* Header Info Section */}
      <header className="text-center max-w-2xl mx-auto mb-10 relative z-10">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
          مدرسي <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">الثانوية العامة</span> في مكان واحد
        </h1>
        <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
          اختر المادة، تصفح المدرسين، واضغط على كارت المدرس للانتقال لمنصته التعليمية الرسمية مباشرة.
        </p>
      </header>

      {/* Responsive Filter Badge Bar */}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-2 mb-10 relative z-10">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveSubject(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all duration-300 transform active:scale-95 ${
              activeSubject === cat.id
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/20 scale-105'
                : 'glass-card text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Search input field */}
      <div className="sm:hidden flex items-center gap-2 bg-black/20 rounded-xl px-4 py-2.5 mb-8 border border-white/5 max-w-md mx-auto relative z-10">
        <Search size={16} className="text-gray-400" />
        <input 
          type="text"
          placeholder="ابحث عن اسم المدرس..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-xs text-white placeholder-gray-500 w-full"
        />
      </div>

      {/* Teachers Rendering Grid Layout */}
      <main className="max-w-7xl mx-auto relative z-10">
        {filteredTeachers.length === 0 ? (
          <div className="glass-card text-center py-16 rounded-2xl max-w-md mx-auto">
            <p className="text-gray-400 text-sm">لم نجد أي مدرس يطابق بحثك حالياً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTeachers.map((teacher) => (
              <a
                key={teacher.id}
                href={teacher.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-4 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:border-sky-500/40 fade-in-up decoration-none text-current"
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl bg-black/10 aspect-square mb-4">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-2 right-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-white border border-white/5">
                      {teacher.badge}
                    </span>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className="text-base font-bold mb-1 group-hover:text-sky-400 transition-colors">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-gray-400">مدرس {teacher.subject}</p>
                  </div>
                </div>

                <div className="w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/10 group-hover:shadow-sky-500/20">
                  <span>زيارة المنصة الرسمية</span>
                  <ExternalLink size={12} />
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer Branding Design Component */}
      <footer className="max-w-7xl mx-auto text-center mt-16 pt-6 border-t border-white/5 relative z-10">
        <p className="text-xs text-gray-500 font-semibold">
          منصة حلبسة لمدرسين الثانوية العامة • جميع الحقوق محفوظة © 2026
        </p>
      </footer>

    </div>
  );
}

export default App;
