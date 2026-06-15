export type Highlight = {
  title: string;
  description: string;
  tags: string[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  pitch: string;
  highlights: Highlight[];
};

export const experiences: Experience[] = [
  {
    id: "fnac-darty",
    company: "Fnac Darty",
    role: "Développeur Front-End Senior",
    type: "Freelance",
    startDate: "Octobre 2021",
    endDate: "Juillet 2026",
    location: "Ivry-sur-Seine",
    pitch:
      "Mission longue durée sur fnac.com, site e-commerce leader en France, sur les pages les plus visitées : fiche article, homepage, sous-homes, résultats de recherche (~100 000 vues/jour sur les résultats de recherche, ~50 000 sur la homepage). Stack : ASP.NET/Razor + JavaScript ES6+/Web Components on-prem, migration progressive vers une architecture cloud Azure (micro-frontends server-side).",
    highlights: [
      {
        title: "Librairie de Web Components internes",
        description:
          "Création et maintenance d'une librairie NPM interne de 20 à 30 composants UI en Custom Elements natifs, consommée par 3 équipes front. Migration depuis une architecture de composants propriétaires vers la spec Web Components native. Création de packages partagés (design tokens SCSS, configs ESLint/Babel communes) — socle d'un Design System.",
        tags: ["Web Components", "Custom Elements", "NPM", "Design Tokens", "SCSS", "ESLint"],
      },
      {
        title: "Migration cloud (M2C)",
        description:
          "Migration des strates Home/Sous-homes vers un framework MFE server-side (fragments UI, tag helpers Razor, pipeline Kafka/Cosmos DB), migration des templates Liquid vers CSHTML, migration CSS Less → SCSS.",
        tags: ["Micro-frontends", "Azure", "Razor/CSHTML", "Kafka", "Cosmos DB", "SCSS"],
      },
      {
        title: "Refonte de SMILE — CMS interne",
        description:
          "Conception des maquettes Figma en autonomie et refonte technique complète du front, déployé en production et utilisé par ~50 éditeurs sur 8 marchés (FR, BE-FR, BE-NL, CH-FR, CH-DE, ES, PT, Fnac Pro).",
        tags: ["Figma", "CMS", "JavaScript", "8 marchés", "50 éditeurs"],
      },
      {
        title: "Kamino — Intégration publicitaire",
        description:
          "Intégration de 7 formats publicitaires on-site (vidéo, display, natif) desktop/mobile, avec tracking analytique complet.",
        tags: ["JavaScript", "Publicité display", "Analytics", "Responsive"],
      },
      {
        title: "Arrow — Marketplace seller",
        description:
          "Intégration front des informations vendeur marketplace sur toutes les surfaces : fiche article, listes, mini-FA, buybox.",
        tags: ["JavaScript", "Web Components", "Marketplace", "Razor"],
      },
      {
        title: "Autres chantiers",
        description:
          "Conformité DSA, optimisation WebPerf (Core Web Vitals), SEO technique, refonte fiche article 2→3 colonnes.",
        tags: ["WebPerf", "Core Web Vitals", "SEO", "DSA", "A/B Testing"],
      },
    ],
  },
  {
    id: "42-lisboa",
    image: "/img/42Lisboa.png",
    imageAlt:
      "Julien Lange encadrant une piscine à la 42 Lisboa — étudiants sur iMacs dans l'open space",
    imageCaption: "42 Lisboa, 2020 — encadrement d'une piscine",
    company: "42 Lisboa",
    role: "Ingénieur Système & Encadrant Pédagogique",
    type: "CDI",
    startDate: "Septembre 2020",
    endDate: "Juillet 2021",
    location: "Lisbonne, Portugal",
    pitch:
      "Recruté en tant qu'ancien élève pour l'ouverture de l'antenne de l'école 42 à Lisbonne. Rôle hybride : infrastructure technique et pédagogie. Environnement de travail entièrement en anglais.",
    highlights: [
      {
        title: "Infrastructure & DevOps",
        description:
          "Mise en place de l'infrastructure (VMware, Ansible) : examens, moulinette de correction automatique, sessions LDAP sur iMacs. Maintenance des services, résolution d'incidents sur les sessions étudiants.",
        tags: ["VMware", "Ansible", "LDAP", "Linux", "DevOps"],
      },
      {
        title: "Site e-commerce Next.js",
        description:
          "Développement d'un site e-commerce pour le merchandising de l'école : catalogue produits, authentification OAuth via l'API officielle de 42, gestion des commandes.",
        tags: ["Next.js", "OAuth", "API 42", "E-commerce", "Node.js"],
      },
      {
        title: "Pédagogie",
        description:
          "Rôle pédagogique pendant les « piscines » de l'école : code review de projets en C, accompagnement des étudiants.",
        tags: ["C", "Code Review", "Pédagogie", "École 42"],
      },
    ],
  },
  {
    id: "xfab",
    image: "/img/xfab.png",
    imageAlt:
      "Salle blanche X-FAB — ingénieurs en combinaison stérile devant des équipements de fabrication de semi-conducteurs",
    imageCaption: "Environnement de fabrication X-FAB — industrie des semi-conducteurs",
    company: "X-FAB",
    role: "Développeur C, Systèmes Industriels",
    type: "Freelance",
    startDate: "Mars 2020",
    endDate: "Septembre 2020",
    location: "Ormoy",
    pitch:
      "Développement en C d'un programme de communication avec des machines industrielles via la norme SECS/GEM (industrie des semi-conducteurs), déclenchement d'actions et récupération de données de production.",
    highlights: [
      {
        title: "Communication SECS/GEM",
        description:
          "Implémentation d'un programme de communication conforme à la norme SECS/GEM pour piloter et interroger des équipements de fabrication de semi-conducteurs.",
        tags: ["C", "SECS/GEM", "Systèmes industriels", "Semi-conducteurs"],
      },
    ],
  },
  {
    id: "societe-generale",
    company: "Société Générale",
    role: "Développeur JS/Python, Lab Innovation",
    type: "Stage",
    startDate: "Avril 2018",
    endDate: "Novembre 2018",
    location: "Paris",
    pitch:
      "Développement de l'interface web et des cas d'usage pour le robot Pepper (Softbank Robotics), mis en production dans les agences bancaires. Développement de microservices pour le projet Cognitive Services.",
    highlights: [
      {
        title: "Robot Pepper (Softbank Robotics)",
        description:
          "Interface web et cas d'usage pour le robot conversationnel Pepper, déployé en production dans les agences Société Générale.",
        tags: ["JavaScript ES6", "Python", "React", "Redux", "Webpack", "Docker"],
      },
      {
        title: "Microservices — Cognitive Services",
        description:
          "Développement de microservices REST pour le projet d'intelligence artificielle Cognitive Services.",
        tags: ["Python", "Docker", "Swagger", "Microservices", "REST API"],
      },
    ],
  },
];
