export type MemberCategory = 'Mestrado' | 'Doutorado' | 'Pós-Doutorado' | 'Graduação';

export interface Member {
  id: string;
  cpfcnpj: string,
  name: string;
  category: MemberCategory;
  image: string;
  research: string;
  proficiencias: string;
  email: string;
  phone: string;
  education: string;
  publication: Publication;
  awards: string;
  bio: string;
  linkedin: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: number;
  authors: string[];
  doi?: string;
}