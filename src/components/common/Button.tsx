import Link from "next/link";
const Button = ({ to = "/", label = "Login", classname = "" }) => {
  return (
    <Link
      href={to}
      className={`
        inline-flex items-center justify-center
        border border-primary
        font-medium transition
        rounded-md sm:rounded-lg md:rounded-xl
        px-3 py-0.5
        sm:px-4 sm:py-1
        md:px-8 md:py-2
        
        text-xs sm:text-sm md:text-base
        
        ${classname}
      `}
    >
      {label}
    </Link>
  );
};

export default Button;
