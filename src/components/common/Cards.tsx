import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

export interface Post {
  id: number;
  title: string;
  body: string;
}

import Link from "next/link";

const TravelCard = ({
  post,
  isFavorited = false,
}: {
  post: Post;
  isFavorited?: boolean;
}) => {
  const [liked, setLiked] = useState(isFavorited);

  const price = Math.floor((post.id * 15) % 150) + 45;
  const rating = (4.5 + (post.id % 5) / 10).toFixed(2);
  const imageUrl = `https://picsum.photos/seed/${post.id + 10}/600/400`;

  return (
    <div className="w-65 md:w-full" data-aos="fade-up" data-aos-duration="800">
      <Link href={`/property-details/${post.id}`} className="block group">
        <div className="relative h-49.75 md:h-59.75 overflow-hidden rounded-2xl ">
          <img
            src={imageUrl}
            alt="room"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="absolute right-3 top-3 s cursor-pointer z-10"
          >
            <Heart
              className={`w-5 h-5 ${
                liked
                  ? "fill-red-type stroke-none"
                  : " fill-black text-black stroke-1 stroke-white"
              }`}
            />
          </button>
        </div>

        <div className="mt-3 flex justify-between items-start">
          <div className="min-w-0">
            <h3 className="text-base font-medium truncate group-hover:text-primary transition-colors">
              Cozy Downtown Studio
            </h3>
            <p className="text-gray-500 text-sm truncate">
              In vibrant {post.body.split(" ")[0]}, Brazil
            </p>
            <div className="mt-1">
              <span className="font-medium text-lg  md:text-[20px] lg:text-[24px]">
                ${price}
              </span>
              <span className="font-medium text-sm text-gray-500">
                {" "}
                / night
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-medium font-inter">{rating}</span>
            <Star className="w-4 h-4 fill-black" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TravelCard;
