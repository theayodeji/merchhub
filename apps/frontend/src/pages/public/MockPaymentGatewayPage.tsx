import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const MockPaymentGatewayPage = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  useEffect(() => {
    if (!reference) {
      navigate('/');
    }
  }, [reference, navigate]);

  const handleSimulatePayment = async () => {
    setStatus('processing');
    try {
      // In a real flow, the mock provider's verify endpoint would be called by webhook or frontend.
      // We don't have a verify endpoint yet, so we just simulate delay and redirect.
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setTimeout(() => {
        navigate('/order-success');
      }, 1000);
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="mb-2 text-2xl font-bold">Mock Payment Gateway</h1>
        <p className="mb-6 text-sm text-neutral-500">
          This is a simulated payment flow for development purposes. Reference: <code className="bg-neutral-100 p-1 rounded text-xs dark:bg-neutral-800">{reference}</code>
        </p>

        <Button 
          className="w-full" 
          onClick={handleSimulatePayment}
          disabled={status === 'processing' || status === 'success'}
        >
          {status === 'processing' ? 'Processing Payment...' : 
           status === 'success' ? 'Payment Successful!' : 
           'Simulate Successful Payment'}
        </Button>
      </div>
    </div>
  );
};
