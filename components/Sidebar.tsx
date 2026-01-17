// src/components/Sidebar.tsx
import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { LeetCodeData } from '@/types';

interface SidebarProps {
  data: LeetCodeData;
  activeCompany?: string;
}

export default function Sidebar({ data, activeCompany }: SidebarProps) {
  // Convert object to array and sort by question count
  const companies = Object.keys(data.companies)
    .map(name => ({
      name,
      count: data.companies[name].length,
      logo: name.charAt(0).toUpperCase() // Simple logo logic
    }))
    .sort((a, b) => b.count - a.count); // Most popular top

  return (
    <div className="bg-stone-900/50 border border-stone-800 rounded sticky top-24">
      <div className="p-4 border-b border-stone-800">
        <h3 className="text-sm font-semibold flex items-center gap-2 text-stone-300">
          <Building2 className="w-4 h-4 text-amber-600" />
          Companies
        </h3>
      </div>
      <div className="divide-y divide-stone-800 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
        {companies.map((company) => {
          const isActive = activeCompany === company.name;
          
          return (
            <Link
              key={company.name}
              href={`/${company.name}`}
              className={`block w-full px-4 py-3 text-left hover:bg-stone-800/50 transition group ${
                isActive ? 'bg-stone-800/50 border-l-2 border-amber-600' : 'border-l-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                  isActive ? 'bg-amber-900/30 text-amber-500' : 'bg-stone-800 text-stone-500 group-hover:text-stone-300'
                }`}>
                  {company.logo}
                </div>
                <div>
                  <div className={`text-sm font-medium ${isActive ? 'text-stone-100' : 'text-stone-400 group-hover:text-stone-200'}`}>
                    {company.name}
                  </div>
                  <div className="text-xs text-stone-600">{company.count} questions</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}