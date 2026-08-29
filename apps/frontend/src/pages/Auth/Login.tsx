import { AuthSidebar } from '../../components/layout/AuthSidebar';
import { LoginForm } from '../../features/auth/components/LoginForm';

export default function Login() {
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Form Section */}
      <LoginForm />
      
      {/* Visual Section */}
      <AuthSidebar 
        title={"Welcome back."}
        subtitle="Manage your products, view orders, and scale your brand."
        imageSrc="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop"
      />
    </div>
  );
}
