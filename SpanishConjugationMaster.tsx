import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Utensils, 
  Home, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Sparkles,
  Trophy,
  Zap,
  Star
} from 'lucide-react';

// --- Types ---
interface ConjugationTask {
  verb: string;
  type: '-ar' | '-er' | '-ir';
  pronoun: string;
  options: string[];
  correct: string;
  translation: string;
  sentence: string;
}

// --- Data ---
const TASKS: ConjugationTask[] = [
  // Hablar (-ar)
  {
    verb: "hablar",
    type: "-ar",
    pronoun: "Yo",
    options: ["hablo", "hablas", "habla"],
    correct: "hablo",
    translation: "Ես խոսում եմ իսպաներեն:",
    sentence: "Yo ____ español con mis amigos."
  },
  {
    verb: "hablar",
    type: "-ar",
    pronoun: "Nosotros",
    options: ["hablamos", "habláis", "hablan"],
    correct: "hablamos",
    translation: "Մենք խոսում ենք հեռախոսով:",
    sentence: "Nosotros ____ por teléfono."
  },
  {
    verb: "hablar",
    type: "-ar",
    pronoun: "Ellos",
    options: ["habla", "hablan", "hablas"],
    correct: "hablan",
    translation: "Նրանք խոսում են շատ արագ:",
    sentence: "Ellos ____ muy rápido."
  },
  // Comer (-er)
  {
    verb: "comer",
    type: "-er",
    pronoun: "Tú",
    options: ["como", "comes", "come"],
    correct: "comes",
    translation: "Դու պիցցա ես ուտում:",
    sentence: "Tú ____ pizza los viernes."
  },
  {
    verb: "comer",
    type: "-er",
    pronoun: "Ella",
    options: ["come", "comemos", "comen"],
    correct: "come",
    translation: "Նա խնձոր է ուտում:",
    sentence: "Ella ____ una manzana roja."
  },
  {
    verb: "comer",
    type: "-er",
    pronoun: "Vosotros",
    options: ["coméis", "comen", "comemos"],
    correct: "coméis",
    translation: "Դուք ուտում եք ռեստորանում:",
    sentence: "Vosotros ____ en el restaurante."
  },
  // Vivir (-ir)
  {
    verb: "vivir",
    type: "-ir",
    pronoun: "Yo",
    options: ["vivo", "vives", "vive"],
    correct: "vivo",
    translation: "Ես ապրում եմ Երևանում:",
    sentence: "Yo ____ en Ereván."
  },
  {
    verb: "vivir",
    type: "-ir",
    pronoun: "Nosotros",
    options: ["vivimos", "vivís", "viven"],
    correct: "vivimos",
    translation: "Մենք ապրում ենք մեծ տանը:",
    sentence: "Nosotros ____ en una casa grande."
  },
  {
    verb: "vivir",
    type: "-ir",
    pronoun: "Ustedes",
    options: ["viven", "vivimos", "vive"],
    correct: "viven",
    translation: "Դուք ապրում եք Իսպանիայում:",
    sentence: "Ustedes ____ en España."
  },
  // Mixed
  {
    verb: "hablar",
    type: "-ar",
    pronoun: "Tú",
    options: ["hablas", "hablo", "habla"],
    correct: "hablas",
    translation: "Դու խոսում ես ուսուցչի հետ:",
    sentence: "Tú ____ con el profesor."
  },
  {
    verb: "comer",
    type: "-er",
    pronoun: "Nosotros",
    options: ["comemos", "coméis", "comen"],
    correct: "comemos",
    translation: "Մենք ուտում ենք ընթրիք:",
    sentence: "Nosotros ____ la cena juntos."
  },
  {
    verb: "vivir",
    type: "-ir",
    pronoun: "Él",
    options: ["vive", "vivo", "vives"],
    correct: "vive",
    translation: "Նա ապրում է իր ընտանիքի հետ:",
    sentence: "Él ____ con su familia."
  }
];

const VERB_ICONS = {
  hablar: MessageSquare,
  comer: Utensils,
  vivir: Home
};

const TYPE_COLORS = {
  '-ar': 'bg-blue-500',
  '-er': 'bg-orange-500',
  '-ir': 'bg-emerald-500'
};

