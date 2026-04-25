export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  // 👇 This is the missing part causing your red error!
  theme: {
    primary: string;   // e.g. 'bg-blue-600'
    secondary: string; // e.g. 'bg-blue-50'
    text: string;  
    border?: string;    // e.g. 'text-blue-900'
  };
}