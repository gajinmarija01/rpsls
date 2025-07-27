import { useQuery, useMutation } from '@tanstack/react-query'
import { getChoices, play } from '../api/gameService'
import type { PlayResponse } from '../types'

// Hook to get available choices
export const useChoices = (options = {}) =>
    useQuery({ queryKey: ['choices'], queryFn: getChoices, ...options })

// Hook to play a game round
export const usePlay = (options = {}) =>
    useMutation<PlayResponse, Error, number>({ mutationFn: play, ...options })
