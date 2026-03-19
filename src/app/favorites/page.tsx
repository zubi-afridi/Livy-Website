"use client";
import { useEffect, useState } from "react";
import Container from "@/components/common/Container";
import Header from "@/components/layout/Header";
import FooterLanding from "@/components/layout/FooterLanding";
import TravelCard, { Post } from "@/components/common/Cards";
import FloatingBtn from "@/components/layout/FloatingBtn";
import { getAuthChangedEventName, getCurrentUser } from "@/store/authStore";
import {
  getFavoritesByUser,
  getFavoritesChangedEventName,
} from "@/store/favoritesStore";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Post[]>([]);

  useEffect(() => {
    const loadFavorites = () => {
      const user = getCurrentUser();
      if (!user) {
        setFavorites([]);
        return;
      }
      setFavorites(getFavoritesByUser(user.id) as Post[]);
    };

    loadFavorites();

    const favoritesEvent = getFavoritesChangedEventName();
    const authEvent = getAuthChangedEventName();
    window.addEventListener(favoritesEvent, loadFavorites);
    window.addEventListener(authEvent, loadFavorites);

    return () => {
      window.removeEventListener(favoritesEvent, loadFavorites);
      window.removeEventListener(authEvent, loadFavorites);
    };
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
          {favorites.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 md:p-12 text-center">
              <h2 className="text-lg md:text-2xl font-semibold text-primary-grey">
                No favorites found. Start adding items you love.
              </h2>
              <p className="mt-2 text-sm md:text-base text-gray-500">
                Tap the heart icon on any property card to save it here.
              </p>
            </div>
          ) : (
            <>
              <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {favorites.map((post: Post, index: number) => (
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
                  {favorites
                    .slice(0, Math.ceil(favorites.length / 2))
                    .map((post: Post, index: number) => (
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
                  {favorites
                    .slice(Math.ceil(favorites.length / 2))
                    .map((post: Post, index: number) => (
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
