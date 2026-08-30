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
  {
    id: '6',
    title: 'Digital Diplomas You Can Trust',
    excerpt: 'Verifiable Credentials and Cardano for University Certificate Issuance',
    content: `
# **How a modern certificate platform lets universities issue tamper-evident credentials, puts control in the student’s wallet, and lets employers verify authenticity in seconds—without faxing the registrar.**

---

## The problem universities still face

Paper diplomas and static PDFs are easy to copy, slow to verify, and expensive to use across borders. When an employer in Germany or an admissions office in another country receives a degree from Bosnia and Herzegovina or the Western Balkans, verification often means:

- Emailing the registrar and waiting days or weeks
- Paying for notarization, translation, or apostille
- Trusting a scanned image with no cryptographic proof of origin

The **Certificate Verification** platform addresses this by combining **W3C Verifiable Credentials (VCs)** for cryptographic trust with **Cardano** for an optional, privacy-preserving audit trail on a public blockchain.

---

## What Verifiable Credentials add

A **Verifiable Credential** is a digitally signed statement—like a diploma—that a **verifier** can check mathematically without calling the issuer every time.

Think of it as three roles:

| Role | In this project | Example |
|------|-----------------|---------|
| **Issuer** | University (registrar) | "Jane Doe earned a BSc in Computer Science in 2026." |
| **Holder** | Student / graduate | Keeps the credential in a digital wallet |
| **Verifier** | Employer, admissions office, public QR scan | Checks signature, schema, and revocation status |

Each party has a **Decentralized Identifier (DID)**—a cryptographic identity. The university's DID ('did:prism:…') is bound to keys used to sign credentials. If someone alters the credential after issuance, the signature breaks and verification fails.

The platform supports **diplomas**, **transcripts**, and **course certificates**, each with a registered JSON Schema on the **Hyperledger Identus** issuer agent so credentials follow a consistent, machine-readable structure.

### Why this is better than "just a PDF"

| Traditional PDF | Verifiable Credential |
|-----------------|----------------------|
| Anyone can edit in Photoshop | Tampering breaks the cryptographic proof |
| Verifier must contact the university | Verifier checks signature + status list instantly |
| Student sends the full document every time | Student can share selectively (e.g. degree without GPA) |
| Revocation is manual and opaque | Revocation uses **W3C StatusList2021**—a standard, checkable status bit |

---

## What Cardano adds (without putting student data on-chain)

Cardano does **not** store names, grades, or diploma text on the blockchain. That would be a privacy risk and unnecessary.

Instead, the platform writes a **fingerprint** of the credential—a **SHA-256 hash**—into Cardano transaction metadata using **CIP-674** (label '674'). The on-chain record typically includes:

- **'h'** — hash of the credential (fingerprint)
- **'i'** — issuer DID (who attested it)
- **'t'** — timestamp

So Cardano provides:

1. **Immutability** — Once anchored, the fingerprint cannot be changed without a new transaction.
2. **Independent audit** — Anyone with the credential can check whether the same hash was recorded on-chain.
3. **Privacy by design** — Personal data stays in the university database and in the student's wallet; the chain only holds a hash.

Cardano access is via **Blockfrost**; the **Connector** service builds and submits anchor transactions. This is complementary to VC signatures: the VC proves *who issued it*; the anchor proves *this exact credential existed at a point in time* on a public ledger.

---
## How the platform is built (at a glance)

The system is split into clear layers:

\`\`\`mermaid
flowchart LR
  subgraph people["People"]
    REG[Registrar]
    STU[Student]
    EMP[Employer]
  end

  subgraph platform["Certificate Verification Platform"]
    UI[Next.js Portal]
    API[Backend API]
    CONN[Connector]
  end

  subgraph trust["Trust layer"]
    IDENTUS[Identus Issuer Agent]
    PRISM[PRISM Node]
    MED[Mediator]
    CARDANO[Cardano]
  end

  REG --> UI --> API --> CONN
  STU --> UI
  STU -->|DIDComm wallet| MED
  EMP --> UI --> API
  CONN --> IDENTUS --> PRISM
  CONN --> CARDANO
  IDENTUS --> MED
\`\`\`

- **Frontend (Next.js)** — Admin, registrar, student portal, public verification pages. It never talks to the Connector directly; everything goes through the API.
- **Backend API** — Business logic, users, certificates, credentials, queues, audit. Sole owner of the application database.
- **Connector (TypeScript/Bun)** — Signs and verifies VCs, manages revocation lists, proxies Identus, anchors hashes on Cardano.
- **Identus stack** — Issuer agent, PRISM Node ('did:prism'), DIDComm mediator for student wallets.
- **PostgreSQL** — Application data; separate databases for Identus agents.

This separation keeps **university business data** in the API and **cryptographic operations** in the Connector and Identus agents.

---

## End-to-end process flows

### 1. One-time setup: university identity and schemas

Before issuing credentials at scale, operators bootstrap the Identus infrastructure:

1. Start Docker services (Postgres, PRISM Node, issuer agent, mediator).
2. Run **'01-init-university-did.sh'** — Creates and publishes the university's 'did:prism' on the ledger.
3. Run **'02-register-diploma-schema.sh'** (and transcript/course scripts) — Registers credential schemas with the issuer agent.

The university now has a resolvable issuer DID and schema IDs the system uses when building credential offers.

See [IDENTUS_INFRASTRUCTURE_SETUP.md](../infrastructure/IDENTUS_INFRASTRUCTURE_SETUP.md) for full bootstrap steps.

---

### 2. Student wallet connection (before issuance)

For wallet-based issuance, the student connects once in the **Student Portal**:

\`\`\`mermaid
sequenceDiagram
    participant S as Student
    participant Portal as Student Portal
    participant API as Backend API
    participant Conn as Connector
    participant Agent as Issuer Agent
    participant Med as Mediator

    S->>Portal: Open wallet / connect
    Portal->>API: Request holder connection
    API->>Conn: Create DIDComm invitation
    Conn->>Agent: Invitation
    S->>Portal: Accept (Identus Edge Agent SDK)
    Portal->>Med: DIDComm handshake
    Agent->>Med: Route to student
    Portal->>API: Save identus_connection_id
\`\`\`

After this, the university can send **credential offers** to that student over DIDComm—even when the browser was offline earlier (the **mediator** stores and forwards messages).

---

### 3. Certificate issuance (registrar flow)

When a registrar clicks **Issue** on a certificate, the API chooses one of three paths:

\`\`\`mermaid
flowchart TD
  START[Registrar issues certificate] --> CHECK{Student has wallet connection<br/>and schema configured?}

  CHECK -->|Yes| A[Path A: Identus wallet]
  CHECK -->|No, but issuer DID exists| B[Path B: Legacy VC + anchor]
  CHECK -->|No| C[Path C: PDF only]

  A --> PDF1[Generate PDF]
  PDF1 --> OFFER[Send JWT credential offer]
  OFFER --> ACCEPT[Student accepts in wallet]
  ACCEPT --> VERIFY[Promote to verified]
  VERIFY --> ANCHOR1[Optional Cardano anchor]

  B --> PDF2[Generate PDF]
  PDF2 --> SIGN[Sign JSON-LD VC + StatusList]
  SIGN --> ANCHOR2[Cardano anchor]

  C --> PDF3[Generate PDF only]
\`\`\`

#### Path A — Identus wallet (primary, modern flow)

This is the intended production path when the student has connected their wallet.

| Step | What happens |
|------|----------------|
| 1 | Registrar issues certificate via admin UI → API creates a **Credential** ('pending'). |
| 2 | Queue worker generates the **PDF** and stores its URL on the credential. |
| 3 | **IssueIdentusCredentialOfferAfterPdf** calls the Connector → Issuer agent creates a **JWT credential offer** (diploma / transcript / course schema). |
| 4 | Offer is delivered to the student wallet via **DIDComm** and the mediator. |
| 5 | Student **accepts** the credential in the Student Portal (Identus Edge Agent SDK). |
| 6 | **PromoteCredentialToVerifiedJob** polls the agent until state is 'CredentialSent' or 'Done'. |
| 7 | Credential and certificate move to **'verified'**. |
| 8 | Optionally, **QueueBlockchainAnchorAfterPdf** writes the credential hash to **Cardano**. |

Status progression:

\`\`\`
pending → (wallet accepts offer) → verified → (optional) anchored on Cardano
\`\`\`

Important detail: on this path, **blockchain anchoring often runs after the student accepts the credential**, not the instant the registrar clicks Issue. That way the anchored fingerprint corresponds to the fully issued, wallet-held credential.

#### Path B — Legacy Connector + anchor

Used when there is no wallet connection but the institution has an issuer DID configured in the Connector:

- Build and sign a **JSON-LD Verifiable Credential** with **Ed25519Signature2020**
- Assign a **StatusList2021** revocation index
- Anchor hash on Cardano via the Connector
- Store issued credential metadata in Connector storage

#### Path C — PDF only

If no issuer DID and no wallet connection: the platform still generates the official PDF, but skips VC signing and blockchain anchoring ('skipped_no_issuer_did').

---

### 4. Verification (employer or public)

Verification answers: *Is this credential structurally valid, signed by the university, not revoked, and optionally anchored on Cardano?*

\`\`\`mermaid
sequenceDiagram
    participant V as Verifier
    participant UI as Verification UI
    participant API as Backend API
    participant Conn as Connector

    V->>UI: Scan QR or open link
    UI->>API: GET credential / POST verification
    API->>Conn: Verify VC
    Conn->>Conn: Check schema + signature
    Conn->>Conn: Check StatusList2021 (revoked?)
    Conn->>Conn: Optional Cardano hash lookup
    Conn-->>API: valid / invalid / revoked
    API-->>UI: Result + metadata
    UI-->>V: Instant authenticity result
\`\`\`

Checks performed:

| Check | Meaning |
|-------|---------|
| **Schema** | Required VC fields present; issuer DID valid |
| **Signature** | Proof matches university keys |
| **Revocation** | StatusList bit not set (credential not revoked) |
| **Cardano anchor** | Advisory: hash found on-chain with matching issuer DID |

The employer does **not** need access to the university's internal database. Trust comes from cryptography and, optionally, the public ledger.

---

### 5. Revocation

If a credential must be withdrawn (fraud, error, degree annulment):

1. Registrar revokes in the admin portal → API → Connector.
2. Connector flips the credential's bit on the **StatusList2021**.
3. Future verifications fail the revocation check.
4. Optional on-chain revocation metadata can be recorded for audit.

Revocation is as important as issuance for long-term trust.

---

## Benefits by stakeholder

### For the university

- **Standard-aligned issuance** (W3C VC, StatusList2021, DIDs)
- **Registrar workflow unchanged in spirit**—issue from the same admin portal, with automation behind the scenes
- **Revocation and audit trail** without maintaining a custom verification hotline for every employer
- **Cross-border readiness**—cryptographic proofs reduce reliance on paper chains of trust

### For students

- **Credentials in a wallet**, not only email attachments
- **Selective disclosure**—share what is needed (e.g. proof of degree without full transcript)
- **Faster job and mobility applications**—share a QR or link instead of waiting for registrar letters

### For employers and institutions

- **Seconds, not weeks**—verify from a QR code or URL
- **Tamper detection**—altered documents fail signature verification
- **Revocation awareness**—withdrawn credentials show as invalid

---

## Privacy and design principles

The platform is built around a few non-negotiable rules:

1. **No personal data on Cardano** — only hashes and issuer DIDs.
2. **API owns business data; Connector owns crypto** — clean security boundaries.
3. **Frontend never calls the Connector directly** — all integration goes through authenticated API routes.
4. **Wallet interoperability** — Identus agent, DIDComm, and registered schemas support portable credentials.
5. **Dual paths** — modern wallet issuance plus legacy signing for institutions still onboarding wallet connectivity.

---

## Geographic and policy context

The project targets universities in **Bosnia and Herzegovina** and the **Western Balkans**, with **EU and international verification** in mind. In regions where paper credentials still dominate and cross-border recognition is costly, VCs plus optional Cardano anchoring offer:

- Instant verification for diaspora and remote hiring
- Reduced fraud from forged scans
- A path toward **digital credential ecosystems** aligned with global W3C and wallet standards—not a proprietary lock-in format

---

## Conclusion

**Verifiable Credentials** give universities a way to issue credentials that are **cryptographically authentic** and **instantly checkable**. **Cardano** adds an optional **immutable fingerprint** on a public ledger—without exposing student personal data.

Together, they turn certificate issuance from a document-delivery problem into a **trust infrastructure** problem: the registrar still decides who graduates, the student holds the proof, and verifiers can confirm authenticity in seconds.

The Certificate Verification platform implements this full loop—from PRISM DIDs and Identus wallet offers, through PDF generation and StatusList revocation, to Blockfrost-backed anchoring on Cardano—so universities can modernize credentials without sacrificing privacy or control.
    `,
    author: 'Khiev Sokmesa',
    publishedAt: '2026-06-04',
    readTime: 11,
    category: 'fullstack',
    tags: ['TypeScript', 'W3C', 'Verifiable Credentials', 'Cardano', 'Blockchain'],
  },
  {
    id: '7',
    title: 'Dashboard & Reporting System (DRS)',
    excerpt: 'Compare different state management solutions and learn when to use each one in your React projects.',
    content: `
The **Dashboard & Reporting System (DRS)** is an enterprise-grade analytics and business intelligence platform designed to centralize, process, and visualize real-time operational data across fragmented institutional ecosystems. Built to transform complex transactional records into actionable organizational insight, DRS serves as the single source of truth for students, academic staff, and executive leadership.

By integrating seamlessly with core modules like the **Admission Management System (AMS)** and the **Document Tracking System (DTS)**, the system eliminates administrative silos, automates compliance monitoring, and tracks long-term institutional goals through a sophisticated, multi-level KPI governance framework.

---

### 🚀 Key Architectural & Functional Pillars

#### 📊 Multi-Tenant, Role-Based Analytics
DRS delivers customized, permission-scoped dashboards designed for different operational layers, ensuring data visibility complies strictly with institutional governance:
* **Executive & Planning Office:** Access to high-level strategic monitoring, 10-year KPI trend lines, SLA bottlenecks, and institutional workload distribution.
* **Operational Staff:** Actionable task queues showcasing pending document reviews, application statuses, and processing turnaround times.
* **Students:** A transparency-focused portal detailing real-time application tracking, document request updates, and payment invoicing statuses.

#### 📈 Advanced KPI & Strategic Monitoring Engine
Moving beyond simple metrics, DRS introduces a hierarchical target-tracking engine:
* Supports multi-level KPI structures (Parent-to-Sub-KPI mapping) aligned with long-term strategic plans.
* Enforces a multi-stage data validation workflow where data entry from individual departments must be reviewed, validated, and finalized by a central Planning Office.
* Automates actual-vs-target comparisons across diverse metric types (counts, percentages, ratios) with built-in data anomaly alerts.

#### 📑 Self-Service Business Intelligence & Reporting
To drastically reduce engineering dependency for custom data requests, the system features:
* An intuitive, non-technical drag-and-drop report builder allowing managers to create and modify template layouts on the fly.
* High-fidelity document generation supporting dynamic filtering by academic year, faculty, and department.
* One-click data portability, exporting reports and visual graphics into production-ready PDF and Excel sheets.

#### 🚨 Proactive Operational Alerting
The platform implements an automated threshold monitoring system that flags critical institutional risks—such as sudden drops in attendance patterns, high dropout rates, or SLA violations in document issuance—alerting management instantly on their operational feed.

---

### 🛠️ Technical Highlights & Engineering Design

* **Data Aggregation Strategy:** Engineered to safely aggregate data without introducing performance bottlenecks into transactional modules.
* **Granular Access Control:** Implements robust Role-Based Access Control (RBAC) ensuring data row-level security based on academic department and user role.
* **Rich Interactive Visualization:** Built using a decoupled front-end architecture utilizing modern charting libraries to render highly interactive drill-down charts (bar, line, pie, donut) that scale beautifully across mobile and desktop.

---

### 💼 Business Value Delivered
* **Data-Driven Leadership:** Replaced manual compilation loops with real-time strategic monitoring.
* **Operational Efficiency:** Cut down bottleneck identification time in document workflows by mapping processing times against configured SLAs.
* **Autonomy:** Enabled business teams to self-serve 90% of their operational report variations without developer intervention.
    `,
    author: 'Khiev Sokmesa',
    publishedAt: '2026-06-05',
    readTime: 9,
    category: 'react',
    tags: ['ReactJS', 'State Management', 'Frontend', 'Architecture'],
  },
];
