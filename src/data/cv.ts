// Single source of truth for everything the site says about Dmytro.
// Updating the site means editing this file: the sections render whatever
// lives here, and `src/data/cv.test.ts` guards the shape of the data.

export interface Profile {
  name: string;
  role: string;
  location: string;
  linkedin: string;
  github: string;
  /** First role in the employment history, as `YYYY-MM` — drives yearsOfExperience(). */
  careerStart: string;
  /** Short text used for the meta description and the About section teaser. */
  description: string;
  /** Longer text rendered in the About section. */
  summary: string;
}

export interface Experience {
  company: string;
  companyUrl?: string;
  role: string;
  /** ISO `YYYY-MM`. */
  start: string;
  /** ISO `YYYY-MM`, or undefined when the role is current. */
  end?: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface LanguageSkill {
  name: string;
  level: string;
}

export interface Education {
  period: string;
  school: string;
  degree: string;
}

export interface Project {
  name: string;
  description: string;
  url: string;
  sourceUrl?: string;
  tech: string[];
}

export const profile: Profile = {
  name: 'Dmytro Ivanchyshyn',
  role: 'Senior .NET Software Engineer / Tech Lead',
  location: 'Oslo, Norway',
  linkedin: 'https://www.linkedin.com/in/dmytro-ivanchyshyn-830444b1/',
  github: 'https://github.com/divanchyshyn',
  careerStart: '2013-11',
  description:
    'Dmytro Ivanchyshyn — Senior .NET Software Engineer / Tech Lead in Oslo, Norway. 13 years across .NET, Azure, Kubernetes and event-driven architecture, now building cloud platforms for smart-home security.',
  summary:
    'I am a .NET engineer with 13 years behind cloud-native platforms — from event-driven microservices in finance and energy trading to smart-home security at European scale. I care about clear service boundaries, event-driven architecture and teams that ship with confidence: strong testing strategies, real observability and honest code reviews. Currently at Sector Alarm in Oslo, building cloud services on a fully Azure stack with Kubernetes — and weaving agentic AI into the everyday engineering loop with Claude Code and LLM-assisted workflows. Before that I led the Flex Optimization Team at Eneco in Rotterdam, delivering the optimisation services behind a Virtual Power Plant.',
};

export const experience: Experience[] = [
  {
    company: 'Sector Alarm',
    companyUrl: 'https://www.sectoralarm.com/',
    role: 'Senior .NET Software Engineer',
    start: '2026-05',
    summary:
      'Building cloud-native backend services for one of Europe\u2019s leading safety providers — Sector Alarm protects more than 730,000 homes and businesses across Europe with smart alarms, cameras and locks, backed by a 24/7 Alarm Receiving Centre.',
    highlights: [
      'Building cloud-native .NET services on a fully Azure stack, deployed on Azure Kubernetes Service.',
      'Bringing agentic AI into everyday engineering — Claude Code\u2013assisted development, AI pipelines and modern tooling woven into how the team ships.',
      'Working on the platform that connects security devices, the award-winning Sector Alarm app and the 24/7 Alarm Receiving Centre.',
    ],
    tech: [
      'C#', '.NET', 'Azure', 'Kubernetes', 'AKS', 'Docker', 'Claude Code', 'Agentic AI workflows',
    ],
  },
  {
    company: 'Eneco',
    companyUrl: 'https://www.eneco.nl/en/about-us/',
    role: 'Senior .NET Software Engineer',
    start: '2024-08',
    end: '2026-04',
    summary:
      'Led development for the Flex Optimization Team within the Asset Optimization domain in Rotterdam, delivering backend services and integrations that support flex trading and portfolio optimisation for the Virtual Power Plant (VPP).',
    highlights: [
      'Defined service boundaries, multi-tenant data architecture and integration patterns; authored Architecture Decision Records and aligned choices with other VPP domains.',
      'Designed multi-tenancy with isolated data stores, enabling tenant isolation, simpler compliance and independent scaling of tenant workloads.',
      'Delivered the battery co-location feature pairing batteries with wind and solar to share grid connections — reducing grid infrastructure CAPEX by ~30–50%.',
      'Migrated the Flex Optimization Service from MassTransit to Wolverine, removing future licensing exposure (~€12k/year) and simplifying the messaging stack.',
      'Upgraded the platform from .NET 8 to .NET 10, improving performance, security and long-term maintainability.',
      'Hired, coached and mentored developers; ran technical interviews and planned delivery of business-critical features.',
    ],
    tech: [
      'C#', '.NET 8/10', 'Azure Service Bus', 'Event Hub', 'Cosmos DB for NoSQL', 'Blob Storage',
      'App Configuration', 'App Insights', 'MSSQL', 'PostgreSQL', 'Entity Framework',
      'MassTransit', 'Wolverine', 'Docker', 'DataDog', 'SonarQube', 'Azure DevOps',
    ],
  },
  {
    company: 'Ayvens',
    companyUrl: 'https://www.ayvens.com/en-cp/',
    role: 'Team Lead .NET',
    start: '2023-01',
    end: '2024-07',
    summary:
      'Owned on-time delivery of high-quality software within the Self Service Domain; core contributor to Ayvens MyPortal, a web application giving fleet managers and drivers a 360° overview of active lease contracts.',
    highlights: [
      'Drove technical decisions, defined the quality and testing strategy, and coached engineers while planning work with the product owner and management.',
      'Redesigned the onboarding flow from a synchronous process into an asynchronous, event-driven one, increasing scalability and resilience.',
      'Raised code quality: SonarQube in CI/CD, unified error handling, API versioning, nullable types, a zero-warnings policy and ≥80% unit-test coverage.',
      'Introduced application performance monitoring: structured logging, tracing and correlation with OpenTelemetry and Datadog, plus monitors, alerts and Opsgenie schedules.',
    ],
    tech: [
      'C# 10', '.NET 6', 'PostgreSQL', 'Entity Framework', 'NServiceBus', 'Docker',
      'AWS (RDS, SQS, EKS, S3, Secrets Manager)', 'Auth0', 'DataDog',
      'TIBCO Cloud API Management', 'SonarQube', 'GitLab',
    ],
  },
{
    company: 'CarNext',
    companyUrl: 'https://corporate.carnext.com/',
    role: 'Tech Lead / Senior .NET Software Engineer',
    start: '2020-02',
    end: '2022-12',
    summary:
      'Led architecture and delivery for a portfolio of ~12 event-driven .NET 6 microservices supporting finance domains (self-billing, invoicing, supplier integration). Owned technical direction, delivery quality and team growth.',
    highlights: [
      'Defined and drove architecture and service boundaries for the finance domains, improving modularity, observability and deployment independence.',
      'Established coding standards, review practices and test strategies that raised quality and reduced regressions.',
      'Ran technical interviews, hired engineers and provided ongoing technical coaching and mentoring.',
      'Replaced partner FTP folder-scanning with a real-time REST integration (<5s instead of async file polling), cutting integration incidents by ~70% and related support tickets by ~90%.',
    ],
    tech: [
      'C# 10', '.NET 6', 'Apache Kafka', 'PostgreSQL', 'Entity Framework', 'Docker',
      'AWS (RDS, Elasticsearch, ECS, S3)', 'Okta', 'Kibana', 'Prometheus', 'Grafana', 'SonarQube', 'GitLab',
    ],
  },
  {
    company: 'Virtual Affairs',
    companyUrl: 'https://www.virtual-affairs.com/en',
    role: '.NET Software Engineer / Sitecore Developer',
    start: '2018-10',
    end: '2020-01',
    summary:
      'Delivered Sitecore 9.1 and .NET Core solutions for banking and insurance clients: Sitecore JSS apps, .NET Core services, legacy .NET Framework maintenance, backend API evolution and third-party integrations across a microservices architecture.',
    highlights: [
      'Implemented Sitecore JSS applications and .NET Core services for regulated banking and insurance clients.',
      'Evolved backend APIs and integrated third-party systems within a microservices architecture.',
    ],
    tech: [
      'Sitecore 9.1', 'JSS', 'C#', 'ASP.NET Core 2.1/2.2', 'EF Core', 'Docker',
      'AWS (Lambda, RDS, SQS, S3, ECR, ECS)', 'Azure DevOps', 'Jenkins', 'Octopus',
    ],
  },
  {
    company: 'Unic',
    companyUrl: 'https://www.unic.com/',
    role: 'Professional Application Engineer / Sitecore Developer',
    start: '2017-11',
    end: '2018-09',
    summary:
      'Developed Sitecore 8 and 9 web applications for digital and content-marketing projects, following Helix architecture principles while managing templates, renderings, placeholders, rules and scheduled tasks.',
    highlights: [
      'Built content-driven sites on Sitecore 8/9 following Helix principles and best practices.',
    ],
    tech: ['Sitecore 8/9', 'C#', 'ASP.NET MVC', 'NitroNet', 'TeamCity', 'Octopus'],
  },
  {
    company: 'DGS BS Sp. z o.o.',
    companyUrl: 'http://dgs.pl/',
    role: '.NET Software Engineer',
    start: '2015-06',
    end: '2017-10',
    summary:
      'Contributed to hearing-aid fitting and configuration software used across WDH brands (Oticon, Bernafon, Sonic) as part of a multi-site team in Denmark, Poland and Switzerland; focused on business logic, algorithms and integration with the UI and hardware abstraction layers.',
    highlights: [
      'Developed business logic and algorithms for audiology software used by hearing-care professionals across three countries.',
    ],
    tech: ['C#', '.NET 4.6', 'WPF', 'WCF', 'MEF', 'MS Fakes', 'MSSQL', 'MagicDraw'],
  },
  {
    company: 'Rothausen Development',
    companyUrl: 'http://www.rothausendevelopment.com/',
    role: '.NET Software Engineer & iOS Software Engineer',
    start: '2013-11',
    end: '2015-05',
    summary:
      'Built travel software for planning, event booking and accommodation management in a small cross-functional team (3 developers, QA, PO); developed backend services and the iOS client.',
    highlights: [
      'Shipped both the ASP.NET backend and the native iOS client as one of three developers.',
    ],
    tech: ['C#', 'ASP.NET MVC', 'MSSQL', 'Entity Framework', 'Razor', 'jQuery', 'Swift', 'UIKit', 'CoreData', 'Xcode'],
  },
];

export const skills: SkillGroup[] = [
  {
    title: 'Languages & runtime',
    items: ['C#', '.NET 8/10', 'ASP.NET Core', 'MSSQL', 'PostgreSQL', 'Entity Framework', 'Git'],
  },
  {
    title: 'Cloud-native & AI',
    items: ['Kubernetes', 'AKS', 'Docker', 'Claude Code', 'Agentic AI pipelines', 'AI-assisted development'],
  },
  {
    title: 'Messaging & streaming',
    items: ['Apache Kafka', 'MassTransit', 'Wolverine', 'NServiceBus', 'Azure Service Bus', 'Azure Event Hub'],
  },
  {
    title: 'Azure',
    items: ['AKS', 'Cosmos DB for NoSQL', 'Blob Storage', 'App Configuration', 'Application Insights'],
  },
  {
    title: 'AWS',
    items: ['RDS', 'SQS', 'S3', 'ECR', 'ECS', 'EKS', 'Lambda', 'Elasticsearch'],
  },
  {
    title: 'Architecture & practices',
    items: ['OOP', 'SOLID', 'DDD', 'CQS/CQRS', 'REST', 'Microservices', 'Event-driven architecture', 'C4 modelling', 'ADRs'],
  },
  {
    title: 'Quality & operations',
    items: ['OpenTelemetry', 'DataDog', 'SonarQube', 'Prometheus', 'Grafana', 'Kibana', 'Test strategies', 'Code review'],
  },
];

export const spokenLanguages: LanguageSkill[] = [
  { name: 'Ukrainian', level: 'Native' },
  { name: 'English', level: 'C1' },
  { name: 'Russian', level: 'C2' },
  { name: 'Polish', level: 'C1' },
  { name: 'Dutch', level: 'B2' },
];

export const education: Education[] = [
  {
    period: '2006 – 2011',
    school: 'Khmelnytskyi National University',
    degree: 'Master in System Programming',
  },
];

export const projects: Project[] = [
  {
    name: 'Learn and play',
    description:
      'A collection of small reading, counting and maths games for children in Norwegian. React + Vite, fully static, deployed to Cloudflare Workers behind a human-approved pipeline — the same deployment strategy this site uses.',
    url: 'https://play2learn.divanchyshyn.com/',
    sourceUrl: 'https://github.com/divanchyshyn/learn-and-play',
    tech: ['React 19', 'Vite', 'Vitest', 'Cloudflare Workers', 'GitHub Pages'],
  },
  {
    name: 'This website',
    description:
      'A zero-JS Astro site with a dark-first design, typed CV data, automated GitHub Pages deploys and a human-approved Cloudflare deploy to divanchyshyn.com — with Lighthouse budgets, ESLint, astro check and Vitest as quality gates.',
    url: 'https://divanchyshyn.com/',
    sourceUrl: 'https://github.com/divanchyshyn/portfolio',
    tech: ['Astro', 'TypeScript', 'Vitest', 'Cloudflare Workers', 'GitHub Pages'],
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** Formats an ISO `YYYY-MM` string as a short human label, e.g. `Aug 2024`. */
export function formatMonth(isoMonth: string): string {
  const [year, month] = isoMonth.split('-');
  const index = Number(month) - 1;
  if (!year || Number.isNaN(index) || index < 0 || index > 11) {
    throw new Error(`Invalid ISO month: ${isoMonth}`);
  }
  return `${MONTHS[index]} ${year}`;
}

/** Formats a role period as `Aug 2024 – present` or `Jan 2023 – Jul 2024`. */
export function formatPeriod(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'present'}`;
}

/** Years of professional experience since careerStart, rounded to the nearest year (as the CV reports them). */
export function yearsOfExperience(now: Date = new Date()): number {
  const [startYear, startMonth] = profile.careerStart.split('-').map(Number);
  const months = (now.getFullYear() - startYear) * 12 + (now.getMonth() + 1 - startMonth);
  return Math.max(Math.round(months / 12), 0);
}