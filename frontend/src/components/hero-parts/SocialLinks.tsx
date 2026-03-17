import React from 'react';

interface SocialLink {
  icon: React.ReactNode;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex gap-5">
      {links.map((social, idx) => (
        <a 
          key={idx} 
          href={social.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 md:w-16 md:h-16 glass rounded-[1.25rem] flex items-center justify-center text-text-dim hover:text-white hover:bg-white/5 transition-all transform hover:-translate-y-1.5 border-white/5 shadow-xl group"
        >
          <div className="transition-transform group-hover:scale-110 w-6 h-6 flex items-center justify-center">
            {social.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
