# DeFi Trading Education Portal

A Next.js application for decentralized finance education with challenges and tracking.

## Features

- User authentication with NextAuth.js
- MongoDB Atlas integration
- Challenge tracking and completion
- User progress dashboard
- Trading education content

## Setup Instructions

### Prerequisites

- Node.js 16.8 or later
- MongoDB Atlas account

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register)
2. Create a new project
3. Build a new cluster (free tier works fine for development)
4. Set up database access:
   - Go to Security → Database Access
   - Add a new database user with a username and password
   - Give the user "Read and write to any database" permissions
5. Configure network access:
   - Go to Security → Network Access
   - Add your current IP address or set to "Allow Access from Anywhere" for development
6. Get your connection string:
   - Go to Databases → Connect → Connect your application
   - Select "Node.js" and version "4.1 or later"
   - Copy the connection string

### Environment Setup

1. Copy the `.env.example` file to create a new file named `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit the `.env.local` file:
   - Replace `MONGODB_URI` with your MongoDB Atlas connection string
   - Replace `username` and `password` with your MongoDB Atlas credentials
   - Generate a secure random string for `AUTH_SECRET` (you can use `openssl rand -base64 32` in terminal)
   - Configure OAuth providers if needed (Google, GitHub)

### Installation

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - UI components
- `/lib` - Utility functions and MongoDB connection
- `/lib/models` - Mongoose schema models
- `/lib/actions` - Server actions for data operations

## Environment Variables

The following environment variables are required:

- `MONGODB_URI` - MongoDB Atlas connection string
- `AUTH_SECRET` - Secret for NextAuth.js (JWT encryption)
- `NEXTAUTH_URL` - Base URL of your application (http://localhost:3000 for development)

Optional OAuth environment variables:

- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` 