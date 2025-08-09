import React from "react";
import { FiHeart, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#1a0f0a] border-t border-[#482c23] mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CineIndex Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-white text-xl font-bold mb-4">CineIndex</h3>
            <p className="text-[#c9a092] text-sm leading-relaxed">
            Your ultimate platform to discover, explore, and enjoy the world of cinema. Find the best movies, series, and audiovisual content.
            </p>
          </div>

          {/* APIs Credits */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Powered by</h4>
            <div className="space-y-3">
              <div className="bg-[#2a1a15] rounded-lg p-3 border border-[#482c23]">
                <h5 className="text-[#ee5c2b] font-medium text-sm">TMDB API</h5>
                <p className="text-[#c9a092] text-xs mt-1">
                  The Movie Database - Datos de películas, series y contenido multimedia
                </p>
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#ee5c2b] text-xs hover:underline inline-block mt-2"
                >
                  Visitar TMDB →
                </a>
              </div>
            </div>
          </div>

          {/* Collaborators */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold mb-4">Developed by</h4>
            <div className="space-y-4">
              <div className="bg-[#2a1a15] rounded-lg p-4 border border-[#482c23]">
                <h5 className="text-[#ee5c2b] font-medium">Cristian Martinez</h5>
                <p className="text-[#c9a092] text-xs mt-1">Full Stack Developer</p>
                <div className="flex justify-center md:justify-start gap-2 mt-3">
                  <a 
                    href="https://github.com/refmcris" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c9a092] hover:text-[#ee5c2b] transition-colors"
                  >
                    <FiGithub size={16} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/cristian-martinez-40a203270/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c9a092] hover:text-[#ee5c2b] transition-colors"
                  >
                    <FiLinkedin size={16} />
                  </a>
                  <a 
                    href="mailto:cristian@example.com"
                    className="text-[#c9a092] hover:text-[#ee5c2b] transition-colors"
                  >
                    <FiMail size={16} />
                  </a>
                </div>
              </div>

              <div className="bg-[#2a1a15] rounded-lg p-4 border border-[#482c23]">
                <h5 className="text-[#ee5c2b] font-medium">Nicolas Peña</h5>
                <p className="text-[#c9a092] text-xs mt-1">Full Stack Developer</p>
                <div className="flex justify-center md:justify-start gap-2 mt-3">
                  <a 
                    href="https://github.com/nicotitopp" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c9a092] hover:text-[#ee5c2b] transition-colors"
                  >
                    <FiGithub size={16} />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/dilan-nicolas-pe%C3%B1a-866775254/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#c9a092] hover:text-[#ee5c2b] transition-colors"
                  >
                    <FiLinkedin size={16} />
                  </a>
                  <a 
                    href="mailto:nicolas@example.com"
                    className="text-[#c9a092] hover:text-[#ee5c2b] transition-colors"
                  >
                    <FiMail size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#482c23] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-[#c9a092] text-sm">
                © 2024 CineIndex. Todos los derechos reservados.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-[#c9a092] text-sm">
              <span>Hecho con</span>
              <FiHeart className="text-[#ee5c2b] animate-pulse" size={14} />
              <span>por Cristian & Nicolas</span>
            </div>

            <div className="flex gap-4 text-[#c9a092] text-sm">
              <a href="#" className="hover:text-[#ee5c2b] transition-colors">Privacidad</a>
              <a href="#" className="hover:text-[#ee5c2b] transition-colors">Términos</a>
              <a href="#" className="hover:text-[#ee5c2b] transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
