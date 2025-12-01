import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Layers, Rocket, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();
  
  const services = [
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: "Ruby on Rails Development",
      description:
        "Build robust, scalable backend systems with Ruby on Rails. From MVPs to enterprise solutions, we create high-performance server-side applications.",
      features: ["RESTful APIs", "Database Design", "Background Jobs", "Testing & CI/CD"],
    },
    {
      icon: <Layers className="h-10 w-10 text-accent" />,
      title: "ReactJS Development",
      description:
        "Create stunning, responsive user interfaces with React. We build modern SPAs that deliver exceptional user experiences across all devices.",
      features: ["Component Libraries", "State Management", "Performance Optimization", "Modern Tooling"],
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: "Full-Stack Solutions",
      description:
        "Seamlessly integrate Rails backends with React frontends. We deliver complete solutions that leverage the best of both technologies.",
      features: ["API Integration", "Real-time Features", "Authentication & Security", "Cloud Deployment"],
    },
    {
      icon: <Zap className="h-10 w-10 text-accent" />,
      title: "Consulting & Training",
      description:
        "Empower your team with expert guidance. We offer consulting, code reviews, and training to help you make the most of Rails and React.",
      features: ["Architecture Review", "Best Practices", "Team Training", "Technical Audits"],
    },
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardHeader>
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
