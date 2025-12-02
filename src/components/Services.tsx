import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Layers, Rocket, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: <Code2 className="h-10 w-10 text-primary" />,
      title: t("services.rails.title"),
      description: t("services.rails.description"),
      features: [
        t("services.rails.features.restfulApis"),
        t("services.rails.features.databaseDesign"),
        t("services.rails.features.authentication"),
        t("services.rails.features.backgrounJobs"),
        t("services.rails.features.testing")
      ]
    },
    {
      icon: <Layers className="h-10 w-10 text-accent" />,
      title: t('services.react.title'),
      description: t('services.react.description'),
      features: [
        t("services.react.features.componentLibraries"),
        t("services.react.features.stateManagement"),
        t("services.react.features.performanceOptimization"),
        t("services.react.features.modernTooling")
      ]

    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: t('services.fullstack.title'),
      description: t('services.fullstack.description'),
      features: [
        t("services.fullstack.features.apiIntegration"),
        t("services.fullstack.features.realTimeFeatures"),
        t("services.fullstack.features.authenticationSecurity"),
        t("services.fullstack.features.cloudDeployment")
      ]
    },
    {
      icon: <Zap className="h-10 w-10 text-accent" />,
      title: t('services.consulting.title'),
      description: t('services.consulting.description'),
      features: [
        t("services.consulting.features.architectureReview"),
        t("services.consulting.features.bestPractices"),
        t("services.consulting.features.teamTraining"),
        t("services.consulting.features.technicalAudits")
      ]
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
