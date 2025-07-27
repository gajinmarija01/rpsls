import axios from 'axios'
import type { Choice, PlayResponse } from '../types'

// API base URL with fallback - try local backend first, then external API
const LOCAL_API_BASE = 'http://localhost:3001'
const EXTERNAL_API_BASE = 'https://codechallenge.boohma.com'

// Setup axios with timeout
const apiClient = axios.create({
    timeout: 10000,
})

// Handle API errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 404) {
            throw new Error('Game service not found. Please try again later.')
        }
        if (error.response?.status >= 500) {
            throw new Error('Server error. Please try again later.')
        }
        throw new Error(error.response?.data?.message || 'An unexpected error occurred.')
    }
)

// Helper function to try local backend first, then fallback to external API
const tryApiCall = async <T>(
    localCall: () => Promise<T>,
    fallbackCall: () => Promise<T>
): Promise<T> => {
    try {
        // Try local backend first
        return await localCall()
    } catch (error) {
        console.log('Local backend failed, trying external API')
        try {
            // Fallback to external API
            return await fallbackCall()
        } catch (fallbackError) {
            console.error('Both APIs failed:', error, fallbackError)
            throw fallbackError // Throw fallback error 
        }
    }
}

// Get all available choices from the API
export const getChoices = async (): Promise<Choice[]> => {
    return tryApiCall(
        // Try local backend first
        async () => {
            const response = await apiClient.get(`${LOCAL_API_BASE}/choices`)
            return response.data
        },
        // Fallback to external API
        async () => {
            const response = await apiClient.get(`${EXTERNAL_API_BASE}/choices`)
            return response.data
        }
    )
}

// Play a game round
export const play = async (playerId: number): Promise<PlayResponse> => {
    return tryApiCall(
        // Try local backend first
        async () => {
            const response = await apiClient.post(`${LOCAL_API_BASE}/play`, { player: playerId })
            return response.data
        },
        // Fallback to external API
        async () => {
            const response = await apiClient.post(`${EXTERNAL_API_BASE}/play`, { player: playerId })
            return response.data
        }
    )
}

// Get a random choice
export const getRandomChoice = async (): Promise<Choice> => {
    return tryApiCall(
        // Try local backend first
        async () => {
            const response = await apiClient.get(`${LOCAL_API_BASE}/choice`)
            return response.data
        },
        // Fallback to external API
        async () => {
            const response = await apiClient.get(`${EXTERNAL_API_BASE}/choice`)
            return response.data
        }
    )
}
