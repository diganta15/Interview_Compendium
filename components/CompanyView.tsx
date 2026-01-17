// src/components/CompanyView.tsx
'use client';

import { useState } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { LeetCodeData, QuestionDetails, CompanyQuestionRef } from '@/types';

interface Props {
  companyName: string;
  questionsRef: CompanyQuestionRef[];
  allQuestions: Record<string, QuestionDetails>;
}

export default function CompanyView({ companyName, questionsRef, allQuestions }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  // Merge the Reference data (ID, Freq) with the Detail data (Title, Link)
  const mergedData = questionsRef.map(q => ({
    ...q,
    ...allQuestions[q.id]
  })).filter(q => q.title); // Safety filter

  // Filter Logic
  const filteredProblems = mergedData.filter(p => 
     p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper Functions (From your design)
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-emerald-400';
      case 'Medium': return 'text-amber-400';
      case 'Hard': return 'text-rose-400';
      default: return 'text-stone-400';
    }
  };

  const getFrequencyBadge = (freq: number) => {
    if (freq > 50) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    if (freq > 20) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    return 'bg-stone-500/10 text-stone-400 border-stone-500/20';
  };

  return (
    <div>
      {/* Company Header */}
      <div className="bg-stone-900/50 border border-stone-800 rounded p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-2 text-stone-100">{companyName}</h2>
            <p className="text-stone-400">
              Collection of {questionsRef.length} frequently asked interview questions
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-3xl font-bold text-amber-600">{questionsRef.length}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wider">Questions</div>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-950 border border-stone-700 rounded text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-amber-600 transition"
          />
        </div>
      </div>

      {/* Questions Table */}
      <div className="bg-stone-900/50 border border-stone-800 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-900/80 border-b border-stone-800">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Problem</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Acceptance</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Frequency</th>
                <th className="px-6 py-4 text-xs font-semibold text-stone-400 uppercase tracking-wider">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {filteredProblems.map((problem) => (
                <tr key={problem.id} className="hover:bg-stone-800/30 transition group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-stone-300 group-hover:text-stone-100 transition">{problem.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-stone-500">{problem.acceptance}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded border ${getFrequencyBadge(problem.frequency)}`}>
                      {problem.frequency.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-500 transition text-sm font-medium"
                    >
                      Solve
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProblems.length === 0 && (
            <div className="p-8 text-center text-stone-500">
              No questions found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-stone-900/50 border border-stone-800 rounded p-4">
          <div className="text-2xl font-bold text-emerald-400">
            {filteredProblems.filter(p => p.difficulty === 'Easy').length}
          </div>
          <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Easy</div>
        </div>
        <div className="bg-stone-900/50 border border-stone-800 rounded p-4">
          <div className="text-2xl font-bold text-amber-400">
            {filteredProblems.filter(p => p.difficulty === 'Medium').length}
          </div>
          <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Medium</div>
        </div>
        <div className="bg-stone-900/50 border border-stone-800 rounded p-4">
          <div className="text-2xl font-bold text-rose-400">
            {filteredProblems.filter(p => p.difficulty === 'Hard').length}
          </div>
          <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Hard</div>
        </div>
      </div>
    </div>
  );
}