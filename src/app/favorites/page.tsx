"use client";

import { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import Header from "@/components/layout/Header";
import FooterLanding from "@/components/layout/FooterLanding";
import TravelCard from "@/components/common/Cards";
import CardSkeleton from "@/components/common/CardSkeleton";
import FloatingBtn from "@/components/layout/FloatingBtn";

const FavoritesPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=8")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <FloatingBtn />
      <Header />

      <main className="pt-20 md:pt-28 pb-20">
        <Container>
          <div className="mb-8 md:mb-12">
            <h1
              className="text-xl  lg:text-3xl font-bold font-manrope text-primary-grey"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              Favorites
            </h1>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index}>
                  <CardSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {data.map((post: any, index: number) => (
                  <div
                    key={post.id}
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay={index * 50}
                  >
                    <TravelCard post={post} isFavorited={true} />
                  </div>
                ))}
              </div>

              <div className="md:hidden space-y-6">
                <div
                  className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {data
                    .slice(0, Math.ceil(data.length / 2))
                    .map((post: any, index: number) => (
                      <div
                        key={post.id}
                        className="flex-none w-65"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay={index * 50}
                      >
                        <TravelCard post={post} isFavorited={true} />
                      </div>
                    ))}
                </div>

                <div
                  className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  {data
                    .slice(Math.ceil(data.length / 2))
                    .map((post: any, index: number) => (
                      <div
                        key={post.id}
                        className="flex-none w-65"
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-delay={index * 50}
                      >
                        <TravelCard post={post} isFavorited={true} />
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </Container>
      </main>

      <FooterLanding />
    </div>
  );
};

export default FavoritesPage;
