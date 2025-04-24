import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/Dialog';
import { Member, MemberCategory } from '../types/member';
import { Projects } from '../types/projects';
import { NewsArticle } from '../types/news';
import { Pencil, Trash2, Plus, X, LogOut, Search } from 'lucide-react';
import { data } from 'framer-motion/client';

const categories: MemberCategory[] = ['Graduação', 'Mestrado', 'Doutorado', 'Pós-Doutorado'];

export function AdminPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<Projects | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'member' | 'article' | null>(null);
  const [dialogTypeP, setDialogTypeP] = useState<'projects' | 'article' | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpenP, setIsDialogOpenP] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error('Erro ao buscar membros:', err));
  }, []);

  const fetchMembers = () => {
    fetch('http://localhost:3001/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error('Erro ao buscar membros:', err));
  };
  useEffect(() => {
    fetch('http://localhost:3001/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Erro ao buscar projetos:', err));
      console.log(data)
  }, []);


  const handleOpenDialog = (type: 'member' | 'article', item: Member | NewsArticle | null = null) => {
    setDialogType(type);
    if (type === 'member') {
      setSelectedMember(item as Member);
    } else {
      setSelectedArticle(item as NewsArticle);
    }
    setIsEditing(!!item);
    setIsDialogOpen(true);
  };

  // Fixed handleOpenDialogP function
const handleOpenDialogP = (type: 'projects' | 'article', item: Projects | NewsArticle | null = null) => {
  setDialogTypeP(type);
  if (type === 'projects') {
    setSelectedProjects(item as Projects);
  } else {
    setSelectedArticle(item as NewsArticle);
  }
  setIsEditing(!!item);
  setIsDialogOpenP(true); // Change this from isDialogOpen to isDialogOpenP
};

// Fixed handleDeleteProjects function
const handleDeleteProjects = async (id: number) => {
  if (!confirm('Tem certeza que deseja excluir este projeto!?')) return;
  await fetch(`http://localhost:3001/projects/${id}`, { method: 'DELETE' });
  fetchProjects(); // Call fetchProjects instead of fetchMembers
};

