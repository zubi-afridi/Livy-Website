type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div
      className={`
        mx-auto w-full 
        px-4
        sm:px-6
        md:px-8
        lg:px-12
        
        max-w-360 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
