# SCIOWA Cosmic Playlist App

**Requirements:** a server with either:

- the latest version of Node.js and NPM 
- Docker and Docker Compose installed

## Getting Started

First, clone this directory on a server:

```bash
git clone https://github.com/rollmug/sci-cosmic-playlist.git
# then:
cd sci-cosmic-playlist
npm install
```

### Set Environment vars:

In the project root directory, create a file called `.env.local` and add the following text, configuring the URLs as needed:

```dotenv
SCI_CONTROL_API_URL=https://path-to-api
GRAPHQL_URL=https://path-to-directus/graphql
FILES_BASE_URL=https://path-to-directus/assets

CACHE_DELAY=20
NEXT_PUBLIC_SCI_CONTROL_API_URL=$SCI_CONTROL_API_URL
NEXT_PUBLIC_FILES_BASE_URL=$FILES_BASE_URL
```


### Development:

To run the development server in Node (for testing):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production:

For production use, run the following command:

```bash
docker-compose up -d --build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result