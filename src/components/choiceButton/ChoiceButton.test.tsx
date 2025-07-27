import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChoiceButton from './ChoiceButton';

describe('ChoiceButton', () => {
    const defaultProps = {
        icon: 'Rock',
        label: 'Rock',
        onClick: jest.fn()
    };

    it('renders choice button with icon and label', () => {
        render(<ChoiceButton {...defaultProps} />);

        expect(screen.getByTestId('choice-button-rock')).toBeInTheDocument();
        expect(screen.getByText('Rock')).toBeInTheDocument();
    });

    it('calls onClick when button is clicked', async () => {
        const mockOnClick = jest.fn();
        const user = userEvent.setup();

        render(<ChoiceButton {...defaultProps} onClick={mockOnClick} />);

        const button = screen.getByTestId('choice-button-rock');
        await user.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });


    it('renders different choices correctly', () => {
        const { rerender } = render(<ChoiceButton {...defaultProps} />);

        expect(screen.getByText('Rock')).toBeInTheDocument();

        rerender(<ChoiceButton icon="Paper" label="Paper" onClick={jest.fn()} />);
        expect(screen.getByText('Paper')).toBeInTheDocument();
    });

    it('renders with different icons', () => {
        const { rerender } = render(<ChoiceButton {...defaultProps} />);

        expect(screen.getByText('Rock')).toBeInTheDocument();

        rerender(<ChoiceButton icon="Scissors" label="Scissors" onClick={jest.fn()} />);
        expect(screen.getByText('Scissors')).toBeInTheDocument();
    });
}); 