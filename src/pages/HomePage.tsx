import React, { useState } from 'react'
import { Glasses, Search, Menu, User, Calendar, Clock, ArrowRight, X, Youtube, Mail, Facebook, Twitter, Instagram, Phone, MapPin, Brain, GraduationCap, Globe2 } from 'lucide-react'
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider  from "react-slick";
import { AnimatePresence, motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';


export function HomePage() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = React.useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);    
    const images = [
      "img/GRUPO.jpg",
      "img/Wallpaper_B.png",
      "img/img4.webp",
      "img/IEE.webp",
    ];
  const renderPage = () => {
    switch (currentPage) {
       
      default:
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gray-50"
          >
            

           {/* Hero Section */}
           
                       <div className="relative overflow-hidden min-h-[600px]" >
                        
                         <Slider
                           dots={true}
                           infinite={true}
                           speed={500}
                           slidesToShow={1}
                           slidesToScroll={1}
                           autoplay={true}
                           autoplaySpeed={3000}
                           fade={true}
                           className="absolute inset-0 w-full h-full"
                         >
                           {images.map((src, index) => (
                         <div key={index} className="w-full h-[600px] flex justify-center items-center">
                           <img src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                         </div>
                       ))}
                         </Slider>
                         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                         <div className="max-w-7xl mx-auto relative z-10 py-3">
                           <div className="relative pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
                             <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                 <div className="sm:text-center lg:text-left">
                                 <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                   <span className="block xl:inline">Bem-vindo ao</span>{' '}
                                   <span className="block text-white xl:inline">GRVA</span>
                                 </h1>
                                 <p className="mt-3 text-base text-gray-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                   Grupo de Pesquisa em Realidade Virtual e Aumentada
                                 </p>
                                 <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                   <div className="rounded-md shadow">
                                   <Link
                                     to="/members"
                                     className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-900 hover:bg-blue-600 hover:scale-105 transform transition-transform duration-300 md:py-4 md:text-lg md:px-10"
                                   >
                                     Conheça nossos pesquisadores
                                   </Link>
                                   </div>
                                   <div className="mt-3 sm:mt-0 sm:ml-3">
                                   <Link
                                     to="/contact"
                                     className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 hover:scale-105 transform transition-transform duration-300 md:py-4 md:text-lg md:px-10"
                                   >
                                     Entre em contato
                                   </Link>
                                   </div>
                                 </div>
                               </div>
                             </main>
                           </div>
                         </div>
                       </div>
                      {/* Featured Projects Section */}
                        <section className="py-16 bg-gray-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div className="lg:text-center">
                          <p className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-white sm:text-5xl">
                            Projetos em Destaque
                          </p>
                          <p className="mt-4 max-w-3xl text-xl text-gray-400 lg:mx-auto">
                            Conheça alguns dos nossos principais projetos em desenvolvimento e pesquisa.
                          </p>
                          </div>

                          <div className="mt-12">
                          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-10 md:gap-y-12">
                            {/* Project Card 1 */}
                            <div className="relative group">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75 sm:h-80">
                              <img
                              src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2012&q=80"
                              alt="Projeto de Realidade Virtual"
                              className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <h3 className="mt-6 text-sm text-gray-400">
                              <a href="#" className="hover:underline">
                              Projeto
                              </a>
                            </h3>
                            <p className="text-lg font-semibold text-white">Simulador de Operações Offshore</p>
                            </div>

                            {/* Project Card 2 */}
                            <div className="relative group">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75 sm:h-80">
                              <img
                              src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                              alt="Projeto de Realidade Aumentada"
                              className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <h3 className="mt-6 text-sm text-gray-400">
                              <a href="#" className="hover:underline">
                              Projeto
                              </a>
                            </h3>
                            <p className="text-lg font-semibold text-white">Visualização de Dados em RA</p>
                            </div>

                            {/* Project Card 3 */}
                            <div className="relative group">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75 sm:h-80">
                              <img
                              src="https://images.unsplash.com/photo-1617791160505-6f00504e3519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                              alt="Modelagem 3D com Blender"
                              className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <h3 className="mt-6 text-sm text-gray-400">
                              <a href="#" className="hover:underline">
                              Projeto
                              </a>
                            </h3>
                            <p className="text-lg font-semibold text-white">Modelagem 3D com Blender</p>
                            </div>

                            {/* Project Card 4 */}
                            <div className="relative group">
                            <div className="relative h-80 w-full overflow-hidden rounded-lg bg-gray-800 group-hover:opacity-75 sm:h-80">
                              <img
                              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                              alt="Digital Twin e IA"
                              className="h-full w-full object-cover object-center transform transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <h3 className="mt-6 text-sm text-gray-400">
                              <a href="#" className="hover:underline">
                              Projeto
                              </a>
                            </h3>
                            <p className="text-lg font-semibold text-white">Desenvolvimento de IA e Digital Twin</p>
                            </div>
                          </div>
                          </div>
                        </div>
                        </section>                 
              {/* News Carousel Section */}
                 <section className="py-12 bg-gray-900">
                   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                   <h2 className="text-3xl font-extrabold text-white text-center mb-8">Eventos</h2>
                   <Slider
                     dots={true}
                     infinite={true}
                     speed={500}
                     slidesToShow={1}
                     slidesToScroll={1}
                     autoplay={true}
                     autoplaySpeed={4000}
                     className="max-w-5xl mx-auto"
                   >
                     {/* Slide 1 */}
                     <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                     <img
                       src="img/IEE.webp"
                       alt="Notícia 1"
                       className="w-full h-64 object-cover"
                     />
                     <div className="p-6">
                       <h3 className="text-2xl font-bold text-white">Notícia 1</h3>
                       <p className="mt-4 text-gray-400">
                       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                       </p>
                       <a
                       href="#"
                       className="text-blue-400 hover:underline mt-4 inline-block font-medium"
                       >
                       Leia mais
                       </a>
                     </div>
                     </div>
                 
                     {/* Slide 2 */}
                     <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                     <img
                       src="img/sbgames_svr_2024.png"
                       alt="Notícia 2"
                       className="w-full h-64 object-cover"
                     />
                     <div className="p-6">
                       <h3 className="text-2xl font-bold text-white">Notícia 2</h3>
                       <p className="mt-4 text-gray-400">
                       Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.
                       </p>
                       <a
                       href="#"
                       className="text-blue-400 hover:underline mt-4 inline-block font-medium"
                       >
                       Leia mais
                       </a>
                     </div>
                     </div>
                 
                     {/* Slide 3 */}
                     <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                     <img
                       src="img/latinoware.jpeg"
                       alt="Notícia 3"
                       className="w-full h-64 object-cover"
                     />
                     <div className="p-6">
                       <h3 className="text-2xl font-bold text-white">Notícia 3</h3>
                       <p className="mt-4 text-gray-400">
                       Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
                       </p>
                       <a
                       href="#"
                       className="text-blue-400 hover:underline mt-4 inline-block font-medium"
                       >
                       Leia mais
                       </a>
                     </div>
                     </div>
                   </Slider>
                   </div>
                 </section>
                 
                       {/* Footer */}<footer className="bg-gray-800 text-white w-full">
                       <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
                         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start justify-between">
                           
                           {/* Logo and Copyright - EXTREMO ESQUERDO */}
                           <div className="flex flex-col items-start w-full">
                             <div className="mb-4 self-start">
                               <img src="img/LogoGRVA_secundaria_fundo_escuro_desc.svg" className="h-20 w-auto" alt="Logo GRVA" />
                             </div>
                           </div>
                 
                           {/* Quick Links */}
                             <div>
                             <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
                             <ul className="space-y-2">
                               <li>
                               <Link 
                                 to="/about"
                                 className="text-white hover:text-gray-300 transition"
                               >
                                 Sobre
                               </Link>
                               </li>
                               <li>
                               <Link 
                                 to="/contact"
                                 className="text-white hover:text-gray-300 transition"
                               >
                                 Contato
                               </Link>
                               </li>
                               <li>
                               <a 
                                 href="#" 
                                 className="text-white hover:text-gray-300 transition"
                               >
                                 Política de Privacidade
                               </a>
                               </li>
                               <li>
                               <a 
                                 href="#" 
                                 className="text-white hover:text-gray-300 transition"
                               >
                                 Termos de Uso
                               </a>
                               </li>
                             </ul>
                             </div>
                 
                           {/* Social Media */}
                             <div>
                               <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
                               <div className="flex flex-col space-y-4">
                                 {/* Redes Sociais */}
                                 <div className="flex space-x-4">
                                   <a href="#" className="text-white hover:text-white transition">
                                     <Youtube className="h-6 w-6" />
                                   </a>
                                   <a href="#" className="text-white hover:text-white transition">
                                     <Facebook className="h-6 w-6" />
                                   </a>
                                   <a href="#" className="text-white hover:text-white transition">
                                     <Twitter className="h-6 w-6" />
                                   </a>
                                   <a href="#" className="text-white hover:text-white transition">
                                     <Instagram className="h-6 w-6" />
                                   </a>
                                 </div>
                 
                                 {/* E-mail */}
                                 <div className="flex items-center space-x-2">
                                   <Mail className="h-5 w-5 text-white" />
                                   <span className="text-white">grvaufu@gmail.com</span>
                                 </div>
                 
                                 {/* Telefone */}
                                 <div className="flex items-center space-x-2">
                                   <Phone className="h-5 w-5 text-white" />
                                   <span className="text-white">(34) 3239-4000</span>
                                 </div>
                               </div>
                             </div>
                 
                           {/* Mapa - EXTREMO DIREITO */}
                           <div className="w-full flex flex-col items-end">
                             <iframe 
                               className="w-full max-w-[300px] h-[200px] rounded-lg shadow-lg" 
                               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.2748834457443!2d-48.26172178883213!3d-18.919223207557796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94a445b55d53092f%3A0x2704333d3b0c784e!2sGrupo%20de%20Realidade%20Virtual%20e%20Aumentada%20(GRVA%20-%20UFU)!5e0!3m2!1spt-PT!2sbr!4v1743617444211!5m2!1spt-PT!2sbr"  
                               loading="lazy"
                             ></iframe>
                             <div className="mt-4 text-sm text-white text-right">
                               <p>Av. João Naves de Ávila, 212</p>
                               <p>Uberlândia - MG, 38408-100</p>
                             </div>
                           </div>
                         </div>
                       </div>
                     </footer>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      {renderPage()}
    </AnimatePresence>
  );
}

