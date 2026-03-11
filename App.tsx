import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, Zap, Flame, ChevronRight, Settings, 
  RefreshCw, X, Database, Type, Layers,
  Trash2, ShieldCheck, Globe, Image as ImageIcon 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DUMMY DATA (No Database required) ---
const INITIAL_TRENDS = [
  { id: '1', title: 'AI REPLACES INFLUENCERS', desc: 'Virtual influencers are taking over brand deals globally.', genre: 'tech', hotness: '99%' },
  { id: '2', title: 'FOUNDER MODE ACTIVATED', desc: 'Tech CEOs are debating the new management style.', genre: 'business', hotness: '94%' },
  { id: '3', title: 'MARKET HITS ALL TIME HIGH', desc: 'Retail investors are going crazy in the bull run.', genre: 'finance', hotness: '88%' },
];

const INITIAL_TEMPLATES = [
  { id: 't1', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop', type: 'photo' },
  { id: 't2', url: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop', type: 'photo' },
  { id: 't3', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop', type: 'photo' }
];

const GENRES = [
  { id: 'all', label: 'ALL' },
  { id: 'finance', label: 'FINANCE' },
  { id: 'business', label: 'BUSINESS' },
  { id: 'tech', label: 'TECH' },
  { id: 'funny', label: 'FUNNY' },
];

const GrainOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat"></div>
);

// --- ADMIN PANEL ---
const AdminPanel = ({ trends, setTrends, templates, setTemplates, setView }) => {
  const [activeMode, setActiveMode] = useState('add');
  const [activeTab, setActiveTab] = useState('trend');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ title: '', genre: 'funny', desc: '', hotness: '95%', url: '', type: 'photo' });

  const syncReddit = () => {
    setLoading(true);
    setTimeout(() => {
      const newTrend = {
        id: Math.random().toString(),
        title: 'NEW REDDIT VIRAL TOPIC ' + Math.floor(Math.random() * 100),
        desc: 'Scraped successfully from the frontpage of the internet.',
        genre: 'funny',
        hotness: '90%'
      };
      setTrends([newTrend, ...trends]);
      setLoading(false);
    }, 1500);
  };

  const handleAdd = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (activeTab === 'trend') {
        setTrends([{ id: Math.random().toString(), ...formData, title: formData.title.toUpperCase() }, ...trends]);
        setView('radar');
      } else {
        setTemplates([{ id: Math.random().toString(), url: formData.url, type: formData.type }, ...templates]);
      }
      setFormData({ title: '', genre: 'funny', desc: '', hotness: '95%', url: '', type: 'photo' });
      setLoading(false);
    }, 800);
  };

  const handleDelete = (type: string, id: string) => {
    if (type === 'trends') setTrends(trends.filter((t: any) => t.id !== id));
    if (type === 'templates') setTemplates(templates.filter((t: any) => t.id !== id));
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black italic text-red-600 tracking-tighter uppercase flex items-center gap-3">
            <ShieldCheck size={32} /> Lab Controller
          </h2>
          <p className="text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase mt-2">Local Mode (No DB) // UID: ADMIN_001</p>
        </div>
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-2xl border border-zinc-800 shadow-xl">
          <button onClick={() => setActiveMode('add')} className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all ${activeMode === 'add' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'}`}>CREATE</button>
          <button onClick={() => setActiveMode('manage')} className={`px-6 py-3 rounded-xl text-[10px] font-black transition-all ${activeMode === 'manage' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'}`}>MANAGE</button>
          <button onClick={() => setView('radar')} className="p-3 bg-black text-zinc-500 rounded-xl hover:text-white transition-colors"><X size={18} /></button>
        </div>
      </div>

      {activeMode === 'add' ? (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button onClick={syncReddit} disabled={loading} className="p-8 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 hover:border-red-600 transition-all group">
              <Globe className={`w-8 h-8 text-red-600 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'}`} />
              <div className="text-center">
                <span className="block font-black text-xs tracking-widest uppercase">Mock Sync</span>
                <span className="text-[9px] text-zinc-500 uppercase mt-1">Generate Dummy Trend</span>
              </div>
            </button>
            <div className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] flex items-center justify-center gap-4">
               <div className={`p-4 rounded-2xl transition-all cursor-pointer ${activeTab === 'trend' ? 'bg-red-600' : 'bg-black text-zinc-600 hover:text-white'}`} onClick={() => setActiveTab('trend')}><Zap size={24} /></div>
               <div className={`p-4 rounded-2xl transition-all cursor-pointer ${activeTab === 'template' ? 'bg-red-600' : 'bg-black text-zinc-600 hover:text-white'}`} onClick={() => setActiveTab('template')}><ImageIcon size={24} /></div>
            </div>
          </div>

          <form onSubmit={handleAdd} className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[3rem] shadow-2xl space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Headline</label>
              <input required placeholder="ENTER HOOK..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black border border-zinc-800 p-6 rounded-2xl outline-none focus:border-red-600 text-xl font-black uppercase text-white" />
            </div>
            {activeTab === 'trend' ? 
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Context</label>
                <textarea placeholder="Briefly describe..." value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} className="w-full bg-black border border-zinc-800 p-6 rounded-2xl h-32 resize-none outline-none focus:border-red-600 font-medium text-sm text-zinc-400" />
              </div> :
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Media URL</label>
                <input placeholder="Paste Image link..." value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} className="w-full bg-black border border-zinc-800 p-6 rounded-2xl outline-none focus:border-red-600 text-white" />
              </div>
            }
            <button disabled={loading} className="w-full py-8 bg-red-600 text-white font-black text-2xl rounded-3xl hover:bg-red-700 shadow-2xl active:scale-[0.98] transition-all disabled:opacity-50 uppercase tracking-tighter italic">
              {loading ? "Forging..." : `Deploy ${activeTab}`}
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-zinc-600 flex items-center gap-2"><Database size={14} /> Repository (Local)</h3>
              <div className="grid gap-4">
                {trends.map((t: any) => (
                  <div key={t.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex justify-between items-center group hover:border-red-600/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-black rounded-lg text-red-600"><Zap size={16} /></div>
                      <div>
                        <p className="font-black text-sm uppercase tracking-tight text-white">{t.title}</p>
                        <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest mt-1">{t.genre} // {t.hotness}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete('trends', t.id)} className="p-3 text-zinc-600 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

// --- MAIN APP ---
const App = () => {
  const [view, setView] = useState('landing');
  const [trends, setTrends] = useState(INITIAL_TRENDS);
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [activeTrend, setActiveTrend] = useState<any>(null);
  const [activeTemplate, setActiveTemplate] = useState<any>(INITIAL_TEMPLATES[0]);
  const [memeText, setMemeText] = useState('VIRAL HOOK');
  const [aspectRatio, setAspectRatio] = useState('9:16');

  const filteredTrends = useMemo(() => {
    return selectedGenre === 'all' ? trends : trends.filter(t => t.genre === selectedGenre);
  }, [trends, selectedGenre]);

  return (
    <div className="bg-black text-white min-h-screen selection:bg-red-600 font-sans tracking-tight overflow-x-hidden">
      <GrainOverlay />
      
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-2xl px-8 py-5 flex justify-between items-center shadow-2xl">
        <div onClick={() => setView('landing')} className="flex items-center space-x-3 cursor-pointer group">
          <div className="p-2 bg-red-600 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-red-900/20"><TrendingUp className="text-white w-5 h-5" /></div>
          <span className="font-black text-2xl tracking-tighter italic">THE TREND LAB</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end opacity-40">
             <span className="text-[8px] font-black uppercase tracking-tighter">NODE: OFFLINE UI</span>
          </div>
          <button onClick={() => setView('admin')} className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:text-red-600 transition-all active:scale-90 shadow-xl shadow-black/50 hover:bg-zinc-800"><Settings className="w-5 h-5" /></button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 blur-[160px] rounded-full animate-pulse"></div>
            <div className="relative z-10">
              <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-7xl md:text-[11rem] font-black mb-12 tracking-tighter leading-[0.75] uppercase italic">
                Mining<br/><span className="text-red-600 not-italic">Attention.</span>
              </motion.h1>
              <p className="text-zinc-600 font-bold mb-16 tracking-[0.4em] text-[10px] uppercase max-w-lg mx-auto">Extract viral patterns. Build content weapons. Dominate the feed.</p>
              <button onClick={() => setView('radar')} className="group relative px-20 py-8 bg-red-600 text-white font-black text-2xl rounded-2xl shadow-[0_30px_60px_-15px_rgba(220,38,38,0.3)] active:scale-95 transition-all overflow-hidden">
                <span className="relative z-10">INITIATE RADAR</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 italic"></div>
              </button>
            </div>
          </motion.div>
        )}

        {view === 'radar' && (
          <motion.div key="r" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-20 px-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="space-y-4">
                <h2 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">RADAR FEED</h2>
                <div className="flex items-center text-red-600 gap-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live UI Demo</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800 backdrop-blur-xl">
                {GENRES.map(g => (
                  <button key={g.id} onClick={() => setSelectedGenre(g.id)} className={`px-6 py-3 text-[10px] font-black rounded-xl transition-all ${selectedGenre === g.id ? 'bg-red-600 text-white shadow-xl' : 'text-zinc-500 hover:text-white hover:bg-zinc-800'}`}>{g.label}</button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrends.map((t: any) => (
                <div key={t.id} onClick={() => {setActiveTrend(t); setMemeText(t.title); setView('editor')}} className="bg-zinc-900/30 border border-zinc-800/50 p-10 rounded-[3rem] cursor-pointer hover:border-red-600/50 hover:bg-zinc-900/60 transition-all group relative overflow-hidden flex flex-col justify-between min-h-[340px] shadow-xl">
                  <div className="flex justify-between items-start mb-10">
                    <span className="text-[9px] font-black uppercase text-zinc-500 bg-black px-4 py-2 rounded-full border border-zinc-800 tracking-widest">{t.genre}</span>
                    <div className="flex items-center text-red-600 gap-1 font-black text-xs"><Flame size={14} className="animate-pulse" /> {t.hotness}</div>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black mb-4 group-hover:text-red-500 transition-colors uppercase italic leading-[0.9] tracking-tighter">{t.title}</h3>
                    <p className="text-zinc-500 text-sm line-clamp-3 font-medium leading-relaxed mb-8">{t.desc}</p>
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center group-hover:text-red-500 transition-colors pt-6 border-t border-zinc-800/50">
                    Capture Node <ChevronRight className="ml-auto w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'editor' && (
          <motion.div key="e" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="pt-24 px-8 max-w-[1700px] mx-auto flex flex-col xl:flex-row gap-16 pb-20">
            <button onClick={() => setView('radar')} className="fixed top-24 left-10 text-zinc-500 hover:text-white flex items-center z-50 group font-black text-[10px] tracking-[0.2em] bg-zinc-900/80 backdrop-blur-xl px-6 py-3 rounded-2xl border border-zinc-800 shadow-xl transition-all"><X className="mr-3 w-4 h-4 group-hover:rotate-90 transition-transform" /> CANCEL OPERATION</button>
            
            <div className="w-full xl:w-[450px] flex flex-col">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-red-600 rounded-xl shadow-lg shadow-red-900/20"><Layers size={20} /></div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none text-white">Asset Pool</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 overflow-y-auto pr-4 custom-scrollbar max-h-[700px]">
                {templates.map((t: any) => (
                  <div key={t.id} onClick={() => setActiveTemplate(t)} className={`aspect-[3/4] rounded-[2rem] overflow-hidden border-4 cursor-pointer relative group transition-all duration-500 ${activeTemplate?.id === t.id ? 'border-red-600 scale-[0.98] shadow-2xl shadow-red-900/20' : 'border-zinc-900 hover:border-zinc-800'}`}>
                    <img src={t.url} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-125" alt="Node Asset" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 border border-zinc-900 rounded-[4rem] min-h-[700px] relative shadow-inner p-12 overflow-hidden">
              <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4 bg-black/60 p-1.5 rounded-2xl border border-zinc-800 z-20 backdrop-blur-md">
                <button onClick={() => setAspectRatio('9:16')} className={`px-6 py-2.5 text-[9px] font-black rounded-xl transition-all ${aspectRatio === '9:16' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>9:16 VERTICAL</button>
                <button onClick={() => setAspectRatio('1:1')} className={`px-6 py-2.5 text-[9px] font-black rounded-xl transition-all ${aspectRatio === '1:1' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>1:1 SQUARE</button>
              </div>

              <motion.div layout className={`relative bg-zinc-900 border-[14px] border-white shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] overflow-hidden transition-all duration-700 mx-auto rounded-[2.5rem] ${aspectRatio === '9:16' ? 'w-[360px] h-[640px]' : 'w-[540px] h-[540px]'}`}>
                {activeTemplate && <img src={activeTemplate.url} className="absolute inset-0 w-full h-full object-cover brightness-[0.4] contrast-[1.1] saturate-[1.2]" alt="Active Canvas" />}
                <div className="absolute inset-0 p-14 flex flex-col justify-between z-10 text-white font-black uppercase italic">
                  <div className="flex justify-between items-start text-[10px] tracking-[0.3em] opacity-40">
                    <span>NODE_{activeTrend?.genre || 'X'}</span><Zap className="w-5 h-5 text-red-600 fill-red-600" />
                  </div>
                  <p className="text-[3.2rem] leading-[0.8] tracking-tighter drop-shadow-[0_20px_20px_rgba(0,0,0,1)] uppercase break-words">{memeText}</p>
                </div>
              </motion.div>
            </div>

            <div className="w-full xl:w-[420px] flex flex-col space-y-10 pt-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center"><Type className="w-4 h-4 mr-3 text-red-600" /> Edit Mutation</label>
                <textarea 
                  value={memeText} 
                  onChange={(e) => setMemeText(e.target.value.toUpperCase())} 
                  className="w-full bg-zinc-900/50 border border-zinc-800 p-10 text-white font-black text-4xl h-72 rounded-[3.5rem] outline-none focus:border-red-600 resize-none shadow-2xl transition-all tracking-tighter leading-none shadow-black" 
                />
              </div>
              <div className="space-y-4">
                 <button className="w-full py-10 bg-red-600 text-white font-black text-2xl rounded-[3.5rem] shadow-[0_30px_70px_-15px_rgba(220,38,38,0.3)] active:scale-95 transition-all hover:bg-red-700 flex items-center justify-center gap-4 group">
                    FORGE ASSET <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                 </button>
                 <p className="text-center text-[9px] font-bold text-zinc-600 uppercase tracking-widest italic">Mock Deployment Mode</p>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'admin' && <AdminPanel trends={trends} setTrends={setTrends} templates={templates} setTemplates={setTemplates} setView={setView} />}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #18181b; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ef4444; }
        body { background-color: black; cursor: crosshair; overflow-y: auto; }
      `}</style>
    </div>
  );
};

export default App;
