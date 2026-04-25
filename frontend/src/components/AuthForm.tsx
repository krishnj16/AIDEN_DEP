// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import api  from '@/lib/api';
// import { toast } from '@/hooks/use-toast';
// import { Loader2 } from 'lucide-react';

// type AuthMode = 'login' | 'signup';

// const AuthForm = () => {
//   const [mode, setMode] = useState<AuthMode>('login');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     full_name: '',
//   });
//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       let response;
      
//       // 1. Call the appropriate API endpoint
//       if (mode === 'login') {
//         response = await auth.login({
//           email: formData.email,
//           password: formData.password,
//         });
//       } else {
//         response = await auth.signup({
//           email: formData.email,
//           password: formData.password,
//           full_name: formData.full_name,
//         });
//       }

//       const { data, error } = response;

//       // 2. Handle Errors
//       if (error) {
//         toast({
//           title: mode === 'login' ? 'Authentication Failed' : 'Signup Failed',
//           description: error,
//           variant: 'destructive',
//         });
//         return;
//       }

//       // 3. Handle Success (The Fix is Here)
//       if (data) {
//         // Identify the user object safely (it differs between login vs signup responses)
//         const user = data.user || data.session?.user;
//         const accessToken = data.access_token || data.session?.access_token;

//         if (accessToken && user) {
//             apiauth.setAuth(accessToken, user);
            
//             // Safe Name Extraction: Try metadata first, then email, then fallback
//             const displayName = user.user_metadata?.full_name || formData.full_name || user.email || 'User';
            
//             // Store name for the dashboard to use
//             localStorage.setItem('user_name', displayName);

//             toast({
//             title: mode === 'login' ? 'Welcome back' : 'Account Created',
//             description: `Hello, ${displayName}`,
//             });
            
//             navigate('/dashboard');
//         }
//       }

//     } catch (err) {
//       console.error('Backend connection error:', err);
//       toast({
//         title: 'Backend Unavailable',
//         description: 'Unable to connect to server - check console',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleMode = () => {
//     setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
//     setFormData({ email: '', password: '', full_name: '' });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-sm space-y-6"
//     >
//       {mode === 'signup' && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <input
//             type="text"
//             name="full_name"
//             placeholder="Full Name"
//             value={formData.full_name}
//             onChange={handleChange}
//             required={mode === 'signup'}
//             className="input-invisible w-full text-sm"
//             autoComplete="name"
//           />
//         </motion.div>
//       )}

//       <div>
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="input-invisible w-full text-sm"
//           autoComplete="email"
//         />
//       </div>

//       <div>
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           minLength={8}
//           className="input-invisible w-full text-sm"
//           autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
//         />
//       </div>

//       <div className="flex flex-col sm:flex-row gap-3 pt-4">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="btn-primary-aiden flex-1 px-8 py-3 rounded-full text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
//         >
//           {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
//           {mode === 'login' ? 'Login' : 'Create Account'}
//         </button>
        
//         <button
//           type="button"
//           onClick={toggleMode}
//           className="btn-ghost-aiden flex-1 px-8 py-3 rounded-full text-sm"
//         >
//           {mode === 'login' ? 'Sign Up' : 'Back to Login'}
//         </button>
//       </div>

//       <p className="text-center text-xs text-muted-foreground pt-4">
//         {mode === 'login' 
//           ? 'Enter your credentials to access A.I.D.E.N' 
//           : 'Create an account to begin'}
//       </p>
//     </form>
//   );
// };

// export default AuthForm;

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import api from '@/lib/api'; // ✅ Import the default 'api' object
// import { toast } from '@/hooks/use-toast';
// import { Loader2 } from 'lucide-react';

// type AuthMode = 'login' | 'signup';

// const AuthForm = () => {
//   const [mode, setMode] = useState<AuthMode>('login');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     full_name: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       let data;

//       // ✅ CALLS API WITH 2 ARGUMENTS (Matches api.ts)
//       if (mode === 'login') {
//         data = await api.auth.login(
//           formData.email, 
//           formData.password
//         );
//       } else {
//         data = await api.auth.signup(
//           formData.email, 
//           formData.password
//         );
//       }

//       // Handle Success
//       if (data) {
//         const user = data.user || data.session?.user;
//         const accessToken = data.access_token || data.session?.access_token;

//         if (user && accessToken) {
//           localStorage.setItem('token', accessToken);
//           localStorage.setItem('user', JSON.stringify(user));

//           const displayName =
//             user.user_metadata?.full_name ||
//             formData.full_name ||
//             user.email ||
//             'User';

//           localStorage.setItem('user_name', displayName);

//           toast({
//             title: mode === 'login' ? 'Welcome back' : 'Account Created',
//             description: `Hello, ${displayName}`,
//           });

//           navigate('/dashboard');
//         }
//       }

//     } catch (err: any) {
//       console.error('Auth error:', err);
//       // Extract error message
//       const errorMessage = err.message || 'Unable to connect to backend';
      
//       toast({
//         title: mode === 'login' ? 'Login Failed' : 'Signup Failed',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleMode = () => {
//     setMode(prev => (prev === 'login' ? 'signup' : 'login'));
//     setFormData({ email: '', password: '', full_name: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
//       {mode === 'signup' && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           transition={{ duration: 0.3 }}
//         >
//           <input
//             type="text"
//             name="full_name"
//             placeholder="Full Name"
//             value={formData.full_name}
//             onChange={handleChange}
//             required
//             className="input-invisible w-full text-sm"
//           />
//         </motion.div>
//       )}

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         className="input-invisible w-full text-sm"
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         minLength={8}
//         className="input-invisible w-full text-sm"
//       />

