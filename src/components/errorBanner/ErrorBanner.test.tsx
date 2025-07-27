import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorBanner from './ErrorBanner';

describe('ErrorBanner', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders error message', () => {
        render(<ErrorBanner message="Test error message" />);
        expect(screen.getByTestId('error-message')).toHaveTextContent('Test error message');
    });

    it('renders retry button when onRetry is provided', () => {
        const mockOnRetry = jest.fn();
        render(<ErrorBanner message="Error" onRetry={mockOnRetry} />);
        expect(screen.getByTestId('retry-button')).toBeInTheDocument();
    });

    it('does not render retry button when onRetry is not provided', () => {
        render(<ErrorBanner message="Error" />);
        expect(screen.queryByTestId('retry-button')).not.toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', async () => {
        const mockOnRetry = jest.fn();
        const user = userEvent.setup();

        render(<ErrorBanner message="Error" onRetry={mockOnRetry} />);

        const retryButton = screen.getByTestId('retry-button');
        await user.click(retryButton);

        expect(mockOnRetry).toHaveBeenCalledTimes(1);
    });

    it('has correct aria-label on retry button', () => {
        const mockOnRetry = jest.fn();
        render(<ErrorBanner message="Error" onRetry={mockOnRetry} />);

        const button = screen.getByTestId('retry-button');
        expect(button).toHaveAttribute('aria-label', 'Retry');
    });

    it('renders with different error messages', () => {
        const messages = ['Network error occurred', 'Failed to load data'];

        messages.forEach(message => {
            cleanup();
            render(<ErrorBanner message={message} />);
            expect(screen.getByTestId('error-message')).toHaveTextContent(message);
        });
    });
}); 