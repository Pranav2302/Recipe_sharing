
// Set secure token with expiration
export const setAuthToken = (token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenTimestamp', Date.now().toString());
  };
  
  // Check if token is expired (24 hour expiration)
  export const isTokenExpired = () => {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (!tokenTimestamp) return true;
    
    const now = Date.now();
    const tokenTime = parseInt(tokenTimestamp, 10);
    const expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    
    return now - tokenTime > expirationTime;
  };
  
  // Get token if valid
  export const getValidToken = () => {
    const token = localStorage.getItem('token');
    return token && !isTokenExpired() ? token : null;
  };
  
  // Clear auth data
  export const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
  };