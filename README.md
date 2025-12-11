# RichData CRM

A modern, enterprise-grade Customer Relationship Management (CRM) system built with Nuxt.js and Vue 3. This application provides a comprehensive solution for managing contacts, tasks, emails, documents, and business operations.

## 🚀 Features

- **📊 Dashboard**: Overview of business metrics, recent activity, and quick actions
- **👥 Contacts Management**: Organize and manage customer contacts with detailed information
- **📧 Inbox**: Email management and communication tracking
- **✓ Task Management**: Kanban-style task board with priority and status tracking
- **📄 Document Management**: Centralized document storage and organization
- **⚙️ Settings**: Application configuration and preferences
- **🎨 Modern UI**: Beautiful, responsive interface with dark mode support
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Core Framework
- **Nuxt.js 4** - Vue.js framework with SSR capabilities
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development

### State Management
- **Pinia** - Vue state management library

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Custom Vue Components** - Reusable UI components

### Development Tools
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## 📁 Project Structure

The project uses Nuxt's **layer architecture** for modular organization:

```
richdata-crm/
├── app/                    # Next.js app directory (for deployment)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page
│   └── pages/             # Nuxt pages
├── components/            # React/Next.js components (shadcn/ui)
│   └── ui/               # UI component library
├── layers/               # Nuxt layers (feature modules)
│   ├── contacts/        # Contacts feature layer
│   │   ├── components/  # Contact-specific components
│   │   ├── pages/       # Contact pages
│   │   └── stores/      # Contact state management
│   ├── inbox/           # Email/Inbox feature layer
│   ├── task/            # Task management layer
│   ├── document/        # Document management layer
│   ├── settings/        # Settings layer
│   └── shared-ui/       # Shared UI components and utilities
│       ├── components/  # Reusable Vue components
│       ├── stores/      # Shared state stores
│       └── assets/      # Shared assets
├── stores/              # Central store exports
├── lib/                 # Utility functions
├── hooks/               # React hooks
├── public/              # Static assets
└── styles/              # Global styles
```

### Layer Architecture

Each layer is a self-contained module with:
- **Components**: Feature-specific Vue components
- **Pages**: Route pages for the feature
- **Stores**: Pinia stores for state management
- **Configuration**: Layer-specific Nuxt configuration

## 🏁 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **pnpm** 8+ (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd richdata-crm
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🏗️ Architecture

### Layer System

The application uses Nuxt's layer system to organize features:

- **shared-ui**: Base layer with common components, layouts, and utilities
- **contacts**: Contact management functionality
- **inbox**: Email and communication management
- **task**: Task and project management
- **document**: Document storage and management
- **settings**: Application settings and configuration

Each layer can be independently developed and maintained, making the codebase modular and scalable.

### State Management

State is managed using Pinia stores, with each feature layer having its own store:

- `useContactsStore` - Contact data and operations
- `useInboxStore` - Email data and operations
- `useTaskStore` - Task data and operations
- `useDocumentStore` - Document data and operations
- `useSettingsStore` - Application settings
- `useUIStore` - UI state (theme, notifications, etc.)

### Component System

- **Vue Components**: Primary UI components in `layers/shared-ui/components`
- **React Components**: shadcn/ui components in `components/ui` (for Next.js integration)

## 🎨 Styling

The project uses Tailwind CSS 4 with:
- Custom color scheme with CSS variables
- Dark mode support
- Responsive design utilities
- Custom animations via `tailwindcss-animate`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE=http://localhost:3000
```

### Nuxt Configuration

Main configuration is in `nuxt.config.ts`, which extends all feature layers. Each layer can have its own `nuxt.config.ts` for layer-specific settings.

## 📦 Building for Production

```bash
pnpm build
```

The production build will be output to `.output` directory.

## 🚢 Deployment

The project can be deployed to:
- **Vercel** (recommended for Next.js integration)
- **Netlify**
- **Any Node.js hosting** that supports Nuxt.js

For Vercel deployment, the project includes Next.js configuration for compatibility.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure linting passes: `pnpm lint`
4. Submit a pull request

## 📝 License

This project is private and proprietary.

## 🔮 Future Enhancements

- [ ] Backend API integration
- [ ] Real-time notifications
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Multi-user support
- [ ] Activity logging and audit trails
- [ ] Integration with third-party services

---

Built with ❤️ using Nuxt.js and Vue 3

