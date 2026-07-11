import type { Lang } from './config';

export interface ExperienceEntry {
  date: string;
  title: string;
  description: string;
  stack: string;
}

export interface ProjectEntry {
  name: string;
  description: string;
  image: string;
  link: string;
}

export interface UiTranslations {
  meta: {
    home: { title: string; description: string; keywords: string };
    experiences: { title: string; description: string; keywords: string };
    author: string;
  };
  nav: {
    home: string;
    letsTalk: string;
    mainAria: string;
  };
  hero: {
    tagline: string;
    headingLine1Before: string;
    headingLine1Accent: string;
    headingLine2Before: string;
    headingLine2Accent: string;
    bio1: string;
    bio2: string;
    bio3: string;
    ctaTalk: string;
    ctaProjects: string;
    ctaExperience: string;
  };
  quote: {
    before: string;
    accent: string;
    after: string;
    author: string;
    photoAlt: string;
  };
  projects: ProjectEntry[];
  instagram: {
    titleBefore: string;
    titleAccent: string;
    photoAlt: string;
  };
  partner: {
    title: string;
    cta: string;
    avatarAlt: string;
  };
  footer: {
    letsTalk: string;
    projects: string;
    instagram: string;
    experience: string;
    copyright: string;
    location: string;
  };
  experiences: {
    from: string;
    backHome: string;
    pretitle: string;
    headingLine1: string;
    headingAccent1: string;
    headingLine2: string;
    headingAccent2: string;
    subtitle: string;
    sectionExperience: string;
    sectionPeriod: string;
    sectionStack: string;
    sectionStackSub: string;
    stackTitleBefore: string;
    stackTitleAccent: string;
    stackSubtitle: string;
    entries: ExperienceEntry[];
  };
  langSwitcher: {
    label: string;
    es: string;
    en: string;
  };
}

