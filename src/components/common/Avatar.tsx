import Image from "next/image";

type AvatarProps = {
  name?: string | null;
  src?: string | null;
  size?: number;
  className?: string;
};

const getInitial = (name?: string | null) => {
  const initial = (name ?? "").trim().charAt(0);
  return initial ? initial.toUpperCase() : "?";
};

export default function Avatar({
  name,
  src,
  size = 64,
  className = "",
}: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name ?? "User avatar"}
        width={size}
        height={size}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <div
      aria-label={name ?? "User avatar"}
      className={`flex items-center justify-center font-manrope font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: "#FFEDED",
        color: "#B63E41",
      }}
    >
      <span className="leading-none">{getInitial(name)}</span>
    </div>
  );
}
