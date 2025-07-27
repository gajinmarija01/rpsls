import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GamePage from './Game';
import * as hooks from '../../hooks';
import * as gameService from '../../api/gameService';

// Mock gameService to avoid import.meta issues
jest.mock('../../api/gameService', () => ({
    getRandomChoice: jest.fn()
}));

// Mock hooks
// could be done with MSW, that could be used to run the app
// in the mock enviroment, but seemed like an overkill  
jest.mock('../../hooks', () => ({
    useChoices: jest.fn(),
    usePlay: jest.fn(),
    useLocalStorage: jest.fn(() => [[], jest.fn(), jest.fn()])
}));

const mockChoices = [
    { id: 1, name: 'rock' },
    { id: 2, name: 'paper' },
    { id: 3, name: 'scissors' },
    { id: 4, name: 'lizard' },
    { id: 5, name: 'spock' }
];

const mockHistory = [
    { results: 'win' as 'win', player: 1, computer: 2 },
    { results: 'lose' as 'lose', player: 2, computer: 1 }
];

describe('GamePage', () => {
    let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient({
            defaultOptions: {
                queries: { retry: false },
                mutations: { retry: false }
            }
        });

        (hooks.useChoices as jest.Mock).mockReturnValue({
            data: mockChoices,
            isLoading: false,
            error: null
        });

        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
            isPending: false
        });
    });

    it('renders game component', () => {
        // this wrapper could be moved to a test utils file (renderWithProviders method) 
        // and reused for all tests to avoid repeating the same code 
        // and potential confusing errors
        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        expect(screen.getByText('RPSLS ARCADE')).toBeInTheDocument();
        expect(screen.getByTestId('choice-button-rock')).toBeInTheDocument();
        expect(screen.getByTestId('choice-button-paper')).toBeInTheDocument();
        expect(screen.getByTestId('choice-button-scissors')).toBeInTheDocument();
        expect(screen.getByTestId('choice-button-lizard')).toBeInTheDocument();
        expect(screen.getByTestId('choice-button-spock')).toBeInTheDocument();
        expect(screen.getByTestId('choice-button-random')).toBeInTheDocument();

    });

    it('shows loading state', () => {
        (hooks.useChoices as jest.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('shows error state', () => {
        (hooks.useChoices as jest.Mock).mockReturnValue({
            data: null,
            isLoading: false,
            isError: true,
            error: { message: 'Failed to load choices' }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        expect(screen.getByTestId('error-banner')).toBeInTheDocument();
        expect(screen.getByTestId('error-message')).toHaveTextContent('Oops! Something went wrong.');
    });

    it('handles user choice selection', () => {
        const mockMutate = jest.fn();

        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        const rockButton = screen.getByTestId('choice-button-rock');
        rockButton.click();

        expect(mockMutate).toHaveBeenCalledTimes(1);
    });

    it('handles random choice selection', async () => {
        (gameService.getRandomChoice as jest.Mock)
            .mockResolvedValue({ id: 3, name: 'scissors' });

        const mockMutate = jest.fn();

        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        const randomButton = screen.getByTestId('choice-button-random');
        randomButton.click();

        expect(gameService.getRandomChoice).toHaveBeenCalledTimes(1);
    });

    it('displays game rules link', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        const rulesLink = screen.getByText('Game Rules');
        expect(rulesLink).toBeInTheDocument();
        expect(rulesLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Rock_paper_scissors#Additional_weapons');
        expect(rulesLink).toHaveAttribute('target', '_blank');
    });

    it('renders scoreboard component', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        expect(screen.getByText('LEADERBOARD')).toBeInTheDocument();
    });

    it('handles error during random choice', async () => {
        (gameService.getRandomChoice as jest.Mock)
            .mockRejectedValue(new Error('API Error'));

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        const randomButton = screen.getByTestId('choice-button-random');
        randomButton.click();

        expect(gameService.getRandomChoice).toHaveBeenCalledTimes(1);
    });

    it('handles play mutation error', () => {
        const mockMutate = jest.fn();

        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: mockMutate,
            isPending: false
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        const rockButton = screen.getByTestId('choice-button-rock');
        rockButton.click();

        expect(mockMutate).toHaveBeenCalledWith(1, expect.objectContaining({
            onError: expect.any(Function)
        }));
    });

    it('shows loading state during play', () => {
        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
            isPending: true
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('handles reset history and clears localStorage', () => {
        const mockClearStorage = jest.fn();
        const mockSetGameHistory = jest.fn();

        (hooks.useLocalStorage as jest.Mock).mockReturnValue([
            mockHistory,
            mockSetGameHistory,
            mockClearStorage
        ]);

        (hooks.useChoices as jest.Mock).mockReturnValue({
            data: mockChoices,
            isLoading: false,
            error: null
        });

        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
            isPending: false
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        const resetButton = screen.getByTestId('reset-button');
        resetButton.click();

        expect(mockClearStorage).toHaveBeenCalledTimes(1);
        expect(mockSetGameHistory).toHaveBeenCalledWith([]);
    });

    it('clears current result when reset is clicked', () => {
        const mockClearStorage = jest.fn();
        const mockSetGameHistory = jest.fn();

        (hooks.useLocalStorage as jest.Mock).mockReturnValue([
            mockHistory,
            mockSetGameHistory,
            mockClearStorage
        ]);

        (hooks.useChoices as jest.Mock).mockReturnValue({
            data: mockChoices,
            isLoading: false,
            error: null
        });

        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
            isPending: false
        });

        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );

        const resetButton = screen.getByTestId('reset-button');
        resetButton.click();

        expect(mockClearStorage).toHaveBeenCalledTimes(1);
        expect(mockSetGameHistory).toHaveBeenCalledWith([]);
    });

    it('shows placeholder when no current result', () => {
        (hooks.useLocalStorage as jest.Mock).mockReturnValue([
            [],
            jest.fn(),
            jest.fn()
        ]);
        (hooks.useChoices as jest.Mock).mockReturnValue({
            data: mockChoices,
            isLoading: false,
            error: null
        });
        (hooks.usePlay as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
            isPending: false
        });
        render(
            <QueryClientProvider client={queryClient}>
                <GamePage />
            </QueryClientProvider>
        );
        expect(screen.getByText('Choose your weapon!')).toBeInTheDocument();
    });
}); 