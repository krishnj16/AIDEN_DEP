// const API_BASE_URL = 'http://localhost:3000/';

// interface ApiResponse<T> {
//   data?: T;
//   error?: string;
// }

// async function request<T>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<ApiResponse<T>> {
//   const token = localStorage.getItem('access_token');
  
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

//   if (token && !endpoint.startsWith('/auth/')) {
//     (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return { error: data.message || data.error || 'An error occurred' };
//     }

//     return { data };
//   } catch (error) {
//     return { error: 'Network error. Please check your connection.' };
//   }
// }

// export interface SignupRequest {
//   email: string;
//   password: string;
//   full_name: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface AuthResponse {
//   message: string;
//   access_token: string;
//   user: {
//     id: string;
//     email: string;
//     full_name: string;
//   };
// }

// export const auth = {
//   signup: (data: SignupRequest) =>
//     request<AuthResponse>('/auth/signup', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     }),

//   login: (data: LoginRequest) =>
//     request<AuthResponse>('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     }),

//   logout: () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user');
//     window.location.href = '/'; 
//   },

//   getToken: () => localStorage.getItem('access_token'),

//   getUser: () => {
//     const user = localStorage.getItem('user');
//     if (!user || user === 'undefined') return null;
    
//     try {
//       return JSON.parse(user);
//     } catch (error) {
//       console.error("Error parsing user data from local storage:", error);
//       localStorage.removeItem('user');
//       return null;
//     }
//   },

//   setAuth: (token: string, user: AuthResponse['user']) => {
//     localStorage.setItem('access_token', token);
//     if (user) {
//         localStorage.setItem('user', JSON.stringify(user));
//     }
//   },

//   isAuthenticated: () => {
//     const token = localStorage.getItem('access_token');
//     return !!token && token !== 'undefined';
//   },
// };

// export interface Persona {
//   id: string;
//   name: string;
//   description: string;
//   role: string;
// }

// export const personas = {
//   getAll: () => 
//     request<Persona[]>('/personas', {
//       method: 'GET',
//     }),
// };

// export default { auth, personas };

// 1. Remove the trailing slash here so we don't get double slashes (//)
// const API_BASE_URL = 'http://localhost:3000';

// interface ApiResponse<T> {
//   data?: T;
//   error?: string;
// }

// async function request<T>(
//   endpoint: string,
//   options: RequestInit = {}
// ): Promise<ApiResponse<T>> {
//   const token = localStorage.getItem('access_token');
  
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...options.headers,
//   };

//   if (token && !endpoint.startsWith('/auth/')) {
//     (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       return { error: data.message || data.error || 'An error occurred' };
//     }

//     return { data };
//   } catch (error) {
//     return { error: 'Network error. Please check your connection.' };
//   }
// }

