import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const { loading, error, formData, handleChange, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col justify-center p-6 md:p-10 max-w-[500px] w-full mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-2">
        Welcome back.
      </h1>
      <p className="text-base text-gray-500 mb-8 font-medium">
        Log in to manage your storefront and orders.
      </p>
      
      {error && <div className="text-destructive font-bold mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
          <Input 
            name="email" 
            type="email" 
            placeholder="jane@example.com" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
          <div className="relative">
            <Input 
              name="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="••••••••" 
              required 
              value={formData.password}
              onChange={handleChange}
              className="pr-12"
            />
            <button 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
            >
              {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
        </div>
        
        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Processing...' : 'Sign In'}
          {!loading && <LogIn className="ml-2 size-5" />}
        </Button>
      </form>
      
      <div className="mt-8 text-center text-sm font-medium">
        <span className="opacity-60">Don't have an account? </span>
        <Link to="/signup" className="hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors">
          Apply Now
        </Link>
      </div>
    </div>
  );
};