// Fixed fetchProjects function
const fetchProjects = () => {
  fetch('http://localhost:3001/projects')
    .then(res => res.json())
    .then(data => setProjects(data))
    .catch(err => console.error('Erro ao buscar projetos', err));
  // Remove the console.log(data) that was here
};

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedMember(null);
    setSelectedArticle(null);
    setDialogType(null);
    setIsEditing(false);
  };

  const handleDeleteMember = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este membro?')) return;
    await fetch(`http://localhost:3001/members/${id}`, { method: 'DELETE' });
    fetchMembers();
  };


  const handleCloseDialogP = () => {
    setIsDialogOpenP(false);
    setSelectedProjects(null);
    setDialogTypeP(null);
    setIsEditing(false);
  };

  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProjects = projects.filter(project => 
    project.nome_project.toLowerCase().includes(searchTerm.toLowerCase()) 
  );


  const MemberForm = () => {
    const [form, setForm] = useState({
      cpfcnpj: selectedMember?.cpfcnpj || '',
      name: selectedMember?.name || '',
      category: selectedMember?.category || '',
      image_url: selectedMember?.image_url || '',
      research: selectedMember?.research || '',
      proficiencies: selectedMember?.proficiencies || '',
      email: selectedMember?.email || '',
      education: selectedMember?.education || '',
      publications: selectedMember?.publications || '',
      awards: selectedMember?.awards || '',
      bio: selectedMember?.bio || '',
      linkedin_url: selectedMember?.linkedin_url || '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `http://localhost:3001/members/${selectedMember?.id}` : 'http://localhost:3001/members';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      fetchMembers();
      handleCloseDialog();
    };

    return (
      <div className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-xl p-8 space-y-6 overflow-y-auto max-h-[80vh]">
        <h2 className="text-2xl font-bold text-white text-center">
          {isEditing ? 'Editar Pesquisador' : 'Cadastrar Pesquisador'}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "CPF/CNPJ", name: "cpfcnpj", type: "text" },
              { label: "Nome", name: "name", type: "text" },
              { label: "Categoria", name: "category", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Foto (URL)", name: "image_url", type: "url" },
              { label: "LinkedIn", name: "linkedin_url", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={String(form[name as keyof typeof form] || '')}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            ))}
          </div>

          {[
            { label: "Pesquisa Atual", name: "research" },
            { label: "Proficiências", name: "proficiencies" },
            { label: "Premiações", name: "awards" },
            { label: "Formações", name: "education" },
            { label: "Biografia", name: "bio" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
              <textarea
                name={name}
                rows={3}
                value={String(form[name as keyof typeof form] || '')}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          ))}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={handleCloseDialog}
              className="px-5 py-2.5 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all duration-200 flex items-center"
            >
              {isEditing ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
              {isEditing ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    );
  };
{'Projetos'}
const ProjectsForm = () => {
  const [form, setForm] = useState({
    nome_project: selectedProjects?.nome_project || '',
    key_feature: selectedProjects?.key_feature || '',
    image_url: selectedProjects?.image_url || '',
    descri: selectedProjects?.descri || '' ,
    
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `http://localhost:3001/projects/${selectedProjects?.id}` : 'http://localhost:3001/projects';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    fetchProjects();
    handleCloseDialogP();
  };

  return (
    <div className="w-full max-w-3xl bg-gray-900 rounded-xl shadow-xl p-8 space-y-6 overflow-y-auto max-h-[80vh]">
      <h2 className="text-2xl font-bold text-white text-center">
        {isEditing ? 'Editar Pesquisador' : 'Cadastrar Pesquisador'}
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "URL da Imagem", name: "image_url", type: "text" },
          { label: "Nome", name: "nome_project", type: "text" }, // Fixed name
            { label: "Descrição", name: "descri", type: "text" },
            { label: "Características", name: "key_feature", type: "text[]" }, 
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name as keyof typeof form]}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        ))}
      </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={handleCloseDialogP}
            className="px-5 py-2.5 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-all duration-200 flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all duration-200 flex items-center"
          >
            {isEditing ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
            {isEditing ? 'Editar Projeto' : 'Cadastrar Projeto'}
          </button>
        </div>
      </form>
    </div>
  );
};
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h1 className="text-2xl font-bold text-white">Painel de Administração</h1>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>

            <Tabs defaultValue="members" className="w-full">
              <TabsList className="mb-8 bg-gray-700 p-1 rounded-lg">
                <TabsTrigger value="members" className="text-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md transition-all">
                  Pesquisadores
                </TabsTrigger>
                <TabsTrigger value="projects" className="text-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md transition-all">
                  Projetos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="members">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  <h2 className="text-xl font-semibold text-white">Gerenciar Pesquisadores</h2>
                  
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Buscar pesquisadores..."
                        className="pl-10 pr-4 py-2.5 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <button
                      onClick={() => handleOpenDialog('member', null)}
                      className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Pesquisador
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Categoria</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-750 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                                  <img
                                    src={member.image_url}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { 
                                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=N/A';
                                    }}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">{member.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-blue-200">
                                {member.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{member.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleOpenDialog('member', member)}
                                  className="p-1.5 bg-blue-900 text-blue-200 rounded-lg hover:bg-blue-800 transition-colors"
                                  title="Editar"
                                >
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteMember(Number(member.id))} 
                                  className="p-1.5 bg-red-900 text-red-200 rounded-lg hover:bg-red-800 transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                            {searchTerm 
                              ? "Nenhum pesquisador encontrado para esta busca." 
                              : "Nenhum pesquisador cadastrado ainda."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="projects">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                  <h2 className="text-xl font-semibold text-white">Gerenciar Projetos</h2>
                  
                  <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-64">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Buscar projetoss..."
                        className="pl-10 pr-4 py-2.5 w-full bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <button
                      onClick={() => handleOpenDialogP('projects', null)}
                      className="flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Projeto
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-700">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Feature</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                      {filteredProjects.length > 0 ? (
                        filteredProjects.map((project) => (
                          <tr key={project.id} className="hover:bg-gray-750 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-600 flex-shrink-0">
                                  <img
                                    src={project.image_url}
                                    alt={project.nome_project}
                                    className="h-full w-full object-cover"
                                    onError={(e) => { 
                                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=N/A';
                                    }}
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">{project.nome_project}</div>
                                </div>
                              </div>
                            </td>
                            
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <button
                                  onClick={() => handleOpenDialogP('projects', project)}
                                  className="p-1.5 bg-blue-900 text-blue-200 rounded-lg hover:bg-blue-800 transition-colors"
                                  title="Editar"
                                >
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProjects(Number(project.id))} 
                                  className="p-1.5 bg-red-900 text-red-200 rounded-lg hover:bg-red-800 transition-colors"
                                  title="Excluir"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                            {searchTerm 
                              ? "Nenhum projeto encontrado para esta busca." 
                              : "Nenhum projeto cadastrado ainda."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white p-0 max-w-4xl">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-xl font-bold text-blue-400">
              {isEditing ? 'Editar' : 'Novo'} {dialogType === 'member' ? 'Pesquisador' : 'Artigo'}
            </DialogTitle>
            <button
              onClick={handleCloseDialog}
              className="absolute right-4 top-4 p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </button>
          </DialogHeader>
          {dialogType === 'member' ? <MemberForm /> : null}
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpenP} onOpenChange={setIsDialogOpenP}>
        <DialogContent className="bg-gray-900 border-gray-700 text-white p-0 max-w-4xl">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-xl font-bold text-blue-400">
              {isEditing ? 'Editar' : 'Novo'} {dialogTypeP === 'projects' ? 'Projetos' : 'Artigo'}
            </DialogTitle>
            <button
              onClick={handleCloseDialogP}
              className="absolute right-4 top-4 p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </button>
          </DialogHeader>
          {dialogTypeP === 'projects' ? <ProjectsForm /> : null}
        </DialogContent>
      </Dialog>
    </div>

    
  );
}