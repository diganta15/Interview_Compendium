import { notFound } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import CompanyView from '@/components/CompanyView';
import data from '@/data/leetcode.json';
import { LeetCodeData } from '@/types';

const db = data as LeetCodeData;

export async function generateStaticParams() {
  return Object.keys(db.companies).map((company) => ({
    company: company,
  }));
}

// 1. Update the interface to use Promise
interface Props {
  params: Promise<{ company: string }>;
}

// 2. Make the function async
export default async function Page({ params }: Props) {
  // 3. Await the params before using them
  const resolvedParams = await params;
  const companyName = decodeURIComponent(resolvedParams.company);
  
  const companyQuestions = db.companies[companyName];

  if (!companyQuestions) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Sidebar data={db} activeCompany={companyName} />
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <CompanyView 
          companyName={companyName}
          questionsRef={companyQuestions}
          allQuestions={db.questions}
        />
      </div>
    </div>
  );
}