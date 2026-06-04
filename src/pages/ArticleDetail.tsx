import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockArticles } from '@/data/mockArticles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { useEffect, useRef } from 'react';

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const article = mockArticles.find(a => a.id === id);

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Custom component for Mermaid diagrams
  const MermaidComponent = ({ node }: any) => {
    const diagramRef = useRef<HTMLDivElement>(null);
    const diagramId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

    useEffect(() => {
      if (diagramRef.current) {
        mermaid.render(diagramId, node.children[0].value)
          .then((result: any) => {
            if (diagramRef.current) {
              diagramRef.current.innerHTML = result.svg;
            }
          })
          .catch((err: any) => {
            console.error('Mermaid rendering error:', err);
          });
      }
    }, [node, diagramId]);

    return <div ref={diagramRef} className="mermaid-diagram my-6 flex justify-center" />;
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {t('articles.notFound', 'Article not found')}
            </h1>
            <Link to="/articles">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('articles.backToArticles', 'Back to Articles')}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back Button */}
          <Link to="/articles" className="inline-block mb-8">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('articles.backToArticles', 'Back to Articles')}
            </Button>
          </Link>

          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                {article.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(article.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {article.readTime} {t('articles.minRead', 'min read')}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="article-content" style={{ lineHeight: '1.8' }}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="mb-6">{children}</p>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-6">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-4">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-lg font-bold mt-6 mb-3">{children}</h4>,
                  ul: ({ children }) => <ul className="mb-6 ml-6 list-disc">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-6 ml-6 list-decimal">{children}</ol>,
                  li: ({ children }) => <li className="mb-2">{children}</li>,
                  table: ({ children }) => <table className="mb-6 w-full border-collapse">{children}</table>,
                  thead: ({ children }) => <thead className="bg-muted">{children}</thead>,
                  tbody: ({ children }) => <tbody>{children}</tbody>,
                  tr: ({ children }) => <tr className="border-b">{children}</tr>,
                  th: ({ children }) => <th className="p-3 text-left font-semibold">{children}</th>,
                  td: ({ children }) => <td className="p-3">{children}</td>,
                  hr: () => <hr className="my-8 border-border" />,
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';

                    if (language === 'mermaid') {
                      return <MermaidComponent node={node} />;
                    }

                    return !inline ? (
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                        <code className={className} {...props}>
                          {children}
                        </code>
                      </pre>
                    ) : (
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
