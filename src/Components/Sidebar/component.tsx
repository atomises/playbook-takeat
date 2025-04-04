import React, { useState } from 'react';

import './style.css';
import { cn } from '../../lib/utils.ts';

import { NavLink, useNavigate } from 'react-router-dom';

// eslint-disable-next-line
import {
    BookOpen, Award, Users, Shield, ChevronLeft, ChevronRight,
    ChevronDown, ChevronUp, Briefcase, Calendar,
    Home, Info, ShoppingCart, Headphones,
    Coffee, Star,
    Landmark, History,  Lightbulb, BookText, 
    LineChart, Network,  FileImage, HardDrive, Crown,
    DoorOpen
  } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    'sobre': false,
    'benefícios': false,
    'para seu trabalho': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navItems: NavItem[] = [
    { title: 'Home', path: '/', icon: <Home size={20}/>},
    { title: 'Membros', path:'/', icon: <Users size={20}/>},
    { title: 'Sobre', icon: <Info size={20}/>, children: [
      { title: 'Nosso Produto',  path: '/about/ourProduct', icon: <Star size={18} />}, 
      { title: 'Nossa História', path: '/about/ourHistory', icon: <History size={18} />},
      { title: 'Nossa Cultura',  path: '/about/ourCulture', icon: <Lightbulb size={18}/>},
      { title: 'Parceiros',      path: '/about/partners', icon: <Landmark size={18}/>},
      { title: 'Dicionario da Empresa', path: '/about/dictionary', icon: <BookText size={18}/>},
      { title: 'Estratégia 2025', path: '/about/strategies', icon: <LineChart size={18}/>},
      { title: 'Quadro de Organização', path: '/about/orgchart', icon: < Network/>}
    ]
    },
    { title: 'Benefícios', icon: <Award size={20}/>, children: [
        { title: 'Vale Refeição', path: '/', icon: <Coffee size={18}/>},
      ]
    },
    { title: 'Para seu Trabalho', icon: <Briefcase size={20}/>, children: [
      { title: 'Trilhas', path: '/', icon: <BookOpen size={18}/>},
      { title: 'Tom de Voz', path: '/', icon: <Headphones size={18}/>},
      { title: 'Compras', path: '/', icon: <ShoppingCart size={18}/>},
      { title: 'Salas', path: '/', icon: <DoorOpen size={18}/>},
      { title: 'Escritório e Regras', path: '/', icon: <FileImage size={18}/>},
      { title: 'Calendário e Eventos', path: '/', icon: <Calendar size={18}/>},
      { title: 'Políticas', path: '/', icon: <Shield size={18}/>},
      { title: 'Suporte de Equipamentos', path: '/', icon: <HardDrive size={18}/>},
      { title: 'Portal de Líderes', path: '/', icon: <Crown size={18}/>}, 
    ]
    },
    ];

  const renderNavItem = (item: NavItem, index: number) => {
    const isExpanded = expandedSections[item.title.toLowerCase()];

    if (!item.children) {
      const handleGoToPath = () => navigate(item.path || '/');

    return (
        <li key={`${item.title}-${index}`} className="nav-item">
          <button
            onClick={handleGoToPath}
            className={cn("nav-button", !isOpen && "nav-button-collapsed")}
          >
            <span className="nav-icon">{item.icon}</span>
            {isOpen && <span className="nav-title">{item.title}</span>}
          </button>
        </li>
    );
  };

    return (
      <li key={`${item.title}-${index}`} className="nav-item">
        <button
          onClick={() => item.children && toggleSection(item.title.toLowerCase())}
          className={cn("nav-button", !isOpen && "nav-button-collapsed")}
        >
          <span className="nav-icon">{item.icon}</span>

          {isOpen && (
            <>
              <span className="nav-title">{item.title}</span>
              {item.children && (
                <span className="nav-chevron">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              )}
            </>
          )}
        </button>

        {isOpen && isExpanded && item.children && (
          <ul className="nav-submenu">
            {item.children.map((child, childIndex) => (
              <li key={`${child.title}-${childIndex}`}>
                {child.path ? (
                  <NavLink
                    to={child.path}
                    className={({ isActive }) =>
                      cn("nav-sublink", isActive ? "nav-sublink-active" : "nav-sublink-hover")
                    }
                  >
                    <span className="nav-icon">{child.icon}</span>
                    <span className="nav-subtitle">{child.title}</span>
                  </NavLink>
                ) : (
                  <div className="nav-sublink-static">
                    <span className="nav-icon">{child.icon}</span>
                    <span className="nav-subtitle">{child.title}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  };

    return(
      <aside className={cn("sidebar", isOpen ? "sidebar-expanded" : "sidebar-collapsed")}>
        <div className="sidebar-container">

          <div className="sidebar-header">
            <h1 className={cn("sidebar-title", isOpen ? "sidebar-title-visible" : "sidebar-title-hidden")}>Takeat Handbook</h1>
            <button onClick={toggleSidebar} className="sidebar-toggle" aria-label={isOpen ? "Close sidebar" : "Open sidebar"}>{isOpen ? <ChevronLeft size={20} className='chevronText'/> : <ChevronRight size={20} className='chevronText'/>}</button>
          </div>

          <nav className="sidebar-nav">
            <ul className="sidebar-list">{navItems.map((item, index) => renderNavItem(item, index))}</ul>
          </nav>

          <div className={cn("sidebar-footer", isOpen ? "sidebar-footer-visible" : "sidebar-footer-hidden")}>
            <p className="sidebar-footer-text">© {new Date().getFullYear()} Takeat Inc.</p>
          </div>

        </div>
      </aside>
    );
  };


export default Sidebar;