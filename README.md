# Finimize Development Challenge

This repo is intended to be forked and uploaded to your own Github account in
order to form the submission for the challenge. Once cloned, it will give you a basic server with a React app, so you don't have to spend time writing boilerplate code. Feel free to make any changes you wish - the existing code is purely intended to get you going faster.

## Run Instructions

To run the app, `cd` into the project root directory and run `yarn install`, then `cd client` and run `yarn install`, then `cd ..` and run `yarn start`
(install Yarn [here](https://yarnpkg.com/en/docs/install)).

Depending on your environment, you might need to install concurrently / Typescript globally.

There is one basic test written in the client, which you can run by performing
`cd client` and `yarn test`.

## Project Structure

### Directory Layout

```
/
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   ├── src/               # React source code
│   │   ├── components/    # Shared components
│   │   ├── routes/        # Application routes
│   │   │   ├── calculator/# Calculator feature components
│   │   │   └── home/      # Home page components
│   │   ├── shared/        # Shared utilities, types, and components
│   │   │   ├── components/# Reusable UI components
│   │   │   ├── hooks/     # Custom React hooks
│   │   │   ├── services/  # API service layer
│   │   │   └── utils/     # Utility functions
│   │   ├── App.tsx        # Main application component
│   │   ├── index.tsx      # Application entry point
│   │   └── theme.tsx      # Chakra UI theme configuration
│   ├── package.json       # Frontend dependencies
│   └── vite.config.ts     # Vite configuration
│
├── src/                   # Backend source code (modular API)
│   ├── api/               # API modules
│   │   ├── controllers/   # Request handlers
│   │   ├── interfaces/    # TypeScript interfaces
│   │   ├── middleware/    # Express middleware
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   ├── config/            # Configuration files
│   ├── app.ts             # Express application setup
│   └── server.ts          # Server entry point
│
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── .env                   # Environment variables (create this file)
```

### Frontend Architecture

- **React**: Single-page application built with React and TypeScript
- **Chakra UI**: Component library for consistent and responsive UI
- **React Router**: Client-side routing
- **Vite**: Fast development server and build tool
- **Vitest**: Testing framework
- **CSS-in-JS**: Styling with emotion and Chakra's style system
- **Custom Hooks**: Encapsulated business logic and API interactions
- **Services Layer**: Abstracted API communication

#### Frontend Scalability

- **Component-Based Architecture**: Reusable components organized by feature and responsibility
- **Code Splitting**: Route-based code splitting for optimized loading
- **State Management**: Custom hooks for local state, easily extendable to Redux/Zustand for global state
- **API Service Layer**: Centralized API calls with interceptors for authentication and error handling
- **Responsive Design**: Mobile-first approach with Chakra UI's responsive props
- **Memoization**: Performance optimizations with React.memo and useMemo
- **Testing Infrastructure**: Unit and integration tests with Vitest and React Testing Library

### Backend Architecture

- **Express Server**: Node.js API built with Express and TypeScript
- **Modular API Structure**: Clean separation of concerns with dedicated modules:
  - **Routes**: Define endpoints and HTTP methods
  - **Controllers**: Handle request processing and response formation
  - **Services**: Contain business logic and data processing
  - **Middleware**: Handle cross-cutting concerns
  - **Interfaces**: TypeScript interfaces for type safety
- **Configuration**: Environment-based configuration system
- **Error Handling**: Centralized error handling with consistent error responses
- **Security**: Implementation of basic security practices

#### Backend Scalability

- **Modular Design**: Easy to add new features and routes
- **Service Layer**: Business logic isolated for testability and reuse
- **TypeScript**: Strong typing for maintainability
- **Rate Limiting**: Protection against API abuse
- **Stateless Design**: Ready for horizontal scaling
- **Environment Configuration**: Different settings for development, testing, and production
- **Decoupled Components**: Independent modules allow for microservices evolution

### API Endpoints

- `POST /api/calculations`: Calculate compound interest savings
- `GET /api/health`: Health check endpoint

### Security Features

- **Input Validation**: Validation and sanitization of all user inputs
- **Rate Limiting**: Protection against brute force and DoS attacks
- **CORS Configuration**: Restricted access to allowed origins only
- **Error Handling**: Secure error responses that don't leak system information
- **Environment Variables**: Sensitive configuration stored in .env files
- **Content Security**: Security headers for protection against common attacks

### Environment Setup

1. Create a `.env` file in the project root with the following variables:

```
# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Settings
CORS_ALLOWED_ORIGINS=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=50

# Calculation Limits (optional)
MAX_INITIAL_SAVINGS=1000000
MAX_MONTHLY_DEPOSIT=10000
MAX_INTEREST_RATE=20
MAX_YEARS=100
```

2. Create a `.env.local` file in the `client` directory for frontend environment variables:

```
# API Configuration
VITE_BACKEND_URL=http://localhost:3001
VITE_APP_TITLE=MoneyGrow Calculator

# Feature Flags
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_DETAILED_LOGS=true

# Deployment Environment
VITE_ENVIRONMENT=development
```

3. For production, create a `.env.production` file in the project root:

```
# Server Configuration
PORT=3001
NODE_ENV=production

# CORS Settings (replace with your actual domain)
CORS_ALLOWED_ORIGINS=https://yourdomain.com

# Rate Limiting (stricter for production)
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=30

# Calculation Limits
MAX_INITIAL_SAVINGS=1000000
MAX_MONTHLY_DEPOSIT=10000
MAX_INTEREST_RATE=20
MAX_YEARS=100
```

4. For production frontend, create a `.env.production` file in the `client` directory:

```
# API Configuration
VITE_API_URL=https://yourdomain.com/api
VITE_APP_TITLE=MoneyGrow Calculator

# Feature Flags
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_DETAILED_LOGS=false

# Deployment Environment
VITE_ENVIRONMENT=production
```

> **Note**: In Vite, all environment variables for client-side use must be prefixed with `VITE_` to be accessible in your React code.

### Run Commands

#### Development

```bash
# Install dependencies
yarn install

# Create environment files
touch .env
touch client/.env.local

# Fill the environment files with appropriate values (see Environment Setup section)

# Start both client and server in development mode
yarn start

# Start server only (with auto-reload)
yarn dev

# Start client only
yarn client

# Run client tests
cd client && yarn test
```

#### Production

```bash
# Build server
yarn build

# Build client
cd client && yarn build

# Start production server (after building)
NODE_ENV=production yarn start:prod
```

### Adding New Features

1. **Backend**:
   - Add TypeScript interfaces in `/src/api/interfaces/`
   - Implement business logic in `/src/api/services/`
   - Create controllers in `/src/api/controllers/`
   - Define routes in `/src/api/routes/`
   - Register new routes in `/src/api/routes/index.ts`

2. **Frontend**:
   - Add API service methods in `/client/src/shared/services/`
   - Create new components in appropriate directories
   - Add routes in `/client/src/App.tsx` if needed
   - Implement state management with hooks or context

### Future Enhancements

- **Authentication**: JWT-based auth system with refresh tokens
- **Database Integration**: MongoDB/PostgreSQL for persistent storage
- **Caching**: Redis for improved performance
- **Logging**: Winston/Pino for structured logging
- **Monitoring**: Prometheus metrics for system health
- **CI/CD**: GitHub Actions or Jenkins pipeline for automated testing and deployment
- **Containerization**: Docker and Kubernetes for container orchestration
- **Serverless**: AWS Lambda for specific high-scale functions

### Troubleshooting

#### Port Already in Use

If you encounter the following error when starting the server:

```
Error: listen EADDRINUSE: address already in use :::3001
```

You can resolve it by:

1. **Finding and killing the process using the port**:
   ```bash
   # Find the process using port 3001
   lsof -i :3001
   
   # Kill the process (replace PID with the process ID from previous command)
   kill -9 <PID>
   ```

2. **Changing the port number in your .env file**:
   ```
   PORT=3002
   ```
   
   Also update the related port in your client `.env.local`:
   ```
   VITE_API_URL=http://localhost:3002/api
   ```

#### Missing Dependencies

If you encounter errors about missing dependencies:

```bash
# Install global dependencies (if needed)
npm install -g typescript ts-node concurrently

# Reinstall project dependencies
rm -rf node_modules
yarn install

# Reinstall client dependencies
cd client
rm -rf node_modules
yarn install
```

## The challenge

Create a web-app that shows how much you can expect to make from your savings over time.

The app must satisfy the following Acceptance Criteria (ACs):

- It should allow the user to vary the initial savings amount, monthly deposit and interest rate through the UI
- It should display how much the user's initial savings amount will be worth over the next 50 years. This should assume that the monthly amount is paid in each month, and the value rises with the interest rate supplied. There are resources online about calculating compound interest totals - e.g. [Wikipedia](https://en.wikipedia.org/wiki/Compound_interest#Investing:_monthly_deposits)
- All calculations must take place server-side, and all monthly projection data should be returned via an endpoint
- The calculations must be triggered onChange of any input, to give live feedback on the input data. The performance (try the slider) should be reasonable.

### Our Guidance

The challenge should not take any more than 2-3 hours. You do not need to complete the challenge in one go.

These are some qualities we value:

- Well-modularised, robust and clearly-written code
- Maintainability. Another team member should be able to easily work with your code after you've finished.
- Single Responsibility Principle
- A well-organised codebase. You should think about how your codebase might grow as the project becomes more complex.
- Simple, elegant but fun UX

The UI has been started, as well as some simple setup logic on the server. How you connect these and structure logic is up to you! Feel free to make changes to any of the code provided (including the UI) if you wish.

We have chosen to include a basic design system on the client, to give you an idea of how we like to build UIs. For this challenge we have used [Chakra JS](https://chakra-ui.com/docs/getting-started). You can pass in styling props to the components including margins/padding etc like this:

```
// This produces a Box (styled div) with a top margin of 2, padding of 3 and a black background colour.
// Colours and spacing properties are defined in `themes/index.tsx`
<Box mt={2} p={3} bg='black'>
```

Although the API might be relatively straightforward, please try and write the API code as if you were building something more complex. We would like to gain an idea of how you would go about structuring API code.

Other than the above AC, feel free to take the challenge in any direction you feel best showcase your strengths!

**Once complete**, please drop us a brief note (either an email, or in the readme somewhere) explaining:

- How you approached the challenge
- What bits of your solution you like
- What bits of your solution you'd like to improve upon or would develop next

Any images/gifs of the finished product would be helpful too!

### Using AI

We believe a modern developer workflow should make use of the best tools available, so we would encourage you to use AI tools for this challenge - hopefully it saves you some time!

At the time of writing we are using [CursorAI](https://www.cursor.com/). It has a free trial so you're welcome to give it a go if you haven't already tried it.

Bear in mind that when using AI, you are still responsibility for the quality of the output. The same principles mentioned above still apply. And we will still expect to be able to discuss the end solution, so please ensure you're familiar with what's been committed.

### Tooling

The frontend contains some tooling you might be familiar with

#### Typescript

If you like to use Typescript in your workflow, you should get any client warnings/errors appear in your terminal after running `yarn start`.

You can also run the server types using `yarn types`.

We believe strong TS typing will make your code much more robust.

#### Prettier

We believe Prettier makes your life easier! There is an example .prettierrc included in the `frontend` directory - feel free to tweak the settings if you'd prefer.

You might need to give your IDE a nudge to pick the settings up - [here's an example](https://stackoverflow.com/a/58669550/4388938) of how to do that with VS Code
