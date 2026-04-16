import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Coffee, 
  Music, 
  Heart, 
  Star, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Sparkles,
  User,
  Store
} from 'lucide-react';

// --- Types ---
interface ConjugationTask {
  verb: string;
  pronoun: string;
  options: string[];
  correct: string;
  translation: string;
  context: string;
  location: 'boutique' | 'cafe' | 'music';
}

// --- Data ---
const TASKS: ConjugationTask[] = [
  {
    verb: "beber",
    pronoun: "Yo",
    options: ["bebo", "bebes", "bebe"],
    correct: "bebo",
    translation: "Ես խմում եմ հյութ:",
    context: "____ jugo de naranja en el café.",
    location: "cafe"
  },
  {
    verb: "cantar",
    pronoun: "Tú",
    options: ["canto", "cantas", "canta"],
    correct: "cantas",
    translation: "Դու շատ լավ ես երգում:",
    context: "____ muy bien en el karaoke.",
    location: "music"
  },
  {
    verb: "beber",
    pronoun: "Ella",
    options: ["bebe", "bebo", "beben"],
    correct: "bebe",
    translation: "Նա ջուր է խմում:",
    context: "____ agua mineral.",
    location: "cafe"
  },
  {
    verb: "cantar",
    pronoun: "Nosotros",
    options: ["cantamos", "cantáis", "cantan"],
    correct: "cantamos",
    translation: "Մենք երգում ենք միասին:",
    context: "____ juntos una canción.",
    location: "music"
  },
  {
    verb: "beber",
    pronoun: "Ellos",
    options: ["bebe", "beben", "bebemos"],
    correct: "beben",
    translation: "Նրանք թեյ են խմում:",
    context: "____ té caliente.",
    location: "cafe"
  },
  {
    verb: "cantar",
    pronoun: "Él",
    options: ["canto", "canta", "cantas"],
    correct: "canta",
    translation: "Նա երգում է բեմի վրա:",
    context: "____ en el escenario.",
    location: "music"
  },
  {
    verb: "beber",
    pronoun: "Nosotros",
    options: ["beben", "bebe", "bebemos"],
    correct: "bebemos",
    translation: "Մենք սուրճ ենք խմում:",
    context: "____ café con leche.",
    location: "cafe"
  },
  {
    verb: "cantar",
    pronoun: "Ellas",
    options: ["cantan", "cantamos", "canta"],
    correct: "cantan",
    translation: "Աղջիկները երգում են երգչախմբում:",
    context: "Las chicas ____ en el coro.",
    location: "music"
  },
  {
    verb: "beber",
    pronoun: "Tú",
    options: ["bebes", "bebo", "bebe"],
    correct: "bebes",
    translation: "Դու լիմոնադ ես խմում:",
    context: "____ limonada fresca.",
    location: "cafe"
  },
  {
    verb: "cantar",
    pronoun: "Yo",
    options: ["canta", "cantas", "canto"],
    correct: "canto",
    translation: "Ես երգում եմ լոգարանում:",
    context: "____ en la ducha.",
    location: "music"
  }
];

const LOCATIONS = {
  cafe: { name: "El Café Mágico", icon: Coffee, color: "bg-amber-500", text: "text-amber-500" },
  music: { name: "Tienda de Música", icon: Music, color: "bg-purple-500", text: "text-purple-500" },
  boutique: { name: "Boutique de Moda", icon: ShoppingBag, color: "bg-pink-500", text: "text-pink-500" }
};

