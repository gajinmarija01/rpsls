# RPSLS Arcade Game

A Rock, Paper, Scissors, Lizard, Spock game built with React and TypeScript. Has a retro arcade look with a resetable score tracking. Includes a backend service that fallbacks to the provided external API.

## Game BE Service

This project includes a Node.js backend service that implements the RPSLS game logic and provides a RESTful API.
In case the projects BE server isn't run - the app fallbacks to the provided external API.

### Backend API Endpoints

- `GET /choices` - Get all available choices
- `GET /choice` - Get a random choice
- `POST /play` - Play a round against the computer

### Running the Backend Service

```bash
cd backend
npm install
npm start
```

The service will start on port 3001.

## Game Frontend

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation & Running

1. **Clone the repo**

   ```bash
   git clone <repository-url>
   cd rpsls
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start dev server**

   ```bash
   npm run dev
   ```

4. **Open browser**
   Go to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Game Rules

RPSLS rules - each choice beats two others and loses to two others:

- **Rock** beats Scissors and Lizard
- **Paper** beats Rock and Spock
- **Scissors** beats Paper and Lizard
- **Lizard** beats Spock and Paper
- **Spock** beats Rock and Scissors

## Testing

Run tests:

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

### Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## Configuration

### Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

**Built with React, TypeScript, and Vite**
