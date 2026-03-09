import Link from "next/link";
import Container from "../common/Container";
import Image from "next/image";
import Facebook from "./../../assets/icons/facebook.svg";
import Twitter from "./../../assets/icons/twitter.svg";
import Instagram from "./../../assets/icons/instagram.svg";
import Linkedin from "./../../assets/icons/linkedin.svg";
import Youtube from "./../../assets/icons/youtube.svg";
import Footer from "../common/Footer";

const FooterLanding = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#fafafa]">
      <Container>
        <footer className="  pt-0 md:pt-5 pb-5 mt-10   text-[#4a4a4a] font-sans ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
            <div
              className="lg:col-span-1"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="mb-6">
                <Link href="/">
                  <Image
                    src="/icons/logo.svg"
                    alt="nav logo"
                    width={100}
                    height={100}
                    className="-ml-1 object-contain w-20 h-10"
                    priority
                  />
                </Link>
              </div>
              <p className="font-['Inter'] font-normal text-[16px] leading-none tracking-normal mb-6  text-[#4a4a4a]">
                Smart vacation rentals made simple. Book faster, unlock
                instantly, and enjoy seamless stays with keyless access.
              </p>
              <a
                href="/"
                className="text-[16px] font-medium  block mb-6 font-inter"
              >
                support@livy.com
              </a>

              <div className="flex space-x-4">
                <Instagram className="text-[#CCCCCC] hover:text-black transition-colors duration-200 cursor-pointer size-8 " />
                <Facebook className="text-[#CCCCCC] hover:text-black transition-colors duration-200 cursor-pointer size-8 " />
                <Twitter className="text-[#CCCCCC] hover:text-black transition-colors duration-200 cursor-pointer size-8 " />
                <Linkedin className="text-[#CCCCCC] hover:text-black transition-colors duration-200 cursor-pointer size-8 " />
                <Youtube className="text-[#CCCCCC] hover:text-black transition-colors duration-200 cursor-pointer size-8 " />
              </div>
            </div>

            <div className="hidden lg:block"></div>

            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-5 font-manrope">
                Explore
              </h3>
              <ul className="space-y-3 text-[15px] font-inter">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Top Destinations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Featured Stays
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Smart Lock Access
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Early Check-In Options
                  </Link>
                </li>
              </ul>
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-5 font-manrope">
                Support
              </h3>
              <ul className="space-y-3 text-[15px]">
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Booking Policies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black transition-colors">
                    Cancellation Guide
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-6  flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400 md:flex hidden">
            <p className="font-inter text-base font-medium text-footer-text">
              © {currentYear} Livy — Modern Stays, Seamless Access.
            </p>
            <div className="flex space-x-8 font-bold text-secondary-text font-inter">
              <Link
                href="/privacy"
                className="hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-black transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default FooterLanding;
