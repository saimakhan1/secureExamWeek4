"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowLeft, ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";

const DEMO_QUESTIONS = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correctAnswer: "Hyper Text Markup Language",
  },
  {
    id: 2,
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correctAnswer: "CSS",
  },
  {
    id: 3,
    question: "Which is a JavaScript framework?",
    options: ["React", "Laravel", "Django", "Flask"],
    correctAnswer: "React",
  }
];

export default function DemoExamPage() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // 🛡️ Security Implementation: No Copy-Paste, No Right Click
  useEffect(() => {
    const preventCopy = (e) => {
      e.preventDefault();
      toast.error("Copying is disabled during the exam!", {
        icon: <ShieldAlert className="text-red-500" />,
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    };

    const preventPaste = (e) => {
      e.preventDefault();
      toast.error("Pasting is disabled!", {
        icon: <ShieldAlert className="text-red-500" />
      });
    };

    const preventRightClick = (e) => {
      e.preventDefault();
      toast("Right-click is disabled for security", {
        icon: "🚫",
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
    };

    const preventKeyboardShortcuts = (e) => {
      // Block Ctrl+C, Ctrl+V, Ctrl+U (View Source), Ctrl+Shift+I (Inspect)
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 's')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        toast.error("Standard shortcuts are disabled for this assessment.");
      }
    };

    // Attach listeners
    document.addEventListener("copy", preventCopy);
    document.addEventListener("paste", preventPaste);
    document.addEventListener("contextmenu", preventRightClick);
    document.addEventListener("keydown", preventKeyboardShortcuts);

    // Cleanup
    return () => {
      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("paste", preventPaste);
      document.removeEventListener("contextmenu", preventRightClick);
      document.removeEventListener("keydown", preventKeyboardShortcuts);
    };
  }, []);

  const handleOptionChange = (qId, option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    let currentScore = 0;
    DEMO_QUESTIONS.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white p-6 mt-16 select-none">
      <div className="max-w-4xl mx-auto pt-4 font-sans">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-teal-900 tracking-tight">Demo Practice Exam</h1>
            <div className="flex items-center mt-1 text-teal-600">
              <ShieldAlert className="w-4 h-4 mr-1.5" />
              <p className="text-sm font-semibold uppercase tracking-wider">Exam Environment Secured</p>
            </div>
          </div>
          <Link href="/dashboard/student/my-exams" className="flex items-center text-teal-700 hover:text-teal-900 font-semibold transition-colors group px-4 py-2 rounded-lg hover:bg-teal-50">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Exit Practice
          </Link>
        </div>
        
        <div className="bg-white border-l-4 border-teal-500 p-5 rounded-r-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] mb-10">
          <p className="text-gray-700 font-medium leading-relaxed">
            Welcome to the secure assessment mode. This exam has <strong>no time limit</strong>. 
            Selection, copying, and right-clicking are disabled to maintain integrity.
          </p>
        </div>

        <div className="space-y-8">
          {DEMO_QUESTIONS.map((q, index) => (
            <div key={q.id} className="bg-white p-8 rounded-[2rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start mb-8">
                <span className="bg-teal-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center font-black mr-5 shrink-0 shadow-lg shadow-teal-100">
                  {index + 1}
                </span>
                <h3 className="text-xl font-bold text-gray-800 pt-1 leading-relaxed">
                  {q.question}
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-5 ml-0 sm:ml-14">
                {q.options.map((option, i) => {
                  const isSelected = answers[q.id] === option;
                  const isCorrect = q.correctAnswer === option;
                  let optionClass = "relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-500 ";
                  
                  if (submitted) {
                    if (isSelected && isCorrect) optionClass += "bg-emerald-50/50 border-emerald-500 scale-[1.02] shadow-md ring-2 ring-emerald-100";
                    else if (isSelected && !isCorrect) optionClass += "bg-rose-50/50 border-rose-500 scale-[1.02] shadow-md ring-2 ring-rose-100";
                    else if (isCorrect) optionClass += "bg-emerald-50/20 border-emerald-200 opacity-90";
                    else optionClass += "bg-gray-50 border-gray-100 opacity-40";
                  } else {
                    optionClass += isSelected 
                      ? "bg-teal-50/50 border-teal-600 shadow-xl shadow-teal-50 scale-[1.01] ring-2 ring-teal-100" 
                      : "hover:bg-gray-50 border-gray-100 hover:border-teal-200 hover:translate-x-1";
                  }

                  return (
                    <div
                      key={i}
                      className={optionClass}
                      onClick={() => handleOptionChange(q.id, option)}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-5 shrink-0 transition-all duration-300 ${
                        isSelected ? 'border-teal-600 bg-teal-600 rotate-[360deg]' : 'border-gray-300'
                      }`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />}
                      </div>
                      <span className={`text-lg transition-colors ${isSelected ? 'text-teal-900 font-bold' : 'text-gray-700'}`}>
                        {option}
                      </span>
                      
                      <div className="absolute right-8">
                        {submitted && isSelected && isCorrect && (
                          <CheckCircle2 className="text-emerald-600 w-8 h-8 animate-in fade-in slide-in-from-right-2 duration-500" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="text-rose-600 w-8 h-8 animate-in fade-in slide-in-from-right-2 duration-500" />
                        )}
                        {submitted && !isSelected && isCorrect && (
                          <CheckCircle2 className="text-emerald-400 w-8 h-8 opacity-60" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 mb-24 flex justify-center">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== DEMO_QUESTIONS.length}
              className="group relative px-16 py-5 bg-teal-600 text-white rounded-[1.5rem] font-black text-2xl hover:bg-teal-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all duration-500 shadow-2xl hover:shadow-teal-200 hover:-translate-y-1.5 active:translate-y-0"
            >
              Submit Responses
              <span className="ml-3 group-hover:translate-x-2 transition-transform inline-block">&rarr;</span>
            </button>
          ) : (
            <div className="w-full bg-white p-12 rounded-[3rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-teal-100 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <ShieldAlert className="w-48 h-48 text-teal-900" />
              </div>
              <h2 className="text-3xl font-black text-teal-900 mb-2">Practice Result</h2>
              <div className="inline-block relative mb-8">
                <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 py-3 tracking-tighter">
                  {score} / {DEMO_QUESTIONS.length}
                </div>
                <div className="h-3 w-full bg-teal-50 rounded-full overflow-hidden mt-2 border border-teal-100">
                  <div 
                    className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-1000 ease-out"
                    style={{ width: `${(score / DEMO_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
              <p className="text-xl text-teal-800 font-semibold mb-10 max-w-md mx-auto leading-relaxed">
                {score === DEMO_QUESTIONS.length ? "Outstanding mastery! You've achieved a perfect score in this practice set." : "Great effort! A bit more practice will help you achieve perfection."}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button
                  onClick={() => {
                    setAnswers({});
                    setSubmitted(false);
                    setScore(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-10 py-4 bg-white border-2 border-teal-600 text-teal-600 rounded-2xl font-bold hover:bg-teal-50 transition-all shadow-sm active:scale-95"
                >
                  Restart Assessment
                </button>
                <Link
                  href="/dashboard/student/my-exams"
                  className="px-10 py-4 bg-teal-50 text-teal-800 rounded-2xl font-bold hover:bg-teal-100 transition-all active:scale-95 flex items-center justify-center"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
