interface AuthSidebarProps {
  title: string;
  subtitle: string;
  imageSrc: string;
}

export function AuthSidebar({ title, subtitle, imageSrc }: AuthSidebarProps) {
  return (
    <div className="hidden md:flex flex-col justify-end bg-gray-100 p-12 overflow-hidden sticky top-0 h-screen relative">
      
      {/* Full Cover Background Image */}
      <img 
        src={imageSrc} 
        alt="Editorial Model" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Subtle Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      {/* Foreground Content */}
      <div className="relative z-10 text-white max-w-md">
        <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-lg font-medium text-white/90">
          {subtitle}
        </p>
      </div>

    </div>
  );
}
