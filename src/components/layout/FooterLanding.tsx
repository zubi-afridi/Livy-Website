import Link from "next/link";
import Container from "../common/Container";
import Image from "next/image";
import Facebook from "../../assets/icons/facebook.svg";
import Twitter from "../../assets/icons/twitter.svg";
import Instagram from "../../assets/icons/instagram.svg";
import Linkedin from "../../assets/icons/linkedin.svg";
import Youtube from "../../assets/icons/youtube.svg";
import Footer from "../common/Footer";

const exploreLinks = [
  { label: "Top Destinations", href: "#" },
  { label: "Featured Stays", href: "#" },
  { label: "Smart Lock Access", href: "#" },
  { label: "Early Check-In Options", href: "#" },
];

const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Booking Policies", href: "#" },
  { label: "Cancellation Guide", href: "#" },
];

const socialIcons = [Instagram, Facebook, Twitter, Linkedin, Youtube];

const FooterLanding = () => {
  return (
    <div className="hidden sm:block bg-[#fafafa]">
      <Container>
        <div className="pt-0 md:pt-5 mt-10 text-[#4a4a4a] font-sans">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-0">
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
              <p className="font-['Inter'] font-normal text-[16px] leading-none tracking-normal mb-6 text-[#4a4a4a]">
                Smart vacation rentals made simple. Book faster, unlock
                instantly, and enjoy seamless stays with keyless access.
              </p>
              <a
                href="/"
                className="text-[16px] font-medium block mb-6 font-inter"
              >
                support@livy.com
              </a>

              <div className="flex space-x-4">
                {socialIcons.map((Icon, idx) => (
                  <Icon
                    key={idx}
                    className="text-[#CCCCCC] hover:text-black transition-colors duration-200 cursor-pointer size-8"
                  />
                ))}
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
                {exploreLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
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
              <ul className="space-y-3 text-[15px] font-inter">
                {supportLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-black transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default FooterLanding;
