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
  const realEstateImages = [
    "1600585154340-be6161a56a0c", // Modern House --
    "1512917774080-9991f1c4c750", // Luxurious Interior --
    "1600607687920-4e2a09cf159d", // Modern Bedroom --
    "1640109478916-f445f8f19b11", // Modern Bedroom Green Wall
    "1653974123568-b5eff6d851e1", // Modern Bedroom Large Window
    "1564013799919-ab600027ffc6", // Exterior Garden --
    "1583608205776-bfd35f0d9f83", // Living Room --
    "1484154218962-a197022b5858", // Minimalist Room --

    "1578683010236-d716f9a3f461",
    "1628744876497-eb30460be9f6",
    "1503174971373-b1f69850bded",
    "1507089947368-19c1da9775ae",
    "1537726235470-8504e3beef77",
  ];

  const imageUrl = `https://images.unsplash.com/photo-${
    realEstateImages[post.id % realEstateImages.length]
  }?auto=format&fit=crop&w=800&q=80`;

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
            <h3 className="text-base font-medium truncate ">
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
