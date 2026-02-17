const IMAGE_BANNER_URL = 'https://image.tmdb.org/t/p/original';

const HeroBanner = ({ backdrop }: { backdrop: string }) => {
  return (
    <div className="relative bottom-20 z-0 w-full h-125 overflow-hidden">
      <img
        src={`${IMAGE_BANNER_URL}${backdrop}`}
        className="w-full h-full opacity-85 object-cover object-[center_15%]"
        alt="movie backdrop"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.7)_100%)]" />

      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
    </div>
  );
};

export default HeroBanner;
