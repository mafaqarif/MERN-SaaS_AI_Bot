# AI SaaS Chatbot

An AI-powered SaaS chatbot application leveraging OpenAI's API, built with the MERN stack. This project is designed to provide an interactive and intelligent chatbot experience.

## Features

- **Frontend**: Developed with React and TypeScript using Vite for fast build and development.
- **Backend**: Built with Node.js and Express for robust and scalable API handling.
- **Database**: MongoDB for flexible and scalable data storage.
- **AI Integration**: Utilizes OpenAI API for natural language understanding and generation.
- **SaaS Capability**: Designed to handle multiple users with configurable chatbot settings.

## Technologies Used

### Frontend:

- React
- TypeScript
- Vite
- Axios (for API calls)
- TailwindCSS (optional, for styling)

### Backend:

- Node.js
- Express
- OpenAI API
- JSON Web Tokens (JWT) for authentication

### Database:

- MongoDB (via Mongoose ODM)

## Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- OpenAI API Key

### Clone the Repository

```bash
git clone https://github.com/yourusername/ai-saas-chatbot.git
cd ai-saas-chatbot

```

## Backend Setup

Navigate to the backend directory:

```bash

cd backend
```

Install dependencies:

```bash
npm install
```

Create a .env file in the backend directory and configure the following:

```env
OPEN_AI_SECRET=your_open_ai_secret
ORGANIZATION_ID=your_organization_id
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

Start the backend server:

```bash
npm run dev
```

Project Structure

```lua
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── utils
│   ├── server.js
│   └── package.json
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.tsx
│   ├── vite.config.ts
│   └── package.json
├── README.md
```

### API Endpoints (Backend)

Authentication
POST /api/user/signup: Register a new user.
POST /api/user/login: Log in an existing user.

### Chatbot

POST /api/chat: Handle chatbot interactions.

## Future Enhancements

User interface improvements.
Multi-language support.
Additional chatbot configurations.
Integration with third-party services.
