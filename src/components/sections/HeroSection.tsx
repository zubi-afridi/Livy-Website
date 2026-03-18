import Image from "next/image";
import Container from "../common/Container";

const HeroSection = () => {
  const images = [
    { src: "/images/teamMember1.svg", alt: "Team Member 1" },
    { src: "/images/teamMember.svg", alt: "Team Member 2" },
  ];

  return (
    <>
      <div className="relative h-full w-full overflow-hidden ">
        <div
          className="absolute inset-0 -z-20"
          style={{ background: "linear-gradient(to bottom, #FFDDDE, #FAFAFA)" }}
        />
        <div className="absolute inset-0 -z-10 opacity-40 bg-[url('/images/lines.png')] bg-cover bg-no-repeat bg-center" />

        <Container className=" md:pt-23 pt-20 lg:pt-25 ">
          <div className="flex flex-col   ">
            <div
              className="flex items-center justify-center text-center"
              data-aos="fade-down"
              data-aos-duration="800"
            >
              <h1 className="text-[30px] sm:text-[45px] md:text-[52px] lg:text-[72px] font-bold leading-normal font-manrope capitalize  ">
                <span className="text-primary">Livy</span> living made easy
              </h1>
            </div>
            <div
              className="mx-auto mt-3 max-w-77.5 sm:max-w-130 text-center md:hidden"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              <p className="font-manrope text-sm sm:text-base font-medium leading-[1.6] text-secondary-text">
                Browse verified homes, get real-time availability, and unlock
                your rental with one tap.
              </p>
            </div>

            <div className="hidden md:grid md:grid-cols-12 items-end gap-10 md:gap-4 relative">
              <div
                className="col-span-3 order-2 self-center "
                data-aos="fade-right"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
                <p className="xl:text-[16px] font-manrope xl:font-semibold font-normal text-sm">
                  Enjoy a fully connected stay with effortless booking and
                  instant smart-lock access-all designed to make your travel
                  smoother from start to finish.
                </p>
              </div>

              <div
                className="sm:col-span-6 order-1 sm:order-2 flex justify-center relative self-baseline "
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="1000"
                data-aos-offset="200"
                data-aos-easing="ease-in-out"
              >
                <Image
                  src="/images/home.svg"
                  alt="House Illustration"
                  width={800}
                  height={800}
                  className="object-contain drop-shadow-2xl xl:-mt-20 w-250 h-full "
                  priority
                />
              </div>

              <div
                className="col-span-3 order-3 flex-col items-end flex self-center"
                data-aos="fade-left"
                data-aos-delay="300"
                data-aos-duration="1000"
              >
                <div className="flex items-center -space-x-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative size-9 xl:size-10 rounded-full shadow-md overflow-hidden"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ))}

                  <button className="relative z-10 xl:size-10 rounded-full bg-primary flex items-center justify-center">
                    <Image
                      src="/icons/plus.svg"
                      alt="plus"
                      fill
                      sizes="40px"
                      className="object-contain"
                    />
                  </button>
                </div>

                <div className="mt-3 text-center md:text-right">
                  <div className="flex gap-1 justify-center md:justify-end">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Image
                        key={item}
                        src="/icons/star.svg"
                        alt="star icon"
                        width={15}
                        height={15}
                      />
                    ))}
                  </div>

                  <p className="font-manrope font-medium text-[14px] leading-5.5 tracking-normal text-primary-grey mt-1">
                    Top Rated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
