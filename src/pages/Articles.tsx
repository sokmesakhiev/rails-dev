import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockArticles, Article } from '@/data/mockArticles';

type Category = 'all' | 'rails' | 'react' | 'fullstack' | 'devops';

const Articles = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const categories: { key: Category; label: string }[] = [
    { key: 'all', label: t('articles.categories.all', 'All') },
    { key: 'rails', label: t('articles.categories.rails', 'Ruby on Rails') },
    { key: 'react', label: t('articles.categories.react', 'ReactJS') },
    { key: 'fullstack', label: t('articles.categories.fullstack', 'Full-Stack') },
    { key: 'devops', label: t('articles.categories.devops', 'DevOps') },
  ];

  const filteredArticles = selectedCategory === 'all'
    ? mockArticles
    : mockArticles.filter(article => article.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: Article['category']) => {
    const colors = {
      rails: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      react: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      fullstack: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      devops: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return colors[category];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t('articles.title', 'Articles')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('articles.subtitle', 'Best Practices & Insights')}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.key}
                variant={selectedCategory === category.key ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.key)}
                className="rounded-full"
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Articles Grid */}
          {filteredArticles.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        {categories.find(c => c.key === article.category)?.label}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {article.readTime} {t('articles.minRead', 'min read')}
                      </div>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      <Link to={`/articles/${article.id}`}>
                        {article.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(article.publishedAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link to={`/articles/${article.id}`}>
                      <Button variant="link" className="p-0">
                        {t('articles.readMore', 'Read More')} →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {t('articles.noArticles', 'No articles found in this category.')}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