export default function GayaneShoppingAdventure() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [itemsCollected, setItemsCollected] = useState<string[]>([]);

  const currentTask = TASKS[currentTaskIndex];
  const locationInfo = LOCATIONS[currentTask.location];

  const handleAnswer = (option: string) => {
    if (feedback) return;

    const isCorrect = option === currentTask.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(s => s + 1);
      if (currentTaskIndex % 2 === 0) {
        setItemsCollected(prev => [...prev, currentTask.location === 'cafe' ? '🍰' : '🎵']);
      }
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
    setItemsCollected([]);
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] text-slate-800 font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <ShoppingBag className="absolute top-10 left-10 w-32 h-32 text-pink-300" />
        <Heart className="absolute bottom-10 right-10 w-40 h-40 text-pink-400" />
        <Star className="absolute top-1/4 right-1/4 w-24 h-24 text-purple-300 rotate-12" />
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center z-10 space-y-8 max-w-lg bg-white p-12 rounded-[3rem] shadow-xl border-4 border-pink-100"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Store className="w-24 h-24 text-pink-500 mx-auto" />
              </motion.div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                Gayane's Shop
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                Գայանեի գնումների արկածը
              </p>
            </div>

            <p className="text-slate-600 font-medium leading-relaxed">
              Օգնիր Գայանեին ճիշտ խոնարհել իսպաներեն բայերը (<b>cantar</b> և <b>beber</b>) խանութում և սրճարանում:
            </p>

            <button
              onClick={() => setGameState('playing')}
              className="group relative px-12 py-5 bg-pink-500 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-pink-400 transition-all active:scale-95 shadow-lg shadow-pink-200 overflow-hidden"
            >
              <span className="relative z-10">Սկսել Խաղը</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
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
            {/* Left: Stats */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-md border border-pink-50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">Gayane</h3>
                    <p className="text-[10px] font-bold uppercase text-slate-400">Fashion Explorer</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {itemsCollected.map((item, i) => (
                    <span key={i} className="text-2xl">{item}</span>
                  ))}
                  {itemsCollected.length === 0 && <span className="text-xs text-slate-300 italic">No items yet</span>}
                </div>
              </div>

              <div className={`p-6 rounded-3xl shadow-md border transition-all bg-white border-pink-50`}>
                <div className="flex items-center gap-3 mb-4">
                  <locationInfo.icon className={`w-6 h-6 ${locationInfo.text}`} />
                  <span className="font-black uppercase tracking-widest text-xs">{locationInfo.name}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${((currentTaskIndex + 1) / TASKS.length) * 100}%` }}
                    className={`h-full ${locationInfo.color}`}
                  />
                </div>
                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase text-right">
                  Task {currentTaskIndex + 1} of {TASKS.length}
                </div>
              </div>
            </div>

            {/* Center: Conjugation Card */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentTaskIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white text-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative border-4 border-pink-50"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-2 font-black uppercase tracking-widest text-xs ${locationInfo.text}`}>
                      <Sparkles className="w-4 h-4" />
                      Verb: {currentTask.verb}
                    </div>
                    <div className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase">
                      {currentTask.pronoun}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black leading-tight text-slate-800">
                      {currentTask.pronoun} <span className="text-pink-500 underline decoration-4 underline-offset-8">____</span> {currentTask.context.split('____')[1]}
                    </h2>
                    <p className="text-slate-400 font-bold italic text-lg">
                      {currentTask.translation}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentTask.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={!!feedback}
                        onClick={() => handleAnswer(opt)}
                        className={`py-4 rounded-2xl font-black text-xl transition-all border-b-4 active:translate-y-1 active:border-b-0 ${
                          feedback === 'correct' && opt === currentTask.correct
                            ? 'bg-emerald-500 border-emerald-700 text-white'
                            : feedback === 'wrong' && opt === currentTask.correct
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                            : feedback === 'wrong' && opt !== currentTask.correct
                            ? 'bg-slate-100 border-slate-200 text-slate-300 opacity-50'
                            : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-pink-500 hover:text-white hover:border-pink-700'
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
                        className={`flex items-center justify-center gap-2 p-4 rounded-2xl font-black uppercase text-xs ${feedback === 'correct' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}
                      >
                        {feedback === 'correct' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {feedback === 'correct' ? 'Ճիշտ է! Շարունակենք:' : `Սխալ է! Ճիշտը՝ "${currentTask.correct}"`}
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
            className="text-center space-y-8 z-10 bg-white p-16 rounded-[4rem] shadow-2xl border-8 border-pink-100 max-w-lg"
          >
            <div className="relative inline-block">
              <ShoppingBag className="w-32 h-32 text-pink-500 mx-auto drop-shadow-lg" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 -right-4"
              >
                <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-pink-600">
                Գայանե, դու հաղթեցիր!
              </h2>
              <div className="text-2xl font-bold text-slate-400 mt-4">
                Միավորներ: {score} / {TASKS.length}
              </div>
              <div className="flex justify-center gap-2 text-3xl mt-4">
                {itemsCollected.map((item, i) => <span key={i}>{item}</span>)}
              </div>
              <p className="text-slate-500 font-medium mt-6">
                Դու հիանալի տիրապետում ես իսպաներեն բայերին:
              </p>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-5 bg-pink-500 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-pink-600 transition-all shadow-xl active:scale-95"
            >
              Նորից Խաղալ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 text-pink-300 text-[10px] font-black uppercase tracking-[0.4em]">
        <span>Cantar</span>
        <ChevronRight className="w-3 h-3" />
        <span>Beber</span>
        <ChevronRight className="w-3 h-3" />
        <span>Gayane's Adventure</span>
      </div>
    </div>
  );
}