export default function SpanishConjugationMaster() {
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'won'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const currentTask = TASKS[currentIndex];
  const Icon = VERB_ICONS[currentTask.verb as keyof typeof VERB_ICONS];

  const handleAnswer = (option: string) => {
    if (feedback) return;

    const isCorrect = option === currentTask.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex === TASKS.length - 1) {
        setGameState('won');
      } else {
        setCurrentIndex(prev => prev + 1);
      }
    }, 1500);
  };

  const resetGame = () => {
    setGameState('intro');
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

      <AnimatePresence mode="wait">
        {gameState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center z-10 space-y-8 max-w-xl bg-white p-12 rounded-[3rem] shadow-2xl border-t-8 border-blue-500"
          >
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-xl">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl font-black tracking-tighter uppercase italic text-slate-900">
                Verb <span className="text-blue-500">Master</span>
              </h1>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                Hablar • Comer • Vivir
              </p>
            </div>

            <p className="text-slate-600 font-medium leading-relaxed text-lg">
              Սովորիր իսպաներենի հիմնական բայերի խոնարհումը: 
              Անցիր բոլոր փուլերը և դարձիր բայերի վարպետ:
            </p>

            <button
              onClick={() => setGameState('playing')}
              className="w-full py-5 bg-blue-600 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
            >
              Սկսել Մարտահրավերը
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 z-10"
          >
            {/* Left: Progress & Info */}
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Current Progress</div>
                <div className="flex flex-wrap gap-2">
                  {TASKS.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        i < currentIndex ? 'bg-emerald-500 text-white' : 
                        i === currentIndex ? 'bg-blue-500 text-white animate-pulse' : 
                        'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-xl ${TYPE_COLORS[currentTask.type]} text-white`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Verb Type</div>
                    <div className="font-black text-lg uppercase">{currentTask.verb} ({currentTask.type})</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ width: `${((currentIndex + 1) / TASKS.length) * 100}%` }}
                    className={`h-full ${TYPE_COLORS[currentTask.type]}`}
                  />
                </div>
              </div>
            </div>

            {/* Center: Challenge Card */}
            <div className="lg:col-span-2">
              <motion.div
                key={currentIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="bg-white text-slate-900 rounded-[3rem] p-8 md:p-12 shadow-2xl relative border-4 border-white"
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-black uppercase tracking-widest text-xs text-blue-600">
                      <Zap className="w-4 h-4" />
                      Conjugation Task
                    </div>
                    <div className="px-4 py-1 bg-slate-100 rounded-full text-xs font-black uppercase text-slate-500">
                      Pronoun: {currentTask.pronoun}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black leading-tight text-slate-800">
                      {currentTask.pronoun} <span className="text-blue-500 underline decoration-8 underline-offset-8">____</span> {currentTask.sentence.split('____')[1]}
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
                            : 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-blue-600 hover:text-white hover:border-blue-800'
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
                        {feedback === 'correct' ? 'Հիանալի է! Շարժվենք առաջ:' : `Սխալ է! Ճիշտը՝ "${currentTask.correct}"`}
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
            className="text-center space-y-8 z-10 bg-white p-16 rounded-[4rem] shadow-2xl border-b-8 border-blue-500 max-w-lg"
          >
            <div className="relative inline-block">
              <Trophy className="w-32 h-32 text-yellow-500 mx-auto drop-shadow-xl" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 -right-4"
              >
                <Star className="w-12 h-12 text-blue-500 fill-blue-500" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <h2 className="text-6xl font-black italic uppercase tracking-tighter text-slate-900">
                ¡FELICIDADES!
              </h2>
              <div className="text-2xl font-bold text-blue-500 mt-4">
                Score: {score} / {TASKS.length}
              </div>
              <p className="text-slate-500 font-medium mt-6">
                Դուք հաջողությամբ յուրացրեցիք <b>-ar, -er, -ir</b> բայերի խոնարհումը:
              </p>
            </div>

            <button
              onClick={resetGame}
              className="w-full py-5 bg-blue-600 text-white rounded-full font-black text-xl uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl active:scale-95"
            >
              Նորից Խաղալ
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
        <span>Hablar</span>
        <ChevronRight className="w-3 h-3" />
        <span>Comer</span>
        <ChevronRight className="w-3 h-3" />
        <span>Vivir</span>
      </div>
    </div>
  );
}
