import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
    it('renders loading component', () => {
        render(<Loader />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('renders consistently', () => {
        const { rerender } = render(<Loader />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();

        rerender(<Loader />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('displays loading text', () => {
        render(<Loader />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
}); 