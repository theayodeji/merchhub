import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const OrderSuccessView = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center pt-24 pb-32">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">Order Successful!</h1>
      <p className="mb-8 text-neutral-500 dark:text-neutral-400">
        Your payment was successful and your order has been placed. You will receive an email confirmation shortly.
      </p>
      
      <div className="flex w-full flex-col gap-3">
        <Link to="/">
          <Button className="w-full" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};
