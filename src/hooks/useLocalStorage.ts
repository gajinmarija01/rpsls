import { useState } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
    // Get value from localStorage or use initial value
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    // Function to update both state and localStorage
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Handle function updates like useState
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }

    const clearStorage = () => {
        try {
            window.localStorage.removeItem(key)
            setStoredValue(initialValue)
        } catch (error) {
            console.error(`Error clearing localStorage key "${key}":`, error)
        }
    }

    return [storedValue, setValue, clearStorage] as const
} 