// export interface SignupRequest {
//   email: string;
//   password: string;
//   full_name: string;
// }

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface AuthResponse {
//   message: string;
//   access_token: string;
//   user: {
//     id: string;
//     email: string;
//     full_name: string;
//   };
// }

// export const auth = {
//   signup: (data: SignupRequest) =>
//     request<AuthResponse>('/auth/signup', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     }),

//   login: (data: LoginRequest) =>
//     request<AuthResponse>('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify(data),
//     }),

//   logout: () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('user');
//     window.location.href = '/'; 
//   },

//   getToken: () => localStorage.getItem('access_token'),

//   getUser: () => {
//     const user = localStorage.getItem('user');
//     if (!user || user === 'undefined') return null;
    
//     try {
//       return JSON.parse(user);
//     } catch (error) {
//       console.error("Error parsing user data from local storage:", error);
//       localStorage.removeItem('user');
//       return null;
//     }
//   },

//   setAuth: (token: string, user: AuthResponse['user']) => {
//     localStorage.setItem('access_token', token);
//     if (user) {
//         localStorage.setItem('user', JSON.stringify(user));
//     }
//   },

//   isAuthenticated: () => {
//     const token = localStorage.getItem('access_token');
//     return !!token && token !== 'undefined';
//   },
// };

// export interface Persona {
//   id: string;
//   name: string;
//   description: string;
//   role: string;
// }

// export const personas = {
//   getAll: () => 
//     request<Persona[]>('/api/personas', {
//       method: 'GET',
//     }),
// };

// ✅ ADDED: The Chat Logic
// export const chat = {
//     // 1. Create a Session (The "Initialize" button)
//     createSession: async (personaId: string, token: string) => {
//       const res = await fetch(`${API_BASE_URL}/api/chats/sessions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ personaId })
//       });
//       return res.json();
//     },

//     // 2. Get History (Loading the chat)
//     getMessages: async (sessionId: string, token: string) => {
//       const res = await fetch(`${API_BASE_URL}/api/chats/${sessionId}/messages`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       return res.json();
//     },

//     // 3. Send Message (Typing)
//     sendMessage: async (sessionId: string, content: string, token: string) => {
//       const res = await fetch(`${API_BASE_URL}/api/chats/${sessionId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ content })
//       });
//       return res.json();
//     }
// };

// export const chat = {
//   // 1. Create a Session (The "Initialize" button)
//   createSession: async (personaId: string, token: string) => {
//     const res = await fetch(`${API_BASE_URL}/api/chats/sessions`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ personaId })
//     });
//     return res.json();
//   },

//   // 2. Get History (Loading the chat)
//   getMessages: async (sessionId: string, token: string) => {
//     const res = await fetch(`${API_BASE_URL}/api/chats/${sessionId}/messages`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   },

//   // 3. Send Message (Typing)
//   sendMessage: async (sessionId: string, content: string, token: string) => {
//     const res = await fetch(`${API_BASE_URL}/api/chats/${sessionId}/messages`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({ content })
//     });
//     return res.json();
//   },

//   // ✅ ADD THIS: Get All Sessions (Sidebar)
//   getAllSessions: async (token: string) => {
//     const res = await fetch(`${API_BASE_URL}/api/chats/sessions`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });
//     return res.json();
//   }
// };


// // ✅ Group Export so you can use `api.auth`, `api.chat`, etc.
// export const api = { auth, personas, chat };
// export default api;

// const API_BASE = 'http://localhost:3000/api';

// export const api = {
//   auth: {
//     getToken: () => localStorage.getItem('token'),
//   },

//   chat: {
//     createSession: async (personaId: string, token: string) => {
//       const res = await fetch(`${API_BASE}/chats`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ personaId }),
//       });
//       return res.json();
//     },

//     getMessages: async (sessionId: string, token: string) => {
//       const res = await fetch(`${API_BASE}/chats/${sessionId}/messages`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       return res.json();
//     },

//     getAllSessions: async (token: string) => {
//       const res = await fetch(`${API_BASE}/chats/sessions`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       return res.json();
//     },

//     // ✅ UPDATED: Vision-aware sendMessage
//     sendMessage: async (
//       sessionId: string,
//       content: string,
//       token: string,
//       image?: string
//     ) => {
//       const res = await fetch(`${API_BASE}/chats/${sessionId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           content,
//           image, // 👁️ Vision payload
//         }),
//       });

//       return res.json();
//     },
//   },
// };
// frontend/src/lib/api.ts

// frontend/src/lib/api.ts

// const API_URL = 'http://localhost:3000/api'; // ✅ CRITICAL FIX: Added /api

// // -------- Types --------
// export interface Persona {
//   id: string;
//   name: string;
//   description?: string;
// }

// // Named export AND Default export to support all your different import styles
// export const api = {
//   // ---------- AUTH ----------
//   auth: {
//     signup: async (email: string, password: string) => {
//       const res = await fetch(`${API_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       // Safety check for non-JSON responses (like 404 pages)
//       if (!res.ok) {
//         const text = await res.text(); 
//         throw new Error(`Server Error ${res.status}: ${text}`);
//       }
//       return res.json();
//     },

//     login: async (email: string, password: string) => {
//       const res = await fetch(`${API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`Login Failed ${res.status}: ${text}`);
//       }
//       return res.json();
//     },

//     getToken: () => localStorage.getItem('token'),

//     isAuthenticated: () => !!localStorage.getItem('token'),

//     getUser: () => {
//       const user = localStorage.getItem('user');
//       return user ? JSON.parse(user) : null;
//     },

//     logout: () => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/';
//     }
//   },

//   // ---------- PERSONAS ----------
//   personas: {
//     getAll: async () => {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/personas`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       return res.json();
//     }
//   },

//   // ---------- CHAT ----------
//   chat: {
//     getSessions: async (token: string) => {
//       const res = await fetch(`${API_URL}/chats`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return res.json();
//     },

//     getAllSessions: async (token: string) => {
//       // Re-use getSessions logic
//       const res = await fetch(`${API_URL}/chats`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return res.json();
//     },

//     createSession: async (personaId: string, token: string) => {
//       const res = await fetch(`${API_URL}/chats`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ personaId })
//       });
//       return res.json();
//     },

//     getMessages: async (sessionId: string, token: string) => {
//       const res = await fetch(`${API_URL}/chats/${sessionId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return res.json();
//     },

//     // ✅ VISION SUPPORT (Preserved)
//     sendMessage: async (
//       sessionId: string,
//       content: string,
//       token: string,
//       image?: string
//     ) => {
//       const res = await fetch(`${API_URL}/chats/${sessionId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         // We send both content (text) and image (base64 string)
//         body: JSON.stringify({ content, image })
//       });
//       return res.json();
//     }
//   }
// };

// export default api;


// ✅ 1. HARDCODE THE URL (Remove the variable logic for now to be 100% sure)
// ✅ FIX 1: Point to the /api namespace we set up in backend
// const API_URL = 'http://localhost:3000/api';

// console.log("⚠️ AIDEN API INITIALIZED AT:", API_URL);

// // -------- Types --------
// export interface Persona {
//   id: string;
//   name: string;
//   description?: string;
// }

// export const api = {
//   // ---------- AUTH ----------
//   auth: {
//     signup: async (email: string, password: string) => {
//       const res = await fetch(`${API_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       if (!res.ok) {
//         const text = await res.text(); 
//         throw new Error(text || 'Signup failed');
//       }
//       return res.json();
//     },

//     login: async (email: string, password: string) => {
//       const res = await fetch(`${API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       if (!res.ok) {
//         const text = await res.text();
//         throw new Error(text || 'Login failed');
//       }
//       return res.json();
//     },

//     getToken: () => localStorage.getItem('token'),
//     isAuthenticated: () => !!localStorage.getItem('token'),
//     getUser: () => {
//       const user = localStorage.getItem('user');
//       return user ? JSON.parse(user) : null;
//     },
//     logout: () => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       window.location.href = '/';
//     }
//   },

//   // ---------- PERSONAS ----------
//   personas: {
//     getAll: async () => {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/personas`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return res.json();
//     }
//   },

//   // ---------- CHAT ----------
//   chat: {
//     // ✅ FIX 1: RESTORED '/sessions' endpoint
//     getAllSessions: async (token: string) => {
//       const res = await fetch(`${API_URL}/chats/sessions`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return res.json();
//     },

//     // ✅ FIX 2: RESTORED '/sessions' endpoint
//     createSession: async (personaId: string, token: string) => {
//       const res = await fetch(`${API_URL}/chats/sessions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ personaId })
//       });
//       return res.json();
//     },

//     getMessages: async (sessionId: string, token: string) => {
//       const res = await fetch(`${API_URL}/chats/${sessionId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return res.json();
//     },

//     // ✅ VISION SUPPORT (Preserved)
//     sendMessage: async (sessionId: string, content: string, token: string, image?: string) => {
//       const res = await fetch(`${API_URL}/chats/${sessionId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ content, image })
//       });
//       return res.json();
//     }
//   }
// };

// export default api;

// const BASE_URL = 'http://localhost:3000/api';

// export const api = {
//   auth: {
//     login: async (email, password) => {
//       const res = await fetch(`${BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       return res.json();
//     },
//     register: async (full_name, email, password) => {
//       const res = await fetch(`${BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ full_name, email, password }),
//       });
//       return res.json();
//     },
//     isAuthenticated: () => !!localStorage.getItem('token'),
//     getToken: () => localStorage.getItem('token'),
//     getUser: () => {
//       const user = localStorage.getItem('user');
//       return user ? JSON.parse(user) : null;
//     },
//     logout: () => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//     },
//   },

//   personas: {
//     getAll: async () => {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${BASE_URL}/personas`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },
//   },

//   chat: {
//     // ✅ FIXED: All paths are now SINGULAR ('/chat') to match Backend
//     getAllSessions: async (token) => {
//       const res = await fetch(`${BASE_URL}/chat/sessions`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },

//     createSession: async (personaId, token) => {
//       const res = await fetch(`${BASE_URL}/chat/sessions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ personaId }),
//       });
//       return res.json();
//     },

//     getMessages: async (sessionId, token) => {
//       const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },

//     // ✅ FIXED: Added 'signal' for Stop Button support
//     sendMessage: async (sessionId, content, token, image, signal) => {
//       const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content, image }),
//         signal: signal 
//       });
//       return res.json();
//     },

//     // ✅ FIXED: Route Endpoint
//     routeMessage: async (message, token) => {
//       try {
//         const res = await fetch(`${BASE_URL}/chat/route`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json', 
//             Authorization: `Bearer ${token}` 
//           },
//           body: JSON.stringify({ message }),
//         });
//         return await res.json();
//       } catch (err) {
//         console.error("Routing failed:", err);
//         return { error: 'Failed to route' };
//       }
//     },

//     // 🗑️ NEW: Delete Session
//     deleteSession: async (sessionId, token) => {
//       await fetch(`${BASE_URL}/chat/sessions/${sessionId}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     },

//     // 🗑️ NEW: Clear All History
//     clearAllSessions: async (token) => {
//       await fetch(`${BASE_URL}/chat/sessions`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     }
//   },
// };

// export default api;


// const BASE_URL = 'http://localhost:3000/api';

// export const api = {
//   auth: {
//     login: async (email, password) => {
//       const res = await fetch(`${BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       return res.json();
//     },
//     register: async (full_name, email, password) => {
//       const res = await fetch(`${BASE_URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ full_name, email, password }),
//       });
//       return res.json();
//     },
//     isAuthenticated: () => !!localStorage.getItem('token'),
//     getToken: () => localStorage.getItem('token'),
//     getUser: () => {
//       const user = localStorage.getItem('user');
//       return user ? JSON.parse(user) : null;
//     },
//     logout: () => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//     },
//   },

//   personas: {
//     getAll: async () => {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${BASE_URL}/personas`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },
//   },

//   chat: {
//     // ✅ FIXED: Strictly using '/chat' (singular) to match backend
//     getAllSessions: async (token) => {
//       const res = await fetch(`${BASE_URL}/chat/sessions`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },

//     createSession: async (personaId, token) => {
//       const res = await fetch(`${BASE_URL}/chat/sessions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ personaId }),
//       });
//       return res.json();
//     },

//     getMessages: async (sessionId, token) => {
//       const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },

//     sendMessage: async (sessionId, content, token, image, signal) => {
//       const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content, image }),
//         signal: signal 
//       });
//       return res.json();
//     },

//     routeMessage: async (message, token) => {
//       try {
//         const res = await fetch(`${BASE_URL}/chat/route`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json', 
//             Authorization: `Bearer ${token}` 
//           },
//           body: JSON.stringify({ message }),
//         });
//         return await res.json();
//       } catch (err) {
//         console.error("Routing failed:", err);
//         return { error: 'Failed to route' };
//       }
//     },

//     deleteSession: async (sessionId, token) => {
//       await fetch(`${BASE_URL}/chat/sessions/${sessionId}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     },

//     clearAllSessions: async (token) => {
//       await fetch(`${BASE_URL}/chat/sessions`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     }
//   },
// };

// export default api;


// const BASE_URL = 'http://localhost:3000/api';

// export const api = {
//   auth: {
//     login: async (email, password) => {
//       const res = await fetch(`${BASE_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });
//       return res.json();
//     },
//     // ✅ FIXED: Changed endpoint from '/register' to '/signup' to match backend
//     register: async (full_name, email, password) => {
//       const res = await fetch(`${BASE_URL}/auth/signup`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ full_name, email, password }),
//       });
//       return res.json();
//     },
//     isAuthenticated: () => !!localStorage.getItem('token'),
//     getToken: () => localStorage.getItem('token'),
//     getUser: () => {
//       const user = localStorage.getItem('user');
//       return user ? JSON.parse(user) : null;
//     },
//     logout: () => {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//     },
//   },

//   personas: {
//     getAll: async () => {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${BASE_URL}/personas`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },
//   },

//   chat: {
//     getAllSessions: async (token) => {
//       const res = await fetch(`${BASE_URL}/chat/sessions`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },

//     createSession: async (personaId, token) => {
//       const res = await fetch(`${BASE_URL}/chat/sessions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ personaId }),
//       });
//       return res.json();
//     },

//     getMessages: async (sessionId, token) => {
//       const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.json();
//     },

//     sendMessage: async (sessionId, content, token, image, signal) => {
//       const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ content, image }),
//         signal: signal 
//       });
//       return res.json();
//     },

//     routeMessage: async (message, token) => {
//       try {
//         const res = await fetch(`${BASE_URL}/chat/route`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json', 
//             Authorization: `Bearer ${token}` 
//           },
//           body: JSON.stringify({ message }),
//         });
//         return await res.json();
//       } catch (err) {
//         console.error("Routing failed:", err);
//         return { error: 'Failed to route' };
//       }
//     },

//     deleteSession: async (sessionId, token) => {
//       await fetch(`${BASE_URL}/chat/sessions/${sessionId}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     },

//     clearAllSessions: async (token) => {
//       await fetch(`${BASE_URL}/chat/sessions`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//     }
//   },
// };

// export default api;



const BASE_URL = 'http://localhost:3000/api';

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      return res.json();
    },

    // ✅ FIX: Ensure endpoint is '/auth/signup' and body uses 'full_name'
    register: async (full_name: string, email: string, password: string) => {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name, email, password }),
      });
      return res.json();
    },

    isAuthenticated: () => !!localStorage.getItem('token'),
    getToken: () => localStorage.getItem('token'),
    getUser: () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    },
  },

  personas: {
    getAll: async () => {
      const token = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/personas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },
  },

  chat: {
    getAllSessions: async (token: string) => {
      const res = await fetch(`${BASE_URL}/chat/sessions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },

    createSession: async (personaId: string, token: string) => {
      const res = await fetch(`${BASE_URL}/chat/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ personaId }),
      });
      return res.json();
    },

    getMessages: async (sessionId: string, token: string) => {
      const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.json();
    },

    sendMessage: async (sessionId: string, content: string, token: string, image?: string, signal?: AbortSignal) => {
      const res = await fetch(`${BASE_URL}/chat/${sessionId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, image }),
        signal: signal 
      });
      return res.json();
    },

    routeMessage: async (message: string, token: string) => {
      try {
        const res = await fetch(`${BASE_URL}/chat/route`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}` 
          },
          body: JSON.stringify({ message }),
        });
        return await res.json();
      } catch (err) {
        console.error("Routing failed:", err);
        return { error: 'Failed to route' };
      }
    },

    deleteSession: async (sessionId: string, token: string) => {
      await fetch(`${BASE_URL}/chat/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    },

    clearAllSessions: async (token: string) => {
      await fetch(`${BASE_URL}/chat/sessions`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  },
};

export default api;