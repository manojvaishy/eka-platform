// EkaLogo - Rectangle logo component showing full EKA text
function EkaLogo({ size = 'md', className = '' }) {
  const heightMap = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  return (
    <img
      src="/eka-platform/eka-logo.png"
      alt="Eka Logo"
      className={`${heightMap[size]} w-auto object-contain flex-shrink-0 ${className}`}
    />
  );
}

export default EkaLogo;
