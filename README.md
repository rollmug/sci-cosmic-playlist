# SCIOWA Cosmic Playlist App

**Requirements:** a server with either:

- the latest version of Node.js and NPM 
- Docker and Docker Compose installed

## Getting Started

First, clone this directory on a server:

```bash
git clone https://github.com/rollmug/sci-cosmic-playlist.git
```

### Development run:

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