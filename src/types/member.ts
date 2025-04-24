export type MemberCategory = 'Mestrado' | 'Doutorado' | 'Pós-Doutorado' | 'Graduação';

export interface Member {
  id: string;
  cpfcnpj: string,
  name: string;
  category: MemberCategory;
  image_url: string;
  research: string;
  proficiencies: string;
  email: string;
  education: string;
  publications: Publication;
  awards: string;
  bio: string;
  linkedin_url: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: number;
  authors: string[];
  doi?: string;
}