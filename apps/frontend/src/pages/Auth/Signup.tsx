import { AuthSidebar } from '../../components/layout/AuthSidebar';
import { SignupForm } from '../../features/auth/components/SignupForm';

export default function Signup() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Form Section */}
      <SignupForm />
      
      {/* Visual Section */}
      <AuthSidebar 
        title={"Join the movement."}
        subtitle="Launch your premium merch empire today."
        imageSrc="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop"
      />
    </div>
  );
}
