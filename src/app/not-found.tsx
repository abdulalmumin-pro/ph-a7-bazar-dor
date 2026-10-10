"use client";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Home, 
  ArrowLeft, 
  Search, 
  ShieldAlert, 
  Terminal, 
  RefreshCw, 
  Sparkles 
} from 'lucide-react';
import Link from 'next/link';

export const NotFound: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState<boolean>(false);
  const [diagnosticLogs, setDiagnosticLogs] = useState<string[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background subtle particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedY: Math.random() * 0.4 + 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.y -= p.speedY;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleRunDiagnostics = () => {
    if (isDiagnosticRunning) return;
    setIsDiagnosticRunning(true);
    setDiagnosticLogs(['[INIT] Scanning route buffer...']);

    const steps = [
      '[CHECK] Checking node availability...',
      '[WARN] 404 Route Unreachable - Firewall Active',
      '[RESOLVE] Recommended routing via home dashboard...',
      '[STATUS] Diagnostics complete.'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setDiagnosticLogs(prev => [...prev, step]);
        if (index === steps.length - 1) {
          setIsDiagnosticRunning(false);
        }
      }, (index + 1) * 400);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Handle redirect or search logic here
    window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <div className="relative min-h-screen w-full bg-slate-900 text-slate-100 font-sans flex flex-col justify-between overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* Background Canvas & Soft Green Glows */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-30" />
      <div className="absolute top-[10%] left-[30%] w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Compass className="w-4 h-4 animate-spin-slow" />
          </div>
          <span className="font-bold text-base tracking-wider text-white uppercase">
            Nexus<span className="text-emerald-400">OS</span>
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs text-emerald-400 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Signal Lost</span>
        </div>
      </header>

      {/* Main Content Body (Clean & Spacious Center) */}
      <main className="relative z-10 max-w-xl mx-auto w-full px-6 py-8 flex flex-col items-center text-center my-auto">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono uppercase tracking-wider mb-3 shadow-sm">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
          <span>Error 404 • Page Not Found</span>
        </div>

        {/* 404 Header */}
        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-white drop-shadow-md">
          4<span className="text-emerald-400">0</span>4
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-md font-light leading-relaxed">
          The coordinate you requested does not exist or has been relocated to another sector.
        </p>

        {/* Search Bar Form */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-md mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords or valid sectors..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-800/70 border border-slate-700 rounded-xl text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-inner"
          />
        </form>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs sm:text-sm hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-medium text-xs sm:text-sm hover:bg-slate-700 hover:border-emerald-500/40 transition-all active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <button
            onClick={handleRunDiagnostics}
            disabled={isDiagnosticRunning}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 font-medium text-xs sm:text-sm hover:bg-slate-700 transition-all disabled:opacity-50 active:scale-95"
          >
            <Terminal className={`w-4 h-4 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
            <span>{isDiagnosticRunning ? 'Scanning...' : 'Diagnostics'}</span>
          </button>
        </div>

        {/* Diagnostic Terminal Log Window */}
        {diagnosticLogs.length > 0 && (
          <div className="w-full max-w-md mt-6 text-left bg-black/75 border border-emerald-500/30 rounded-xl p-3 font-mono text-xs text-emerald-400 space-y-1.5 shadow-xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 mb-1.5">
              <span className="uppercase text-[10px] text-emerald-500 tracking-wider">Terminal Buffer</span>
              <RefreshCw className={`w-3 h-3 ${isDiagnosticRunning ? 'animate-spin' : ''}`} />
            </div>
            {diagnosticLogs.map((log, idx) => (
              <div key={idx} className="opacity-90">{log}</div>
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 py-3 px-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Nexus UI System</span>
        </div>
        <div>
          <span>Error Code: 404_ROUTE_NOT_FOUND</span>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;