//       <div className="flex flex-col gap-3 pt-4">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="btn-primary-aiden flex items-center justify-center gap-2"
//         >
//           {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
//           {mode === 'login' ? 'Login' : 'Create Account'}
//         </button>

//         <button
//           type="button"
//           onClick={toggleMode}
//           className="btn-ghost-aiden"
//         >
//           {mode === 'login' ? 'Sign Up' : 'Back to Login'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AuthForm;

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import api from '@/lib/api'; 
// import { toast } from '@/hooks/use-toast';
// import { Loader2 } from 'lucide-react';

// type AuthMode = 'login' | 'signup';

// const AuthForm = () => {
//   const [mode, setMode] = useState<AuthMode>('login');
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     full_name: '',
//   });

//   const navigate = useNavigate();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       let data;

//       if (mode === 'login') {
//         // Login takes 2 arguments
//         data = await api.auth.login(
//           formData.email, 
//           formData.password
//         );
//       } else {
//         // ✅ FIX: 'register' takes 3 arguments (Name, Email, Password)
//         data = await api.auth.register(
//           formData.full_name, // Name first!
//           formData.email, 
//           formData.password
//         );
//       }

//       // Handle Success
//       if (data) {
//         // Check if there was a backend error returned in the JSON
//         if (data.error) {
//            throw new Error(data.error);
//         }

//         const user = data.user || data.session?.user;
//         const accessToken = data.access_token || data.session?.access_token;

//         if (user && accessToken) {
//           localStorage.setItem('token', accessToken);
//           localStorage.setItem('user', JSON.stringify(user));

//           const displayName =
//             user.user_metadata?.full_name ||
//             formData.full_name ||
//             user.email ||
//             'User';

//           localStorage.setItem('user_name', displayName);

//           toast({
//             title: mode === 'login' ? 'Welcome back' : 'Account Created',
//             description: `Hello, ${displayName}`,
//           });

//           navigate('/dashboard');
//         }
//       }

//     } catch (err: any) {
//       console.error('Auth error:', err);
//       const errorMessage = err.message || 'Unable to connect to backend';
      
//       toast({
//         title: mode === 'login' ? 'Login Failed' : 'Signup Failed',
//         description: errorMessage,
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleMode = () => {
//     setMode(prev => (prev === 'login' ? 'signup' : 'login'));
//     setFormData({ email: '', password: '', full_name: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
//       {mode === 'signup' && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           transition={{ duration: 0.3 }}
//         >
//           <input
//             type="text"
//             name="full_name"
//             placeholder="Full Name"
//             value={formData.full_name}
//             onChange={handleChange}
//             required
//             className="input-invisible w-full text-sm"
//           />
//         </motion.div>
//       )}

//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         required
//         className="input-invisible w-full text-sm"
//       />

//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         required
//         minLength={8}
//         className="input-invisible w-full text-sm"
//       />

//       <div className="flex flex-col gap-3 pt-4">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="btn-primary-aiden flex items-center justify-center gap-2"
//         >
//           {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
//           {mode === 'login' ? 'Login' : 'Create Account'}
//         </button>

//         <button
//           type="button"
//           onClick={toggleMode}
//           className="btn-ghost-aiden"
//         >
//           {mode === 'login' ? 'Sign Up' : 'Back to Login'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AuthForm;


import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api'; 
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

type AuthMode = 'login' | 'signup';

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ FIX 1: Frontend Validation (Prevents 400 Bad Request)
    if (mode === 'signup' && formData.full_name.trim().length < 3) {
      toast({
        title: "Name too short",
        description: "Please enter a name with at least 3 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      let data;

      if (mode === 'login') {
        data = await api.auth.login(
          formData.email, 
          formData.password
        );
      } else {
        // ✅ FIX 2: Correct Argument Order (Name, Email, Password)
        data = await api.auth.register(
          formData.full_name,
          formData.email, 
          formData.password
        );
      }

      // ✅ FIX 3: Check for backend errors hidden in 200 responses
      if (data.error) {
        throw new Error(data.error);
      }

      // Handle Success
      const user = data.user || data.session?.user;
      const accessToken = data.access_token || data.session?.access_token;

      if (user && accessToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(user));

        const displayName =
          user.user_metadata?.full_name ||
          formData.full_name ||
          user.email ||
          'User';

        localStorage.setItem('user_name', displayName);

        toast({
          title: mode === 'login' ? 'Welcome back' : 'Account Created',
          description: `Hello, ${displayName}`,
        });

        navigate('/dashboard');
      }

    } catch (err: any) {
      console.error('Auth error:', err);
      const errorMessage = err.message || 'Unable to connect to backend';
      
      toast({
        title: mode === 'login' ? 'Login Failed' : 'Signup Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'signup' : 'login'));
    setFormData({ email: '', password: '', full_name: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      {mode === 'signup' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full bg-transparent border-b py-2 focus:outline-none text-sm border-gray-600 focus:border-white transition-colors"
          />
        </motion.div>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full bg-transparent border-b py-2 focus:outline-none text-sm border-gray-600 focus:border-white transition-colors"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={8}
        className="w-full bg-transparent border-b py-2 focus:outline-none text-sm border-gray-600 focus:border-white transition-colors"
      />

      <div className="flex flex-col gap-3 pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-white text-black rounded-full py-3 text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>

        <button
          type="button"
          onClick={toggleMode}
          className="w-full bg-transparent text-white border border-gray-600 rounded-full py-3 text-sm font-medium hover:bg-gray-900 transition-colors"
        >
          {mode === 'login' ? 'Sign Up' : 'Back to Login'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;