import Image from "next/image";
import { Booking } from "./types";

interface BookingCardProps {
  booking: Booking;
}

const BookingCard = ({ booking }: BookingCardProps) => {
  return (
    <div className="w-full md:shrink-0 md:w-85 bg-white border border-eb-strokes rounded-2xl p-4 md:p-5 hover:shadow-lg transition-shadow">
      <div className="flex gap-3 pb-4 border-b border-eb-strokes mb-3">
        <Image
          src={booking.image}
          alt={booking.title}
          width={64}
          height={64}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-manrope font-medium text-base text-primary-grey truncate">
            {booking.title}
          </h3>
          <p className="font-inter text-sm text-secondary-text mb-1">
            {booking.location}
          </p>
          <div className="flex items-center gap-2">
            <span className="font-inter font-medium text-sm text-primary-grey">
              {booking.rating}
            </span>
            <Image src="/icons/star.svg" alt="Star" width={12} height={12} />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-manrope text-base text-primary-grey font-medium">
            Status
          </span>
          <span
            className={`font-inter text-sm font-semibold ${booking.statusColor}`}
          >
            {booking.status}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-manrope text-base text-primary-grey font-medium">
            Check-in
          </span>
          <span className="font-inter text-sm text-secondary-text">
            {booking.checkIn}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-manrope text-base text-primary-grey font-medium">
            Check-out
          </span>
          <span className="font-inter text-sm text-secondary-text">
            {booking.checkOut}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-manrope text-base text-primary-grey font-medium">
            Guests
          </span>
          <span className="font-inter text-sm text-secondary-text">
            {booking.guests}
          </span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-eb-strokes">
          <span className="font-manrope text-base text-primary-grey font-semibold">
            Amount
          </span>
          <span className="font-manrope text-base font-semibold text-primary-grey">
            {booking.amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
