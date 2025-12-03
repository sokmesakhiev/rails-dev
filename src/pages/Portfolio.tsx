import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Calendar, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import profilePhoto from "@/assets/profile-photo.jpg";

const Portfolio = () => {
  const { t } = useTranslation();
  
  const experiences = [
    {
      title: "Senior Full-Stack Developer",
      company: "OnTheGoSystems",
      location: "Remote - Europe",
      period: "11/2022 - Present",
      type: "Software Company",
      achievements: [
        "Led the development of the Private Translation Cloud (PTC), an AI-powered translation engine designed for scalable and secure enterprise use.",
        "Led Integration with large language model (LLM)–based translation capabilities, significantly improving translation quality and system intelligence.",
        "Contributed to DevOps scalability, including optimization of background job queues and successful infrastructure migration from EC2 to ECS.",
        "Supported strategic planning by providing roadmaps and technical insights to the management team on the adoption and deployment of AI agents.",
        "Diagnosed and resolved critical production issues through in-depth system flow analysis and monitoring with AWS CloudWatch.",
        "Conducted code reviews and mentored developers in a distributed, asynchronous work environment, fostering better collaboration and code quality.",
      ],
    },
    {
      title: "Senior Software Developer Associate",
      company: "Z1Data",
      location: "Phnom Penh, Cambodia",
      period: "03/2021 - 11/2022",
      type: "Data Company",
      achievements: [
        "Led the development team in building a property valuation application, ensuring scalability and high performance.",
        "Supported the Indication Plus platform by developing and maintaining APIs for property and geospatial data integration.",
        "Oversaw the infrastructure, including application servers and the data warehouse, to ensure reliability and efficiency.",
        "Collaborated with the management team to define a data management roadmap, integrating data from multiple sources and organizing a centralized data center.",
        "Supported server infrastructure setup and optimized data pipelines for efficient indexing and retrieval in the elastic search engine.",
      ],
    },
    {
      title: "Senior Software Developer",
      company: "Bongloy Payments PLC",
      location: "Phnom Penh, Cambodia",
      period: "10/2018 - 03/2021",
      type: "Payment Service Provider",
      achievements: [
        "Developed a payment gateway to monitor and manage transactions in real time.",
        "Built a payment processing engine integrating directly with card networks for seamless authorization and settlement.",
        "Designed and implemented a card management system to control and track all card-related transactions.",
        "Developed a mobile payment application for Android, enabling users to perform transactions such as money transfers and QR code payments securely and conveniently.",
      ],
      contact: "Mr. David Wilkie (CTO) - dwilkie@bongloy.com",
    },
    {
      title: "Freelance Software Consultant",
      company: "VTenh",
      location: "Phnom Penh, Cambodia",
      period: "05/2021 - 12/2021",
      type: "E-Commerce",
      achievements: [
        "Develop e-commerce backend API for mobile app.",
        "Develop e-commerce website and admin dashboard.",
      ],
      contact: "Mr. Channa Ly (CTO) channa@bookmebus.com",
    },
    {
      title: "Tech Adviser and Project Manager",
      company: "CamSolution",
      location: "Phnom Penh, Cambodia",
      period: "05/2017 - 01/2018",
      type: "Software consulting company",
      achievements: [
        "Oversee team working tickets and working with stakeholders to implement Deport Management Systems.",
        "Support dev team on technical problem and a mentor to junior developer.",
        "Support business team on new feature estimation and roadmap.",
      ],
      contact: "Mrs. Heang Oumouy (CEO) - oumuoy.heang@gmail.com",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-24 pb-20 bg-gradient-to-b from-background to-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('portfolio.title')}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('portfolio.subtitle')}
              </p>
            </div>

            {/* Profile Section */}
            <Card className="mb-12 overflow-hidden border-2 animate-fade-in-up">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-[300px,1fr] gap-0">
                  {/* Photo */}
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-8 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-20 rounded-full blur-2xl"></div>
                      <img
                        src={profilePhoto}
                        alt="Khiev Sokmesa"
                        className="relative w-48 h-48 rounded-full object-cover border-4 border-background shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Introduction */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4 text-foreground">{t('portfolio.intro.greeting')}</h2>
                    <div className="text-primary font-semibold mb-6 text-lg">Full-Stack Software Engineer & Technical Leader</div>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {t('portfolio.intro.description')}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild variant="outline" size="sm">
                        <a href="https://www.linkedin.com/in/sokmesa-khiev-38a4b030/" target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="https://github.com/sokmesakhiev" target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <a href="https://x.com/ksokmesa" target="_blank" rel="noopener noreferrer">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          X
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 text-foreground">
                          {exp.title}
                        </CardTitle>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-primary font-semibold">
                            <Briefcase className="h-4 w-4" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{exp.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-medium mt-2">
                            {exp.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">
                          {t('portfolio.experience.achievements')}
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {exp.contact && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-semibold">Contact:</span> {exp.contact}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 sm:p-12 text-center animate-fade-in-up delay-300">
              <h3 className="text-3xl font-bold mb-4">Interested in Working Together?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Let's discuss how my experience can help bring your project to life.
              </p>
              <a
                href="mailto:ksokmesa@gmail.com"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Portfolio;
