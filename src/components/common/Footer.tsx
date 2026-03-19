import Link from "next/link";
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden md:block border-t border-gray-200 mt-12 py-5">
      <Container className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p className="font-inter text-base font-medium text-footer-text">
          © {currentYear} Livy — Modern Stays, Seamless Access.
        </p>
        <div className="flex space-x-8 font-bold text-secondary-text font-inter">
          <Link href="/" className="hover:text-black transition-colors">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-black transition-colors">
            Terms of Service
          </Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
