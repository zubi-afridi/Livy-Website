export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full rounded-xl border-none sm:border sm:border-eb-strokes bg-white sm:shadow-sm sm:shadow-[#EBEBEB] p-3 sm:p-6 md:p-7"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <h1 className="text-center text-lg sm:text-2xl lg:text-[28px] font-semibold text-primary-grey">
        {title}
      </h1>

      {subtitle ? (
        <p className="mt-2 text-center text-sm sm:text-base text-secondary-text">
          {subtitle}
        </p>
      ) : null}

      <div className="mt-6">{children}</div>
    </div>
  );
}
