# RPSLS BE Game Service

A Node.js backend service for the Rock Paper Scissors Lizard Spock (RPSLS) game.

## Installation

```bash
cd backend
npm install
```

## Running the Service

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The service will start on port 3001 by default. You can change this by setting the `PORT` environment variable.

## API Endpoints

### GET /choices

Get all available choices for the game.

**Response:**

```json
[
  {
    "id": 1,
    "name": "rock"
  },
  {
    "id": 2,
    "name": "paper"
  },
  {
    "id": 3,
    "name": "scissors"
  },
  {
    "id": 4,
    "name": "lizard"
  },
  {
    "id": 5,
    "name": "spock"
  }
]
```

### GET /choice

Get a randomly generated choice from the computer.

**Response:**

```json
{
  "id": 3,
  "name": "scissors"
}
```

### POST /play

Play a round against the computer.

**Request Body:**

```json
{
  "player": 1
}
```

**Response:**

```json
{
  "results": "win",
  "player": 1,
  "computer": 3
}
```

## Environment Variables

- `PORT`: Server port (default: 3001)
