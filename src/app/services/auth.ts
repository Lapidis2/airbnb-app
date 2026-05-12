const API_BASE_URL = 'https://airbnb-api-c4yx.onrender.com/api/v1';

export interface LoginRequest {
  email: string;
  password: string;
  role: 'GUEST' | 'HOST' | 'ADMIN';
}

export interface RegisterRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  role: 'GUEST' | 'HOST' | 'ADMIN';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      username: string;
      phone: string;
      role: 'GUEST' | 'HOST' | 'ADMIN';
      avatar?: string | null;
      bio?: string | null;
      createdAt: string;
      updatedAt: string;
    };
    token: string;
  };
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  console.log('Sending login data:', data); // Debug logging

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log('Login response status:', response.status); // Debug logging

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Login error response:', errorText);
    throw new Error(`Login failed: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  console.log('Login success response:', result);
  return result;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  console.log('Sending registration data:', JSON.stringify(data, null, 2)); // Debug logging with full object

  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log('Registration response status:', response.status); // Debug logging

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Registration error response:', errorText);
    throw new Error(`Registration failed: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  console.log('Registration success response:', result);
  return result;
}