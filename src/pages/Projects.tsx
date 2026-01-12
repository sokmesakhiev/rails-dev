import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t } = useTranslation();

  const projects = [
    {
      title: "Private Translation Cloud (PTC)",
      url: 'https://ptc.wpml.org',
      description: t('projects.ptcDescription'),
      technologies: ["Ruby on Rails", "ReactJS", "AWS ECS", "AWS CloudWatch", "LLM Integration", "Python", "Tailwind"],
      company: "OnTheGoSystems",
      year: "2023-2025",
      links: {
        demo: "",
        github: ""
      }
    },
    {
      title: "Property Valuation Platform",
      url: "#",
      description: t('projects.z1DataDescription'),
      technologies: ["Ruby on Rails", "PostgreSQL", "Elasticsearch", "AWS", "ReactJS"],
      company: "Z1Data",
      year: "2021-2022",
      links: {
        demo: "",
        github: ""
      }
    },
    {
      title: "Payment Gateway & Processing Engine",
      url: "https://bongloy.asia/",
      description: t('projects.bongloyDescription'),
      technologies: ["Ruby on Rails", "PostgreSQL", "Redis", "Card Networks API", "Android"],
      company: "Bongloy Payments PLC",
      year: "2018-2021",
      links: {
        demo: "",
        github: ""
      }
    },
    {
      title: "VTenh Ecommerce",
      url: "https://www.vtenh.com/",
      description: t('projects.vtenhDescription'),
      technologies: ["Ruby on Rails", "ReactJS", "PostgreSQL", "Stripe", "AWS"],
      company: "VTenh",
      year: "2021",
      links: {
        demo: "",
        github: ""
      }
    },
    {
      title: "Depot Management System",
      url: "#",
      description: t('projects.depotDescription'),
      technologies: ["Ruby on Rails", "PostgreSQL", "jQuery", "Bootstrap"],
      company: "CamSolution",
      year: "2017-2018",
      links: {
        demo: "",
        github: ""
      }
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('projects.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('projects.subtitle')}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border"
              >
                <div className="flex flex-col h-full">
                  {/* Project Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-foreground">
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          {project.title}
                        </a>
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{project.company}</span>
                      <span>•</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  {(project.links.demo || project.links.github) && (
                    <div className="flex gap-2 mt-auto">
                      {project.links.demo && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {t('projects.viewDemo')}
                          </a>
                        </Button>
                      )}
                      {project.links.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            {t('projects.viewCode')}
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
