"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Container from "../common/Container";
import TravelCard from "../common/Cards";
import CardSkeleton from "../common/CardSkeleton";

const SectionHeader = ({
  title,
  onPrev,
  onNext,
  canScrollLeft,
  canScrollRight,
}: {
  title: string;
  onPrev?: () => void;
  onNext?: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}) => (
  <div
    className="flex justify-between items-center mb-6"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <h3 className="font-manrope text-[18px] font-bold leading-[100%] tracking-[0%] text-[#262626]">
      {title}
    </h3>
    <div className="hidden md:flex gap-3">
      <button
        onClick={onPrev}
        className={`p-2 border border-gray-200 rounded-full hover:shadow-md transition-all active:scale-95 cursor-pointer ${
          !canScrollLeft
            ? "opacity-0 invisible pointer-events-none"
            : "opacity-100 visible"
        }`}
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={onNext}
        className={`p-2 border border-gray-200 rounded-full hover:shadow-md transition-all active:scale-95 cursor-pointer ${
          !canScrollRight
            ? "opacity-0 invisible pointer-events-none"
            : "opacity-100 visible"
        }`}
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  </div>
);

const PropertySliderSection = ({
  title,
  posts,
}: {
  title: string;
  posts: any[];
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      checkScroll();
      node.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        node.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="mb-12">
      <SectionHeader
        title={title}
        onPrev={() => scroll("left")}
        onNext={() => scroll("right")}
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
      />
      <div
        ref={scrollRef}
        className="flex gap-x-4 md:gap-x-6 overflow-x-auto no-scrollbar scroll-smooth pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="flex-none md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)]"
          >
            <TravelCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default function PropertyCards({
  maxSections = 1,
}: {
  maxSections?: number;
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=24")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <Container>
        <h2 className="flex items-center justify-center mb-4 font-manrope text-[20px] sm:text-[30px] md:text-[40px] lg:text-[60px] font-bold leading-[100%] tracking-[0%] text-gray-900 mt-24 sm:mt-40 md:mt-0">
          Our Homes in Brazil
        </h2>
        <div className="py-12 space-y-12">
          {[...Array(maxSections)].map((_, sectionIndex) => (
            <section key={sectionIndex} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div className="h-5 w-48 bg-gray-200 rounded-md animate-shimmer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-hidden scrollbar-hide">
                {[...Array(4)].map((_, cardIndex) => (
                  <div key={cardIndex} className="w-full">
                    <CardSkeleton />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>
    );

  const allSections = [
    { title: "Explore Top Stays", start: 0, end: 8 },
    { title: "Handpicked for You", start: 8, end: 16 },
    { title: "Trending This Week", start: 16, end: 24 },
  ];

  const renderedSections = allSections.slice(0, maxSections);

  return (
    <Container>
      <h2
        className="flex items-center justify-center mb-4  font-manrope text-[20px] sm:text-[30px] md:text-[40px] lg:text-[60px] font-bold leading-[100%] tracking-[0%] text-gray-900 mt-24 sm:mt-40 md:mt-0"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Our Homes in Brazil
      </h2>
      <div className="py-12">
        {renderedSections.map((sec) => (
          <PropertySliderSection
            key={sec.title}
            title={sec.title}
            posts={data.slice(sec.start, sec.end)}
          />
        ))}
      </div>
    </Container>
  );
}
