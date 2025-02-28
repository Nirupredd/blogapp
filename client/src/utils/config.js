// Determine if we're in development mode
const isDevelopment = import.meta.env.MODE === 'development';

// Get the base URL based on environment
export const getBaseUrl = () => {
  return 'http://localhost:10000'
}; 