// utils/auth.ts
import Cookies from 'js-cookie';

// Dummy user data
export const DUMMY_USERS = {
  admin: {
    email: 'admin@mail.com',
    password: '12345678',
    role: 'admin',
    name: 'Admin User',
  },
  user: {
    email: 'user@mail.com',
    password: '12345678',
    role: 'user',
    name: 'Regular User',
  },
};

// Correct OTP for registration
export const CORRECT_OTP = '000000';

// Login function
export const login = (email: string, password: string) => {
  // Check admin credentials
  if (email === DUMMY_USERS.admin.email && password === DUMMY_USERS.admin.password) {
    const token = btoa(JSON.stringify({ email, role: 'admin', timestamp: Date.now() }));
    Cookies.set('auth-token', token, { expires: 30 }); // 30 days
    Cookies.set('user-role', 'admin', { expires: 30 });
    Cookies.set('user-email', email, { expires: 30 });
    Cookies.set('user-name', DUMMY_USERS.admin.name, { expires: 30 });
    return { success: true, role: 'admin', redirectTo: '/dashboard' };
  }

  // Check user credentials
  if (email === DUMMY_USERS.user.email && password === DUMMY_USERS.user.password) {
    const token = btoa(JSON.stringify({ email, role: 'user', timestamp: Date.now() }));
    Cookies.set('auth-token', token, { expires: 30 });
    Cookies.set('user-role', 'user', { expires: 30 });
    Cookies.set('user-email', email, { expires: 30 });
    Cookies.set('user-name', DUMMY_USERS.user.name, { expires: 30 });
    return { success: true, role: 'user', redirectTo: '/' };
  }

  return { success: false, error: 'Invalid email or password' };
};

// Register function
export const register = (name: string, email: string, password: string) => {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Invalid email format' };
  }

  // Store registration data in localStorage temporarily (for OTP verification)
  localStorage.setItem('pending-registration', JSON.stringify({
    name,
    email,
    password,
    timestamp: Date.now(),
  }));

  return { success: true, message: 'Registration initiated. Please verify OTP.' };
};

// Verify OTP function
export const verifyOTP = (otp: string) => {
  if (otp !== CORRECT_OTP) {
    return { success: false, error: 'Invalid OTP. Please use 000000' };
  }

  // Get pending registration data
  const pendingData = localStorage.getItem('pending-registration');
  if (!pendingData) {
    return { success: false, error: 'No pending registration found' };
  }

  const userData = JSON.parse(pendingData);
  
  // Create user session (default to user role)
  const token = btoa(JSON.stringify({ 
    email: userData.email, 
    role: 'user', 
    timestamp: Date.now() 
  }));
  
  Cookies.set('auth-token', token, { expires: 30 });
  Cookies.set('user-role', 'user', { expires: 30 });
  Cookies.set('user-email', userData.email, { expires: 30 });
  Cookies.set('user-name', userData.name, { expires: 30 });

  // Clear pending registration
  localStorage.removeItem('pending-registration');

  return { success: true, role: 'user', redirectTo: '/' };
};

// Logout function
export const logout = () => {
  Cookies.remove('auth-token');
  Cookies.remove('user-role');
  Cookies.remove('user-email');
  Cookies.remove('user-name');
  return { success: true };
};

// Get current user
export const getCurrentUser = () => {
  const token = Cookies.get('auth-token');
  const role = Cookies.get('user-role');
  const email = Cookies.get('user-email');
  const name = Cookies.get('user-name');

  if (!token) {
    return null;
  }

  return {
    email,
    role,
    name,
    isAdmin: role === 'admin',
  };
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!Cookies.get('auth-token');
};

// Check if user is admin
export const isAdmin = () => {
  return Cookies.get('user-role') === 'admin';
};