const ui = {
  es: {
    meta: {
      home: {
        title: 'Javier Castro — Frontend Developer',
        description: 'Portfolio de Javier Castro Retamal - Desarrollador Frontend y diseñador',
        keywords: 'Portfolio, Javier Castro Retamal, Desarrollador Web, Diseño Web, Frontend',
      },
      experiences: {
        title: 'Experiencia — Javier Castro',
        description: 'Trayectoria profesional de Javier Castro Retamal',
        keywords: 'experiencia, desarrollador, portfolio, IT, data engineer',
      },
      author: 'Javier Castro Retamal',
    },
    nav: {
      home: 'Inicio',
      letsTalk: 'Hablemos',
      mainAria: 'Navegación principal',
    },
    hero: {
      tagline: 'El estudio creativo de Javoru',
      headingLine1Before: 'Construyo la ',
      headingLine1Accent: 'nueva ola,',
      headingLine2Before: 'con ',
      headingLine2Accent: 'diseño audaz.',
      bio1:
        'Soy desarrollador frontend con ojo de diseñador. He construido desde ecommerce completos hasta piezas gráficas, combinando código limpio con un diseño que no pasa desapercibido.',
      bio2:
        'Trabajo de punta a punta: cada proyecto lo diseño y lo desarrollo yo mismo, de la idea al deploy, rápido y sin cortar esquinas.',
      bio3: 'Disponible para proyectos freelance y colaboraciones.',
      ctaTalk: 'Hablemos',
      ctaProjects: 'Ver proyectos',
      ctaExperience: 'Experiencia',
    },
    quote: {
      before: 'Pasé del ',
      accent: 'diseño gráfico',
      after: ' al código para construir la web que siempre quise ver',
      author: 'Javier Castro',
      photoAlt: 'Javier Castro',
    },
    projects: [
      {
        name: 'Chetomi',
        description:
          'Ecommerce completo de comida argentina — diseño y desarrollo en Jumpseller',
        image: '/img/projects/chetomiweb.webp',
        link: 'https://www.chetomi.cl',
      },
      {
        name: 'Mob Psycho 100',
        description:
          'Diseño gráfico de poster con tipografía dinámica y paleta intensa',
        image: '/img/projects/mob.png',
        link: 'https://www.behance.net/gallery/227800757/Poster-Chigeo-Kageyama',
      },
    ],
    instagram: {
      titleBefore: 'Desde mi ',
      titleAccent: 'Instagram',
      photoAlt: 'Foto de Instagram de Javier Castro',
    },
    partner: {
      title: 'Trabajemos juntos',
      cta: 'Escríbele a Javier',
      avatarAlt: 'Javier',
    },
    footer: {
      letsTalk: 'Hablemos',
      projects: 'Proyectos',
      instagram: 'Instagram',
      experience: 'Experiencia',
      copyright: 'Javoru — Javier Castro',
      location: 'Chile',
    },
    experiences: {
      from: 'From: Chile',
      backHome: '← Volver al inicio',
      pretitle: 'Javier Castro — Trayectoria',
      headingLine1: 'De soporte a ',
      headingAccent1: 'datos,',
      headingLine2: 'de datos a ',
      headingAccent2: 'frontend.',
      subtitle:
        'Mi camino en tecnología — de soporte técnico a ingeniería de datos y desarrollo frontend.',
      sectionExperience: 'Experiencia',
      sectionPeriod: '2015 — Hoy',
      sectionStack: 'Stack técnico',
      sectionStackSub: 'Herramientas de uso diario',
      stackTitleBefore: 'Mi ',
      stackTitleAccent: 'stack',
      stackSubtitle: 'Tecnologías con las que trabajo y diseño.',
      entries: [
        {
          date: 'Actualmente',
          title: 'Jefe de Soporte IT',
          description:
            'Encargado del soporte técnico e implementación de una solución integral de call center (CRM web + Telefonía IP). Capacito usuarios, coordino reuniones y lidero la puesta en marcha de entornos productivos. Desarrollo procedimientos almacenados en Transact-SQL para generar reportes personalizados, y realizo configuraciones avanzadas de Asterisk (SIP, extensiones, reglas de marcado).',
          stack: 'JavaScript · Transact-SQL · MS SQL Server · Asterisk',
        },
        {
          date: 'Enero 2020 — Noviembre 2023',
          title: 'Data Engineer para LATAM',
          description:
            'Diseñé y mantuve pipelines de datos para poblar el Data Lake de Google Cloud con información proveniente de múltiples orígenes como Oracle, SQL Server, archivos planos y Excel. Usé Git y Bitbucket para versionar scripts y desplegar DAGs en Apache Airflow, orquestando flujos complejos hacia BigQuery mediante Dataflow. Automaticé procesos clave relacionados con reportes de vuelo, bitácoras y ajustes contables.',
          stack: 'GCP · BigQuery · Airflow · Dataflow · Git',
        },
        {
          date: 'Marzo 2015 — Agosto 2019',
          title: 'Soporte Técnico IT',
          description:
            'Atención de incidentes y solicitudes de soporte técnico de usuarios corporativos. Instalación, configuración y mantenimiento de software y hardware. Participé en proyectos de mejora de sistemas y capacitación a usuarios finales.',
          stack: 'Hardware · Software · Redes',
        },
      ],
    },
    langSwitcher: {
      label: 'Idioma',
      es: 'ES',
      en: 'EN',
    },
  },
  en: {
    meta: {
      home: {
        title: 'Javier Castro — Frontend Developer',
        description: 'Portfolio of Javier Castro Retamal - Frontend Developer and designer',
        keywords: 'Portfolio, Javier Castro Retamal, Web Developer, Web Design, Frontend',
      },
      experiences: {
        title: 'Experience — Javier Castro',
        description: 'Professional career of Javier Castro Retamal',
        keywords: 'experience, developer, portfolio, IT, data engineer',
      },
      author: 'Javier Castro Retamal',
    },
    nav: {
      home: 'Home',
      letsTalk: "Let's talk",
      mainAria: 'Main navigation',
    },
    hero: {
      tagline: "Javoru's creative studio",
      headingLine1Before: 'I build the ',
      headingLine1Accent: 'new wave,',
      headingLine2Before: 'with ',
      headingLine2Accent: 'bold design.',
      bio1:
        "I'm a frontend developer with a designer's eye. I've built everything from full ecommerce sites to graphic pieces, combining clean code with design that doesn't go unnoticed.",
      bio2:
        'I work end to end: I design and develop every project myself, from idea to deploy, fast and without cutting corners.',
      bio3: 'Available for freelance projects and collaborations.',
      ctaTalk: "Let's talk",
      ctaProjects: 'View projects',
      ctaExperience: 'Experience',
    },
    quote: {
      before: 'I went from ',
      accent: 'graphic design',
      after: ' to code to build the web I always wanted to see',
      author: 'Javier Castro',
      photoAlt: 'Javier Castro',
    },
    projects: [
      {
        name: 'Chetomi',
        description:
          'Full ecommerce for Argentine food — design and development on Jumpseller',
        image: '/img/projects/chetomiweb.webp',
        link: 'https://www.chetomi.cl',
      },
      {
        name: 'Mob Psycho 100',
        description:
          'Graphic design poster with dynamic typography and intense palette',
        image: '/img/projects/mob.png',
        link: 'https://www.behance.net/gallery/227800757/Poster-Chigeo-Kageyama',
      },
    ],
    instagram: {
      titleBefore: 'From my ',
      titleAccent: 'Instagram',
      photoAlt: "Javier Castro's Instagram photo",
    },
    partner: {
      title: "Let's work together",
      cta: 'Message Javier',
      avatarAlt: 'Javier',
    },
    footer: {
      letsTalk: "Let's talk",
      projects: 'Projects',
      instagram: 'Instagram',
      experience: 'Experience',
      copyright: 'Javoru — Javier Castro',
      location: 'Chile',
    },
    experiences: {
      from: 'From: Chile',
      backHome: '← Back to home',
      pretitle: 'Javier Castro — Career',
      headingLine1: 'From support to ',
      headingAccent1: 'data,',
      headingLine2: 'from data to ',
      headingAccent2: 'frontend.',
      subtitle:
        'My path in technology — from technical support to data engineering and frontend development.',
      sectionExperience: 'Experience',
      sectionPeriod: '2015 — Present',
      sectionStack: 'Technical stack',
      sectionStackSub: 'Everyday tools',
      stackTitleBefore: 'My ',
      stackTitleAccent: 'stack',
      stackSubtitle: 'Technologies I work and design with.',
      entries: [
        {
          date: 'Currently',
          title: 'IT Support Lead',
          description:
            'In charge of technical support and implementation of a comprehensive call center solution (web CRM + IP Telephony). I train users, coordinate meetings and lead the rollout of production environments. I develop stored procedures in Transact-SQL to generate custom reports, and perform advanced Asterisk configurations (SIP, extensions, dial rules).',
          stack: 'JavaScript · Transact-SQL · MS SQL Server · Asterisk',
        },
        {
          date: 'January 2020 — November 2023',
          title: 'Data Engineer for LATAM',
          description:
            'I designed and maintained data pipelines to populate the Google Cloud Data Lake with information from multiple sources such as Oracle, SQL Server, flat files and Excel. I used Git and Bitbucket to version scripts and deploy DAGs in Apache Airflow, orchestrating complex flows to BigQuery via Dataflow. I automated key processes related to flight reports, logbooks and accounting adjustments.',
          stack: 'GCP · BigQuery · Airflow · Dataflow · Git',
        },
        {
          date: 'March 2015 — August 2019',
          title: 'IT Technical Support',
          description:
            'Handling incidents and technical support requests from corporate users. Installation, configuration and maintenance of software and hardware. I participated in system improvement projects and end-user training.',
          stack: 'Hardware · Software · Networks',
        },
      ],
    },
    langSwitcher: {
      label: 'Language',
      es: 'ES',
      en: 'EN',
    },
  },
} as const satisfies Record<Lang, UiTranslations>;

export default ui;
