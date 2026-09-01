import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authClient } from '../../../lib/auth-client';
import { paths } from '../../../config/paths';

export const useSignup = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || paths.app.dashboard.getHref();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        username: formData.username,
      });
      
      if (error) {
        setError(error.message || 'Signup failed');
      } else {
        window.location.href = redirectTo;
      }
    } catch (err: any) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    formData,
    handleChange,
    handleSubmit
  };
};
