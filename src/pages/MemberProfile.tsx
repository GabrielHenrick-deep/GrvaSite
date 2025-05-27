import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Linkedin, BookOpen, Award, ExternalLink } from 'lucide-react';
import { Member, Publication } from '../types/member';

export function MemberProfile() {
  const { id } = useParams();
  
  const navigate = useNavigate();
  const [member, setMember] = useState<Member | null>(null);
  
  useEffect(() => {
    if (!id) return;
  
    fetch(`http://10.0.224.8:3001/members/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Membro recebido:', data);
        setMember({
          ...data,
          // Faz split nas strings separadas por vírgula
          proficiencias: Array.isArray(data.proficiencias)
            ? data.proficiencias
            : typeof data.proficiencias === 'string'
            ? data.proficiencias.split(',').map((s: string) => s.trim())
            : [],
          education: typeof data.education === 'string'
            ? data.education.split(',').map((s: string) => s.trim())
            : [],
          awards: typeof data.awards === 'string'
            ? data.awards.split(',').map((s: string) => s.trim())
            : [],
          publications: Array.isArray(data.publications)
            ? data.publications
            : [] as Publication[],
        });
      })
      .catch(err => console.error('Erro ao buscar membro:', err));
  }, [id]);
  

  

  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/members')}
          className="flex items-center text-gray-400 hover:text-gray-200 mb-8"
        >
          <ArrowLeft className="mr-2" />
          Voltar para lista de membros
        </button>

        {/* Profile Header */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={member?.image}
                alt={member?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex flex-wrap items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-100">{member?.name}</h1>
                  <span className="inline-block px-3 py-1 mt-2 text-sm font-medium text-white bg-blue-600 rounded-full">
                    {member?.category}
                  </span>
                </div>
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <a
                    href={`mailto:${member?.email}`}
                    className="text-gray-400 hover:text-gray-200"
                    title="Email"
                  >
                    <Mail className="h-5 w-5" />
                  </a>
                  {member?.linkedin && (
                    <a
                      href={member?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-200"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
              <p className="mt-4 text-gray-400">{member?.bio}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Research and Skills */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Pesquisa Atual</h2>
            <p className="text-gray-400 mb-6">{member?.research}</p>
            
            <h3 className="text-lg font-semibold text-gray-100 mb-3">Proficiências</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(member?.proficiencias) && member.proficiencias.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* education */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">Formação Acadêmica</h2>
            <ul className="space-y-3">
              {Array.isArray(member?.education) && member.education.map((edu: string, index: number) => (
                <li key={index} className="text-gray-400">
                  • {edu}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Publications */}
        {Array.isArray(member?.publication) && member.publication.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-100">Publicações</h2>
            </div>
            <div className="space-y-6">
              {member.publication.map((pub, index) => (
                <div key={index} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg text-gray-100 mb-2">{pub.title}</h3>
                  <p className="text-gray-400">
                    {pub.authors.join(', ')}
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    {pub.journal}, {pub.year}
                  </p>
                  {pub.doi && (
                    <a
                      href={`https://doi.org/${pub.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-600 mt-2 text-sm"
                    >
                      Ver publicação
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {member?.awards && member.awards.length > 0 && (
  <div className="mt-8 bg-gray-800 rounded-lg shadow-lg p-6">
    <div className="flex items-center mb-4">
      <Award className="h-6 w-6 text-yellow-500 mr-2" />
      <h2 className="text-xl font-semibold text-gray-100">Premiações</h2>
    </div>
    <ul className="space-y-3 list-disc list-inside text-gray-400">
      {Array.isArray(member.awards) && member.awards.map((award: string, index: number) => (
        <li key={index}>{award}</li>
      ))}
    </ul>
  </div>
)}

    </div>
  </div>
);
}