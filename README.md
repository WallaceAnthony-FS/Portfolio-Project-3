# Portfolio Project 3

## Project Overview

Application for browsing the Spotify API.

### Features

- Browse the Spotify API
- Search for artists, albums, and tracks
- View artist, album, and track details
- View artist, album, and track audio features

### Technologies

- React
- Next.js
- TailwindCSS
- TypeScript
- Prisma
- sqlite
- tRPC
- Auth.js
- Spotify API

## Prerequisites

- NodeJS >= v18
- NPM

## Getting Started

To get started with the project, follow the instructions below.

Clone the repository:

```bash
git clone https://github.com/WallaceAnthony-FS/Portfolio-Project-3.git
```

Change directory into the project:

```bash
cd Portfolio-Project-3
```

To install the project, run the following command:

```bash
npm install
```

To sync prisma with your db and generate ts types run:

```bash
npx prisma db push
```

To start the project, run the following command:

```bash
npm run dev
```

## Links

Once running locally, the project can be accessed at the following URL:

http://localhost:3000

API Routes:
| Route | Description |
| --- | --- |
| /api/albums | Get recommended albums |
| /api/categories | Get categories |
| /api/search?q=<search> | Search for artists, albums, and tracks |
| /api/auth/signin | Sign in with Spotify |
