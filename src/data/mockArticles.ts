export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  category: 'rails' | 'react' | 'fullstack' | 'devops';
  tags: string[];
  imageUrl?: string;
}

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Best Practices for Ruby on Rails API Development',
    excerpt: 'Learn how to build robust and scalable APIs with Ruby on Rails following industry best practices.',
    content: `
## Introduction

Building a robust API with Ruby on Rails requires careful consideration of several factors. In this article, we'll explore the best practices that will help you create maintainable, scalable, and secure APIs.

## 1. Use Versioning from Day One

Always version your API from the start. This allows you to make breaking changes without affecting existing clients.

\`\`\`ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      resources :posts
    end
  end
end
\`\`\`

## 2. Implement Proper Serialization

Use serializers to control what data is exposed through your API. Libraries like \`active_model_serializers\` or \`jsonapi-serializer\` are excellent choices.

\`\`\`ruby
class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :created_at
  has_many :posts
end
\`\`\`

## 3. Handle Errors Gracefully

Implement a consistent error handling strategy across your API.

\`\`\`ruby
class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity

  private

  def not_found(exception)
    render json: { error: exception.message }, status: :not_found
  end

  def unprocessable_entity(exception)
    render json: { errors: exception.record.errors }, status: :unprocessable_entity
  end
end
\`\`\`

## 4. Use Pagination

Always paginate your list endpoints to prevent performance issues.

## 5. Implement Rate Limiting

Protect your API from abuse by implementing rate limiting using gems like \`rack-attack\`.

## Conclusion

Following these best practices will help you build APIs that are maintainable, secure, and performant.
    `,
    author: 'Khiev Sokmesa',
    publishedAt: '2024-01-15',
    readTime: 8,
    category: 'rails',
    tags: ['Ruby on Rails', 'API', 'Backend', 'Best Practices'],
  },
  {
    id: '2',
    title: 'React Performance Optimization Techniques',
    excerpt: 'Discover proven strategies to optimize your React applications for better performance and user experience.',
    content: `
## Introduction

Performance is crucial for user experience. A fast React application keeps users engaged and improves conversion rates. Let's explore key optimization techniques.

## 1. Use React.memo for Component Memoization

Prevent unnecessary re-renders by memoizing components that receive the same props.

\`\`\`tsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Render expensive UI */}</div>;
});
\`\`\`

## 2. Implement Code Splitting

Split your bundle into smaller chunks to reduce initial load time.

\`\`\`tsx
const Dashboard = React.lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
\`\`\`

## 3. Optimize State Management

Keep state as local as possible and lift it only when necessary.

## 4. Use useMemo and useCallback Wisely

Memoize expensive calculations and callback functions.

\`\`\`tsx
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

const handleClick = useCallback((id) => {
  setSelectedId(id);
}, []);
\`\`\`

## 5. Virtualize Long Lists

Use libraries like \`react-window\` for rendering large lists efficiently.

## Conclusion

Apply these techniques judiciously based on your application's specific needs. Always measure before and after optimization.
    `,
    author: 'Khiev Sokmesa',
    publishedAt: '2024-02-20',
    readTime: 6,
    category: 'react',
    tags: ['ReactJS', 'Performance', 'Frontend', 'Optimization'],
  },
  {
    id: '3',
    title: 'Building Real-Time Features with Rails and React',
    excerpt: 'Learn how to implement real-time functionality using Action Cable and React for seamless user experiences.',
    content: `
## Introduction

Real-time features like live notifications, chat, and collaborative editing can significantly enhance user experience. Let's explore how to build these with Rails and React.

## Setting Up Action Cable

Action Cable integrates WebSockets with Rails seamlessly.

\`\`\`ruby
# app/channels/notifications_channel.rb
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_for current_user
  end
end
\`\`\`

## React Integration

Use the \`@rails/actioncable\` package to connect from React.

\`\`\`tsx
import { createConsumer } from '@rails/actioncable';

const cable = createConsumer('ws://localhost:3000/cable');

useEffect(() => {
  const subscription = cable.subscriptions.create(
    { channel: 'NotificationsChannel' },
    {
      received: (data) => {
        setNotifications(prev => [data, ...prev]);
      }
    }
  );

  return () => subscription.unsubscribe();
}, []);
\`\`\`

## Best Practices

1. Handle connection failures gracefully

2. Implement reconnection logic

3. Use authentication for channels

4. Consider scaling with Redis

## Conclusion

Action Cable and React make a powerful combination for building real-time features.
    `,
    author: 'Khiev Sokmesa',
    publishedAt: '2024-03-10',
    readTime: 10,
    category: 'fullstack',
    tags: ['Ruby on Rails', 'ReactJS', 'WebSockets', 'Real-Time'],
  },
  {
    id: '4',
    title: 'Docker Best Practices for Rails Applications',
    excerpt: 'Master containerization of your Rails applications with these Docker best practices and tips.',
    content: `
## Introduction

Docker has become essential for modern application deployment. Here's how to containerize your Rails app effectively.

## Optimized Dockerfile

\`\`\`dockerfile
FROM ruby:3.2-slim AS base
WORKDIR /app

FROM base AS build
RUN apt-get update && apt-get install -y build-essential libpq-dev
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3

FROM base
COPY --from=build /usr/local/bundle /usr/local/bundle
COPY . .
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
\`\`\`

## Multi-Stage Builds

Use multi-stage builds to reduce image size and improve security.

## Docker Compose for Development

\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
      - redis
  db:
    image: postgres:15
  redis:
    image: redis:7
\`\`\`

## Best Practices

1. Use .dockerignore to exclude unnecessary files
2. Pin base image versions
3. Run as non-root user
4. Use health checks

## Conclusion

Proper Docker configuration ensures consistent deployments across environments.
    `,
    author: 'Khiev Sokmesa',
    publishedAt: '2024-03-25',
    readTime: 7,
    category: 'devops',
    tags: ['Docker', 'DevOps', 'Ruby on Rails', 'Deployment'],
  },
  {
    id: '5',
    title: 'State Management in React: Choosing the Right Solution',
    excerpt: 'Compare different state management solutions and learn when to use each one in your React projects.',
    content: `
## Introduction

Choosing the right state management solution is crucial for React applications. Let's compare the options.

## Local State with useState

Perfect for component-specific state.

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

## Context API

Great for sharing state across components without prop drilling.

\`\`\`tsx
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');
  ....
}
\`\`\`

## TanStack Query (React Query)

Excellent for server state management.

\`\`\`tsx
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
\`\`\`

## When to Use What

- **useState**: Simple, component-local state

- **Context**: Theme, auth, small global state

- **React Query**: Server state, caching, synchronization

- **Redux/Zustand**: Complex client state with many interactions

## Conclusion

Start simple and add complexity only when needed. Most apps work fine with useState, Context, and React Query.
    `,
    author: 'Khiev Sokmesa',
    publishedAt: '2024-04-05',
    readTime: 9,
    category: 'react',
    tags: ['ReactJS', 'State Management', 'Frontend', 'Architecture'],
  },
];
