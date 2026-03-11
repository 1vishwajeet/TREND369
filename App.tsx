
import React, { useState, useEffect, useRef } from 'react';
import { Flame, TrendingUp, Briefcase, Trophy, Smile, Monitor, Play, Image as ImageIcon, Download, Settings, X, Plus, Type, Layout, ImagePlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
type Genre = 'ALL' | 'FINANCE' | 'BUSINESS' | 'SPORTS' | 'FUNNY' | 'TECH';
type MediaType = 'photo' | 'video';

interface Trend {
  id: string;
  title: string;
  genre: Genre;
  hotness: number;
}

interface Template {
  id: string;
  type: MediaType;
  genre: Genre;
  url: string;
  bgGradient: string;
}

// --- DUMMY DATA (Fallback) ---
const INITIAL_TRENDS: Trend[] = [
  { id: '1', title: 'Market Crash: Nifty falls 1000 points', genre: 'FINANCE', hotness: 98 },
  { id: '2', title: 'Startup gets $10M funding at 0 revenue', genre: 'BUSINESS', hotness: 85 },
  { id: '3', title: 'Last over drama! 6 needed off 1 ball', genre: 'SPORTS', hotness: 95 },
  { id: '4', title: 'AI takes over coding jobs', genre: 'TECH', hotness: 88 },
  { id: '5', title: 'Me pretending to work on Friday', genre: 'FUNNY', hotness: 92 },
];

const INITIAL_TEMPLATES: Template[] = [
  { id: 't1', type: 'photo', genre: 'FINANCE', url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', bgGradient: 'from-red-900 to-black' },
  { id: 't2', type: 'photo', genre: 'BUSINESS', url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80', bgGradient: 'from-gray-900 to-black' },
  { id: 't3', type: 'photo', genre: 'SPORTS', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80', bgGradient: 'from-blue-900 to-black' },
];

const GENRES: { id: Genre; label: string; icon: React.ReactNode }[] = [
  { id: 'ALL', label: 'ALL', icon: <Flame className="w-4 h-4" /> },
  { id: 'FINANCE', label: 'FINANCE', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'BUSINESS', label: 'BUSINESS', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'SPORTS', label: 'SPORTS', icon: <Trophy className="w-4 h-4" /> },
  { id: 'FUNNY', label: 'FUNNY', icon: <Smile className="w-4 h-4" /> },
  { id: 'TECH', label: 'TECH', icon: <Monitor className="w-4 h-4" /> },
];

export default function App() {
  const [activeGenre, setActiveGenre] = useState<Genre>('ALL');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  // Studio States
  const [memeText, setMemeText] = useState('ENTER YOUR TEXT HERE');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '1:1' | '16:9'>('1:1');
  const [showWatermark, setShowWatermark] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  // Data States
  const [trends, setTrends] = useState<Trend[]>(INITIAL_TRENDS);
  const [templates, setTemplates] = useState<Template[]>(INITIAL_TEMPLATES);

  // Load from LocalStorage
  useEffect(() => {
    const savedTrends = localStorage.getItem('trendlab_trends');
    const savedTemplates = localStorage.getItem('trendlab_templates');
    if (savedTrends) setTrends(JSON.parse(savedTrends));
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
  }, []);

  const filteredTrends = activeGenre === 'ALL' ? trends : trends.filter(t => t.genre === activeGenre);
  const filteredTemplates = activeGenre === 'ALL' ? templates : templates.filter(t => t.genre === activeGenre);

  const handleDownload = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Meme Downloaded! (Simulated)');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-500/30">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black" />
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-red-900/30 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-red-500 animate-pulse" />
            <span className="text-xl font-bold tracking-wider">THE TREND LAB</span>
          </div>
          <button 
            onClick={() => setIsAdminOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-950/30 hover:bg-red-900/50 border border-red-900/50 rounded-md transition-all text-sm font-medium"
          >
            <Settings className="w-4 h-4" />
            ADMIN
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-20">
        
        {/* HERO SECTION */}
        <section className="text-center py-20 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            STOP ADVERTISING.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 animate-pulse">
              START TRENDING.
            </span>
          </motion.h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We track the internet's pulse. You take the credit. Select a trend, pick a template, and deploy viral content in 60 seconds.
          </p>
        </section>

        {/* RADAR (GENRES) */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h2 className="text-2xl font-bold tracking-wide">THE RADAR</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {GENRES.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGenre(g.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all ${
                  activeGenre === g.id 
                  ? 'border-red-500 bg-red-500/10 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                  : 'border-white/10 text-gray-400 hover:border-white/30'
                }`}
              >
                {g.icon}
                <span className="text-sm font-bold tracking-wider">{g.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* TRENDING CARDS (BENTO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrends.map((trend) => (
            <motion.div 
              key={trend.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-red-500/50 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-red-500 tracking-wider bg-red-500/10 px-2 py-1 rounded">
                  {trend.genre}
                </span>
                <div className="flex items-center gap-1 text-xs text-orange-400">
                  <Flame className="w-3 h-3" />
                  {trend.hotness}% HOT
                </div>
              </div>
              <h3 className="text-xl font-bold mb-6 group-hover:text-red-400 transition-colors">
                {trend.title}
              </h3>
              <button className="w-full py-3 bg-white/10 hover:bg-red-600 transition-colors rounded-md font-bold text-sm tracking-widest">
                MEME-IFY THIS
              </button>
            </motion.div>
          ))}
          {filteredTrends.length === 0 && (
            <div className="col-span-full py-10 text-center text-gray-500 border border-dashed border-white/10 rounded-xl">
              No trends found for this category.
            </div>
          )}
        </div>

        {/* TEMPLATE GALLERY */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold tracking-wide flex items-center gap-3">
            <ImageIcon className="text-red-500" />
            THE ARMORY (TEMPLATES)
          </h2>
          <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`flex-none w-64 md:w-80 group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                  selectedTemplate?.id === template.id ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-white/10'
                }`}
              >
                <div className="relative aspect-video bg-gray-900">
                  <img src={template.url} alt="template" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    {template.type === 'video' ? <Play className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    {template.type.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MINI STUDIO (EDITOR) */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.section 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="border border-red-500/30 rounded-2xl bg-black/80 p-6 md:p-10 shadow-[0_0_50px_rgba(239,68,68,0.1)]"
            >
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Layout className="text-red-500" />
                  THE STUDIO
                </h2>
                <button onClick={() => setSelectedTemplate(null)} className="text-gray-400 hover:text-white">
                  <X />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Canvas Preview */}
                <div className="bg-gray-900 rounded-xl flex items-center justify-center p-8 border border-white/5">
                  <div 
                    className={`relative overflow-hidden bg-gradient-to-br ${selectedTemplate.bgGradient} transition-all duration-300`}
                    style={{
                      width: aspectRatio === '1:1' ? '100%' : aspectRatio === '9:16' ? '60%' : '100%',
                      aspectRatio: aspectRatio === '1:1' ? '1/1' : aspectRatio === '9:16' ? '9/16' : '16/9'
                    }}
                  >
                    <img src={selectedTemplate.url} alt="bg" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                      <h3 className="text-3xl md:text-5xl font-black text-white uppercase drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] leading-tight">
                        {memeText}
                      </h3>
                    </div>
                    {showWatermark && (
                      <div className="absolute bottom-4 right-4 text-[10px] font-bold tracking-widest text-white/50">
                        @THETRENDLAB
                      </div>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold tracking-wider text-gray-400 flex items-center gap-2">
                      <Type className="w-4 h-4" /> IMPACT TEXT
                    </label>
                    <textarea 
                      value={memeText}
                      onChange={(e) => setMemeText(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded-lg p-4 text-xl font-bold focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 transition-all resize-none h-32 uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <label className="text-xs font-bold tracking-wider text-gray-400">FORMAT</label>
                      <select 
                        value={aspectRatio}
                        onChange={(e) => setAspectRatio(e.target.value as any)}
                        className="w-full bg-black border border-white/20 rounded-lg p-3 focus:border-red-500 focus:outline-none text-sm"
                      >
                        <option value="1:1">Instagram Post (1:1)</option>
                        <option value="9:16">Reels / Shorts (9:16)</option>
                        <option value="16:9">YouTube / Twitter (16:9)</option>
                      </select>
                    </div>
                    <div className="space-y-3 flex flex-col justify-end">
                      <button 
                        onClick={() => setShowWatermark(!showWatermark)}
                        className={`p-3 rounded-lg border text-sm font-bold transition-all ${
                          showWatermark ? 'border-red-500 text-red-400 bg-red-500/10' : 'border-white/20 text-gray-400'
                        }`}
                      >
                        {showWatermark ? 'WATERMARK ON' : 'WATERMARK OFF'}
                      </button>
                    </div>
                  </div>

                  <button 
                    onClick={handleDownload}
                    disabled={isGenerating}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black tracking-widest text-lg rounded-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <span className="animate-pulse">RENDERING...</span>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        GENERATE & STRIKE
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

      </main>

      {/* ADMIN MODAL (LOCALSTORAGE) */}
      <AnimatePresence>
        {isAdminOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-950 border border-white/10 rounded-2xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Settings className="text-red-500" /> ADMIN TERMINAL
                </h2>
                <button onClick={() => setIsAdminOpen(false)} className="text-gray-400 hover:text-white">
                  <X />
                </button>
              </div>

              <div className="space-y-8 text-sm">
                <p className="text-yellow-500 bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                  Data is saved in your browser (LocalStorage). Safe for Vercel deployment!
                </p>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-red-400 border-l-4 border-red-500 pl-3">Add New Trend</h3>
                  <div className="flex gap-2">
                    <input id="trendTitle" placeholder="Trend Headline..." className="flex-1 bg-black border border-white/20 rounded p-3 text-white" />
                    <select id="trendGenre" className="bg-black border border-white/20 rounded p-3 text-white">
                      {GENRES.filter(g => g.id !== 'ALL').map(g => (
                        <option key={g.id} value={g.id}>{g.label}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => {
                        const title = (document.getElementById('trendTitle') as HTMLInputElement).value;
                        const genre = (document.getElementById('trendGenre') as HTMLSelectElement).value as Genre;
                        if(title) {
                          const newTrend: Trend = { id: Date.now().toString(), title, genre, hotness: Math.floor(Math.random() * 20 + 80) };
                          const updated = [newTrend, ...trends];
                          setTrends(updated);
                          localStorage.setItem('trendlab_trends', JSON.stringify(updated));
                          (document.getElementById('trendTitle') as HTMLInputElement).value = '';
                          alert('Trend Added!');
                        }
                      }}
                      className="bg-white text-black font-bold px-4 py-2 rounded"
                    >
                      ADD
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-red-400 border-l-4 border-red-500 pl-3">Add Template Image URL</h3>
                  <div className="flex gap-2 flex-wrap">
                    <input id="tempUrl" placeholder="Image URL (Unsplash/Imgur)..." className="flex-1 bg-black border border-white/20 rounded p-3 text-white min-w-[200px]" />
                    <select id="tempGenre" className="bg-black border border-white/20 rounded p-3 text-white">
                      {GENRES.filter(g => g.id !== 'ALL').map(g => (
                        <option key={g.id} value={g.id}>{g.label}</option>
                      ))}
                    </select>
                    <button 
                      onClick={() => {
                        const url = (document.getElementById('tempUrl') as HTMLInputElement).value;
                        const genre = (document.getElementById('tempGenre') as HTMLSelectElement).value as Genre;
                        if(url) {
                          const newTemp: Template = { id: Date.now().toString(), type: 'photo', genre, url, bgGradient: 'from-gray-900 to-black' };
                          const updated = [newTemp, ...templates];
                          setTemplates(updated);
                          localStorage.setItem('trendlab_templates', JSON.stringify(updated));
                          (document.getElementById('tempUrl') as HTMLInputElement).value = '';
                          alert('Template Added!');
                        }
                      }}
                      className="bg-white text-black font-bold px-4 py-2 rounded"
                    >
                      ADD
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
