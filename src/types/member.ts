export type MemberCategory = 'Mestrado' | 'Doutorado' | 'Pós-Doutorado' | 'Graduação';

export interface Member {
  id: string;
  name: string;
  category: MemberCategory;
  image: string;
  research: string;
  proficiencies: string[];
  email: string;
  education: string[];
  publications: Publication[];
  awards: string[];
  bio: string;
  socialLinks?: {
    linkedin?: string;
    researchGate?: string;
    googleScholar?: string;
  };
}

export interface Publication {
  title: string;
  journal: string;
  year: number;
  authors: string[];
  doi?: string;
}