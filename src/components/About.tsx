import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  
  const values = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Excellence",
      description: "We're committed to delivering top-tier solutions that exceed expectations.",
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Collaboration",
      description: "We work closely with our clients as true partners in their success.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "We stay ahead of the curve with cutting-edge technologies and practices.",
    },
    {
      icon: <Heart className="h-8 w-8 text-accent" />,
      title: "Passion",
      description: "We love what we do and it shows in every project we deliver.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            {t('about.title')}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t('about.subtitle')}
          </p>
          <p className="text-lg text-muted-foreground">
            {t('about.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
            >
              <CardContent className="pt-8 pb-6">
                <div className="inline-flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">{t('hero.cta')}</h3>
          <p className="text-lg text-muted-foreground mb-6">
            {t('about.cta')}
          </p>
          <a
            href="mailto:ksokmesa@gmail.com"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            {t('nav.getStarted')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
