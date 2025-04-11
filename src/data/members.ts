import { Member } from '../types/member';

export const members: Member[] = [
  {
    id: '1',
    name: 'Dr. Ana Silva',
    category: 'Pós-Doutorado',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300',
    research: 'Pesquisa em biologia molecular com foco em genética de plantas',
    proficiencies: ['Biologia Molecular', 'Genética', 'Biotecnologia'],
    email: 'ana.silva@labresearch.com',
    education: [
      'Pós-Doutorado em Biotecnologia - Universidade de São Paulo',
      'Doutorado em Ciências Biológicas - Universidade Federal do Rio de Janeiro',
      'Mestrado em Genética - Universidade de Campinas'
    ],
    publications: [
      {
        title: 'Advances in Plant Genetic Engineering',
        journal: 'Nature Biotechnology',
        year: 2023,
        authors: ['Silva, A.', 'Santos, J.', 'Oliveira, M.'],
        doi: '10.1038/nbt.2023.1234'
      },
      {
        title: 'Novel Approaches in Molecular Biology',
        journal: 'Cell Research',
        year: 2022,
        authors: ['Silva, A.', 'Costa, P.'],
        doi: '10.1038/cr.2022.5678'
      }
    ],
    awards: [
      'Prêmio Jovem Cientista 2022',
      'Menção Honrosa FAPESP 2021'
    ],
    bio: 'Pesquisadora dedicada ao avanço da biotecnologia vegetal, com foco em desenvolver soluções sustentáveis para a agricultura. Possui experiência internacional e lidera projetos inovadores em engenharia genética.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ana-silva',
      researchGate: 'https://researchgate.net/profile/Ana_Silva',
      googleScholar: 'https://scholar.google.com/citations?user=ana-silva'
    }
  },
  {
    id: '2',
    name: 'João Santos',
    category: 'Doutorado',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300',
    research: 'Desenvolvimento de algoritmos para análise de dados genômicos',
    proficiencies: ['Bioinformática', 'Python', 'Machine Learning'],
    email: 'joao.santos@labresearch.com',
    education: [
      'Mestrado em Bioinformática - Universidade de São Paulo',
      'Graduação em Ciência da Computação - Universidade Federal de Minas Gerais'
    ],
    publications: [
      {
        title: 'Machine Learning Applications in Genomics',
        journal: 'Bioinformatics',
        year: 2023,
        authors: ['Santos, J.', 'Silva, A.'],
        doi: '10.1093/bioinformatics/2023.9012'
      }
    ],
    awards: [
      'Melhor Trabalho de Mestrado 2021'
    ],
    bio: 'Especialista em bioinformática com foco na aplicação de técnicas de aprendizado de máquina para análise de dados genômicos. Desenvolve ferramentas computacionais inovadoras para pesquisa em genética.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/joao-santos',
      googleScholar: 'https://scholar.google.com/citations?user=joao-santos'
    }
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    category: 'Mestrado',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
    research: 'Estudo de microorganismos em ambientes extremos',
    proficiencies: ['Microbiologia', 'Análise Laboratorial', 'Bioquímica'],
    email: 'maria.oliveira@labresearch.com',
    education: [
      'Graduação em Ciências Biológicas - Universidade de São Paulo'
    ],
    publications: [
      {
        title: 'Extremophiles in Brazilian Ecosystems',
        journal: 'Environmental Microbiology',
        year: 2023,
        authors: ['Oliveira, M.', 'Silva, A.'],
        doi: '10.1111/env.2023.4567'
      }
    ],
    awards: [
      'Iniciação Científica Destaque 2022'
    ],
    bio: 'Pesquisadora focada no estudo de microorganismos em condições extremas, buscando compreender sua adaptação e potenciais aplicações biotecnológicas.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/maria-oliveira',
      researchGate: 'https://researchgate.net/profile/Maria_Oliveira'
    }
  },
  {
    id: '4',
    name: 'Pedro Costa',
    category: 'Graduação',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300',
    research: 'Iniciação científica em ecologia marinha',
    proficiencies: ['Ecologia', 'Biologia Marinha', 'Coleta de Dados'],
    email: 'pedro.costa@labresearch.com',
    education: [
      'Graduando em Ciências Biológicas - Universidade Federal de São Paulo'
    ],
    publications: [],
    awards: [
      'Menção Honrosa na Feira de Ciências 2023'
    ],
    bio: 'Estudante dedicado à pesquisa em ecologia marinha, com interesse especial em conservação de ecossistemas costeiros. Participa ativamente de projetos de monitoramento ambiental.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/pedro-costa'
    }
  }
];