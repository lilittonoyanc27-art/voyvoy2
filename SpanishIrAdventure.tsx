import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map, 
  Sun, 
  Cloud, 
  Navigation, 
  Compass, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Sparkles,
  User,
  Plane
} from 'lucide-react';

// --- Types ---
interface IrTask {
  pronoun: string;
  options: string[];
  correct: string;
  translation: string;
  context: string;
  destination: string;
}

// --- Data ---
const TASKS: IrTask[] = [
  {
    pronoun: "Yo",
    options: ["voy", "vas", "va"],
    correct: "voy",
    translation: "Ես գնում եմ լողափ:",
    context: "____ a la playa.",
    destination: "Playa"
  },
  {
    pronoun: "Tú",
    options: ["voy", "vas", "va"],
    correct: "vas",
    translation: "Դու գնում ես դպրոց:",
    context: "____ a la escuela.",
    destination: "Escuela"
  },
  {
    pronoun: "Él",
    options: ["va", "vamos", "van"],
    correct: "va",
    translation: "Նա գնում է խանութ:",
    context: "____ a la tienda.",
    destination: "Tienda"
  },
  {
    pronoun: "Nosotros",
    options: ["vamos", "vais", "van"],
    correct: "vamos",
    translation: "Մենք գնում ենք կինոթատրոն:",
    context: "____ al cine.",
    destination: "Cine"
  },
  {
    pronoun: "Ellos",
    options: ["va", "van", "vamos"],
    correct: "van",
    translation: "Նրանք գնում են այգի:",
    context: "____ al parque.",
    destination: "Parque"
  },
  {
    pronoun: "Ella",
    options: ["voy", "va", "vas"],
    correct: "va",
    translation: "Նա գնում է տուն:",
    context: "____ a casa.",
    destination: "Casa"
  },
  {
    pronoun: "Ustedes",
    options: ["van", "vamos", "vais"],
    correct: "van",
    translation: "Դուք գնում եք ռեստորան:",
    context: "____ al restaurante.",
    destination: "Restaurante"
  },
  {
    pronoun: "Nosotras",
    options: ["vamos", "van", "va"],
    correct: "vamos",
    translation: "Մենք (աղջիկներով) գնում ենք թանգարան:",
    context: "____ al museo.",
    destination: "Museo"
  },
  {
    pronoun: "Vosotros",
    options: ["vais", "van", "vamos"],
    correct: "vais",
    translation: "Դուք գնում եք օդանավակայան:",
    context: "____ al aeropuerto.",
    destination: "Aeropuerto"
  },
  {
    pronoun: "Yo",
    options: ["voy", "vas", "va"],
    correct: "voy",
    translation: "Ես գնում եմ Երևան:",
    context: "____ a Ereván.",
    destination: "Ereván"
  }
];

export default function SpanishIrAdventure() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentTask = TASKS[currentTaskIndex];

  const handleAnswer = (option: string) => {
    if (feedback) return;

    const isCorrect = option === currentTask.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentTaskIndex === TASKS.length - 1) {
        setGameState('won');
      } else {
        setCurrentTaskIndex(prev => prev + 1);
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentTaskIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-[#fefce8] text-slate-800 font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" 
        />
        <motion.div 
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-10 text-blue-400/20"
        >
          <Cloud className="w-32 h-32" />
        </motion.div>
        <motion.div 
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 right-10 text-orange-400/20"
        >
          <Sun className="w-40 h-40" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center z-10 space-y-8 max-w-lg bg-white p-12 rounded-[3rem] shadow-2xl border-b-8 border-orange-400"
          >
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-blue-500 rounded-3xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Plane className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-500 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-yellow-500 to-orange-500">
                ¡VAMOS!
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                The Verb "IR" Adventure
              </p>
            </div>

            <p className="text-slate-600 font-medium leading-relaxed">
              Սովորիր ճիշտ օգտագործել <b>IR</b> (գնալ) բայը: Ընտրիր ճիշտ ձևը և ճամփորդիր տարբեր վայրերով:
            </p>

            <button
              onClick={() => setGameState('playing')}
              className="w-full py-5 bg-orange-500 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-orange-400 transition-all active:scale-95 shadow-xl shadow-orange-100"
            >
              Սկսել Ճամփորդությունը
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8 z-10"
          >
            {/* Stats Panel */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-xl border-b-4 border-blue-400">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">Explorer</h3>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Level: Intermediate</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-xl border-b-4 border-yellow-400">
                <div className="flex items-center gap-3 mb-4 text-yellow-600">
                  <Navigation className="w-6 h-6" />
                  <span className="font-black uppercase tracking-widest text-xs">Destination: {currentTask.destination}</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${((currentTaskIndex + 1) / TASKS.length) * 100}%` }}
                    className="h-full bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-400"
                  />
                </div>
                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase text-right">
                  {currentTaskIndex + 1} / {TASKS.length}
                </div>
              </div>
            </div>

            {/* Conjugation Card */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentTaskIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white text-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl relative border-4 border-white"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs text-blue-500">
                      <Compass className="w-4 h-4" />
                      Verb: IR (to go)
                    </div>
                    <div className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-black uppercase">
                      {currentTask.pronoun}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black leading-tight text-slate-800">
                      {currentTask.pronoun} <span className="text-orange-500 underline decoration-8 underline-offset-8">____</span> {currentTask.context.split('____')[1]}
                    </h2>
                    <p className="text-slate-400 font-bold italic text-xl">
                      {currentTask.translation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentTask.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={!!feedback}
                        onClick={() => handleAnswer(opt)}
                        className={`py-5 rounded-2xl font-black text-2xl transition-all border-b-8 active:translate-y-2 active:border-b-0 ${
                          feedback === 'correct' && opt === currentTask.correct
                            ? 'bg-emerald-500 border-emerald-700 text-white'
                            : feedback === 'wrong' && opt === currentTask.correct
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                            : feedback === 'wrong' && opt !== currentTask.correct
                            ? 'bg-slate-100 border-slate-200 text-slate-300 opacity-50'
                            : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-blue-500 hover:text-white hover:border-blue-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center justify-center gap-3 p-5 rounded-2xl font-black uppercase text-sm ${feedback === 'correct' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}
                      >
                        {feedback === 'correct' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                        {feedback === 'correct' ? 'ՃԻՇՏ Է! ՇԱՐՈՒՆԱԿԵՆՔ' : `ՍԽԱԼ Է! ՃԻՇՏԸ՝ "${currentTask.correct}"`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {gameState === 'won' && (
          <motion.div
            key="won"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 z-10 bg-white p-16 rounded-[4rem] shadow-2xl border-b-8 border-orange-500 max-w-lg"
          >
            <div className="relative inline-block">
              <Sun className="w-32 h-32 text-yellow-500 mx-auto drop-shadow-xl animate-spin-slow" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles className="w-12 h-12 text-blue-500" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-orange-600">
                ¡VICTORIA!
              </h2>
              <div className="text-2xl font-bold text-slate-400 mt-4">
                Score: {score} / {TASKS.length}
              </div>
              <p className="text-slate-500 font-medium mt-6">
                Դու հիանալի գիտես <b>IR</b> բայի բոլոր ձևերը:
              </p>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-5 bg-blue-600 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl active:scale-95"
            >
              Նորից Խաղալ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
        <span className="text-blue-400">Blue</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-yellow-500">Yellow</span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-orange-500">Orange</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}} />
    </div>
  );
}
