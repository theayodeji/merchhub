import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export const MockPaymentGatewayPage = () => {
  const [searchParams] = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleFailPayment = async () => {
    setStatus('error');
    toast({
      title: "Payment Failed",
      description: "Your mock payment was declined by the simulated gateway.",
      variant: "destructive"
    });
    // Redirect back to product page after a short delay
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="mb-2 text-2xl font-bold">Mock Payment Gateway</h1>
        <p className="mb-6 text-sm text-neutral-500">
          This is a simulated payment flow for development purposes. Reference: <code className="bg-neutral-100 p-1 rounded text-xs dark:bg-neutral-800">{reference}</code>
        </p>

        <div className="flex flex-col gap-3">
          <Button 
            className="w-full" 
            onClick={handleSimulatePayment}
            disabled={status === 'processing' || status === 'success'}
          >
            {status === 'processing' ? 'Processing Payment...' : 
             status === 'success' ? 'Payment Successful!' : 
             'Simulate Successful Payment'}
          </Button>

          <Button 
            className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-0 shadow-none" 
            onClick={handleFailPayment}
            disabled={status === 'processing' || status === 'success'}
          >
            Simulate Failed Payment
          </Button>
        </div>
      </div>
    </div>
  );
};
