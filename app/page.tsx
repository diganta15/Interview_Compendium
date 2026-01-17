import Sidebar from '@/components/Sidebar';
import { Building2 } from 'lucide-react';
import data from '@/data/leetcode.json';
import { LeetCodeData } from '@/types';

const db = data as LeetCodeData;

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Sidebar data={db} />
      </div>

      {/* Empty State */}
      <div className="lg:col-span-3">
        <div className="bg-stone-900/50 border border-stone-800 rounded p-16 text-center mt-0 lg:mt-24">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-stone-800/50 mb-6">
            <Building2 className="w-10 h-10 text-stone-600" />
          </div>
          <h3 className="text-2xl font-serif font-semibold mb-2 text-stone-200">Select a Company</h3>
          <p className="text-stone-500 max-w-md mx-auto">
            Choose a company from the sidebar to view their interview question collection, sorted by frequency.
          </p>
        </div>
      </div>
    </div>
  );
}