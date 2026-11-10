import type { LucideIcon } from 'lucide-react';
import { Cloud, CloudCog, FlaskConical, Layers, Sparkles } from 'lucide-react';
import {
  siClaude,
  siCloudflare,
  siDocker,
  siGithubactions,
  siGooglecloud,
  siHotwire,
  siKubernetes,
  siLangchain,
  siLaravel,
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
  siStimulus,
  siSupabase,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from 'simple-icons';

// Tabs in the Tech Stack section. Labels are translated under
// `techStack.categories.<key>` in every locale file.
export const techCategories = ['backend', 'ai', 'frontend', 'devops'] as const;
export type TechCategory = (typeof techCategories)[number];

// Brand logos come from simple-icons. A few brands (OpenAI, AWS, Azure,
// Heroku, RSpec) aren't in that set, so those use a neutral lucide icon.
export type TechIcon = { brand: SimpleIcon } | { lucide: LucideIcon };

export interface Tech {
  name: string;
  // Short technical blurb; product names and terms, so not translated.
  detail: string;
  category: TechCategory;
  icon: TechIcon;
}

export const techStack: Tech[] = [
  // Backend
  { name: 'Ruby on Rails', detail: 'v8+ / Solid Queue & Cache', category: 'backend', icon: { brand: siRubyonrails } },
  { name: 'PostgreSQL', detail: 'Schema Design / Optimization', category: 'backend', icon: { brand: siPostgresql } },
  { name: 'Supabase', detail: 'Postgres / Auth / Storage', category: 'backend', icon: { brand: siSupabase } },
  { name: 'Redis & Sidekiq', detail: 'Caching / Background Jobs', category: 'backend', icon: { brand: siRedis } },
  { name: 'RSpec & Capybara', detail: 'Automated Testing / TDD', category: 'backend', icon: { lucide: FlaskConical } },
  { name: 'Laravel', detail: 'PHP / REST APIs', category: 'backend', icon: { brand: siLaravel } },
  { name: 'Python', detail: 'APIs / Data / ML Services', category: 'backend', icon: { brand: siPython } },
  { name: 'Node.js', detail: 'APIs / Real-Time Services', category: 'backend', icon: { brand: siNodedotjs } },

  // AI
  { name: 'Claude API', detail: 'Tool Use / Agents', category: 'ai', icon: { brand: siClaude } },
  { name: 'OpenAI API', detail: 'GPT Models / Embeddings', category: 'ai', icon: { lucide: Sparkles } },
  { name: 'Ollama', detail: 'Self-Hosted Local LLMs', category: 'ai', icon: { brand: siOllama } },
  { name: 'n8n', detail: 'AI Workflow Automation', category: 'ai', icon: { brand: siN8n } },
  { name: 'RubyLLM', detail: 'LLM Integration for Rails', category: 'ai', icon: { brand: siRuby } },
  { name: 'LangChain', detail: 'LLM Apps / RAG / Agents', category: 'ai', icon: { brand: siLangchain } },
  { name: 'PyTorch', detail: 'Machine Learning', category: 'ai', icon: { brand: siPytorch } },

  // Frontend
  { name: 'React', detail: 'Inertia.js / SPA', category: 'frontend', icon: { brand: siReact } },
  { name: 'Next.js', detail: 'React Framework / SSR', category: 'frontend', icon: { brand: siNextdotjs } },
  { name: 'TypeScript', detail: 'Type-Safe JavaScript', category: 'frontend', icon: { brand: siTypescript } },
  { name: 'Hotwire / Turbo', detail: 'Drive / Frames / Streams', category: 'frontend', icon: { brand: siHotwire } },
  { name: 'Stimulus', detail: 'Modest JavaScript Controllers', category: 'frontend', icon: { brand: siStimulus } },
  { name: 'Vite', detail: 'Fast Frontend Tooling', category: 'frontend', icon: { brand: siVite } },
  { name: 'Tailwind CSS', detail: 'Modern UI Design', category: 'frontend', icon: { brand: siTailwindcss } },

  // DevOps & Cloud
  { name: 'Docker & Kamal', detail: 'Containers / Kamal 2 Deploys', category: 'devops', icon: { brand: siDocker } },
  { name: 'AWS', detail: 'ECS, EC2, S3, RDS, CloudFront', category: 'devops', icon: { lucide: Cloud } },
  { name: 'Terraform', detail: 'Infrastructure as Code', category: 'devops', icon: { brand: siTerraform } },
  { name: 'Kubernetes', detail: 'Container Orchestration', category: 'devops', icon: { brand: siKubernetes } },
  { name: 'Google Cloud', detail: 'Cloud Run / GKE / Cloud SQL', category: 'devops', icon: { brand: siGooglecloud } },
  { name: 'Microsoft Azure', detail: 'App Service / AKS / Azure SQL', category: 'devops', icon: { lucide: CloudCog } },
  { name: 'Cloudflare', detail: 'Workers / CDN / DNS', category: 'devops', icon: { brand: siCloudflare } },
  { name: 'Vercel', detail: 'Frontend Hosting', category: 'devops', icon: { brand: siVercel } },
  { name: 'Heroku', detail: 'PaaS Deployment', category: 'devops', icon: { lucide: Layers } },
  { name: 'GitHub Actions', detail: 'CI/CD Workflows', category: 'devops', icon: { brand: siGithubactions } },
];
