import type { LucideIcon } from 'lucide-react';
import {
  BadgeCheck,
  Cloud,
  CloudCog,
  CreditCard,
  FlaskConical,
  KeyRound,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  siCardano,
  siClaude,
  siCloudflare,
  siDocker,
  siElasticsearch,
  siGithubactions,
  siGooglecloud,
  siHotwire,
  siKubernetes,
  siLangchain,
  siLaravel,
  siMongodb,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOllama,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siRuby,
  siRubyonrails,
  siStripe,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from 'simple-icons';

// Brand logos come from simple-icons. Brands that aren't in that set
// (OpenAI, AWS, Azure, Heroku, RSpec, Hyperledger, W3C) use a lucide icon.
export type TechIcon = { brand: SimpleIcon } | { lucide: LucideIcon };

export interface Tech {
  name: string; // product name, not translated
  icon: TechIcon;
}

// The section is organized by what a client gets, not by technology type.
// Each group's title and description are translated under
// `techStack.groups.<key>`; `projects` are titles from the Projects page.
export interface TechGroup {
  key: 'product' | 'data' | 'ai' | 'identity' | 'cloud';
  projects: string[];
  tools: Tech[];
}

export const techGroups: TechGroup[] = [
  {
    key: 'product',
    projects: ['Rally', 'Private Translation Cloud (PTC)', 'Dashboard & Reporting System (DRS)'],
    tools: [
      { name: 'Ruby on Rails', icon: { brand: siRubyonrails } },
      { name: 'Hotwire (Turbo & Stimulus)', icon: { brand: siHotwire } },
      { name: 'Laravel', icon: { brand: siLaravel } },
      { name: 'React', icon: { brand: siReact } },
      { name: 'Next.js', icon: { brand: siNextdotjs } },
      { name: 'TypeScript', icon: { brand: siTypescript } },
      { name: 'Tailwind CSS', icon: { brand: siTailwindcss } },
      { name: 'RSpec & Capybara', icon: { lucide: FlaskConical } },
    ],
  },
  {
    key: 'data',
    projects: ['Payment Gateway & Processing Engine', 'Property Valuation Platform', 'VTenh Ecommerce'],
    tools: [
      { name: 'PostgreSQL', icon: { brand: siPostgresql } },
      { name: 'Redis & Sidekiq', icon: { brand: siRedis } },
      { name: 'Elasticsearch', icon: { brand: siElasticsearch } },
      { name: 'MongoDB', icon: { brand: siMongodb } },
      { name: 'Node.js', icon: { brand: siNodedotjs } },
      { name: 'Python', icon: { brand: siPython } },
      { name: 'Stripe', icon: { brand: siStripe } },
      { name: 'Card & QR payments', icon: { lucide: CreditCard } },
    ],
  },
  {
    key: 'ai',
    projects: ['Private Translation Cloud (PTC)'],
    tools: [
      { name: 'Claude API', icon: { brand: siClaude } },
      { name: 'OpenAI API', icon: { lucide: Sparkles } },
      { name: 'RubyLLM', icon: { brand: siRuby } },
      { name: 'LangChain', icon: { brand: siLangchain } },
      { name: 'Ollama', icon: { brand: siOllama } },
      { name: 'n8n', icon: { brand: siN8n } },
      { name: 'PyTorch', icon: { brand: siPytorch } },
    ],
  },
  {
    key: 'identity',
    projects: ['Certificate Verification'],
    tools: [
      { name: 'Hyperledger Identus', icon: { lucide: ShieldCheck } },
      { name: 'W3C Verifiable Credentials', icon: { lucide: BadgeCheck } },
      { name: 'DIDs & DIDComm', icon: { lucide: KeyRound } },
      { name: 'Cardano', icon: { brand: siCardano } },
    ],
  },
  {
    key: 'cloud',
    projects: ['Rally', 'Private Translation Cloud (PTC)'],
    tools: [
      { name: 'AWS', icon: { lucide: Cloud } },
      { name: 'Terraform', icon: { brand: siTerraform } },
      { name: 'Docker & Kamal', icon: { brand: siDocker } },
      { name: 'Kubernetes', icon: { brand: siKubernetes } },
      { name: 'GitHub Actions', icon: { brand: siGithubactions } },
      { name: 'Cloudflare', icon: { brand: siCloudflare } },
      { name: 'Google Cloud', icon: { brand: siGooglecloud } },
      { name: 'Azure', icon: { lucide: CloudCog } },
      { name: 'Vercel', icon: { brand: siVercel } },
      { name: 'Heroku', icon: { lucide: Layers } },
    ],
  },
];
