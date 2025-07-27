// Game choice type
export interface Choice {
    id: number;
    name: string;
}

// Possible game results
export type Result = 'win' | 'lose' | 'tie';

// Response from play API
export interface PlayResponse {
    results: Result;
    player: number;
    computer: number;
}
