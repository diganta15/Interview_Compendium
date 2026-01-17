export interface QuestionDetails {
  title: string;
  link: string;
  difficulty: string;
  acceptance: string;
}

export interface CompanyQuestionRef {
  id: string;
  frequency: number;
}

export interface LeetCodeData {
  generatedAt: string;
  stats: {
    totalCompanies: number;
    totalQuestions: number;
  };
  questions: Record<string, QuestionDetails>;
  companies: Record<string, CompanyQuestionRef[]>;
}