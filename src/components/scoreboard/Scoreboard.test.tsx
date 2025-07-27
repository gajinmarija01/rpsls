import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Scoreboard from './Scoreboard';

const mockHistory = [
    { results: 'win' as 'win', player: 1, computer: 2 },
    { results: 'lose' as 'lose', player: 2, computer: 1 },
    { results: 'tie' as 'tie', player: 3, computer: 3 }
];

describe('Scoreboard', () => {
    it('renders scoreboard component', () => {
        render(
            <Scoreboard
                history={mockHistory}
            />
        );
        expect(screen.getByTestId('scoreboard')).toBeInTheDocument();
    });

    it('renders history items', () => {
        render(<Scoreboard history={mockHistory} />);
        expect(screen.getByTestId('scoreboard-list')).toBeInTheDocument();
        expect(screen.getByTestId('scoreboard-item-0')).toBeInTheDocument();
        expect(screen.getByTestId('scoreboard-item-1')).toBeInTheDocument();
        expect(screen.getByTestId('scoreboard-item-2')).toBeInTheDocument();
    });

    it('renders reset button when onReset is provided', () => {
        const mockOnReset = jest.fn();
        render(<Scoreboard history={mockHistory} onReset={mockOnReset} />);
        expect(screen.getByTestId('reset-button')).toBeInTheDocument();
    });

    it('does not render reset button when onReset is not provided', () => {
        render(<Scoreboard history={mockHistory} />);
        expect(screen.queryByTestId('reset-button')).not.toBeInTheDocument();
    });

    it('calls onReset when reset button is clicked', async () => {
        const mockOnReset = jest.fn();
        const user = userEvent.setup();

        render(<Scoreboard history={mockHistory} onReset={mockOnReset} />);

        const resetButton = screen.getByTestId('reset-button');
        await user.click(resetButton);

        expect(mockOnReset).toHaveBeenCalledTimes(1);
    });

    it('renders empty list when history is empty', () => {
        render(<Scoreboard history={[]} />);
        expect(screen.getByTestId('scoreboard-list')).toBeInTheDocument();
        expect(screen.queryByTestId('scoreboard-item-0')).not.toBeInTheDocument();
    });

    it('displays correct result text', () => {
        render(<Scoreboard history={mockHistory} />);
        expect(screen.getByTestId('scoreboard-item-0')).toHaveTextContent('WIN');
        expect(screen.getByTestId('scoreboard-item-1')).toHaveTextContent('LOSE');
        expect(screen.getByTestId('scoreboard-item-2')).toHaveTextContent('TIE');
    });

    it('handles multiple history items', () => {
        const longHistory = [
            { results: 'win' as 'win', player: 1, computer: 2 },
            { results: 'lose' as 'lose', player: 2, computer: 1 },
            { results: 'tie' as 'tie', player: 3, computer: 3 },
            { results: 'win' as 'win', player: 4, computer: 5 },
            { results: 'lose' as 'lose', player: 5, computer: 4 }
        ];

        render(<Scoreboard history={longHistory} />);

        expect(screen.getByTestId('scoreboard-item-0')).toBeInTheDocument();
        expect(screen.getByTestId('scoreboard-item-4')).toBeInTheDocument();
    });
}); 