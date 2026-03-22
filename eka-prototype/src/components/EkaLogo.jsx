// EkaLogo - Circle logo component
// size: 'sm' (32px), 'md' (40px), 'lg' (48px), 'xl' (64px)
function EkaLogo({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`${sizeMap[size]} rounded-full overflow-hidden border-2 border-purple-300 shadow-md flex-shrink-0 ${className}`}>
      <img
        src="/eka-platform/eka-logo.png"
        alt="Eka Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default EkaLogo;
