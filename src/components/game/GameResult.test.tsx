import { render, screen } from '@testing-library/react';
import GameResult from './GameResult';

const mockResult = {
    results: 'win' as 'win',
    player: 1,
    computer: 2
};

describe('GameResult', () => {
    it('renders game result component', () => {
        render(<GameResult result={mockResult} />);
        expect(screen.getByText('Win')).toBeInTheDocument();
    });

    it('displays win result correctly', () => {
        render(<GameResult result={mockResult} />);
        expect(screen.getByText('Win')).toBeInTheDocument();
    });

    it('displays lose result correctly', () => {
        const loseResult = { ...mockResult, results: 'lose' as 'lose' };
        render(<GameResult result={loseResult} />);
        expect(screen.getByText('Lose')).toBeInTheDocument();
    });

    it('displays tie result correctly', () => {
        const tieResult = { ...mockResult, results: 'tie' as 'tie' };
        render(<GameResult result={tieResult} />);
        expect(screen.getByText('Tie')).toBeInTheDocument();
    });

    it('displays player and computer choices', () => {
        render(<GameResult result={mockResult} />);
        expect(screen.getByText('Rock')).toBeInTheDocument();
        expect(screen.getByText('Paper')).toBeInTheDocument();
    });

    it('handles different player choices', () => {
        const scissorsResult = { ...mockResult, player: 3 };
        render(<GameResult result={scissorsResult} />);
        expect(screen.getByText('Scissors')).toBeInTheDocument();
    });

    it('handles different computer choices', () => {
        const spockResult = { ...mockResult, computer: 5 };
        render(<GameResult result={spockResult} />);
        expect(screen.getByText('Spock')).toBeInTheDocument();
    });
}); 