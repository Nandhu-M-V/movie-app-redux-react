const IMAGE_BANNER_URL = 'https://image.tmdb.org/t/p/original';

const HomeBanner = ({ backdrop }: { backdrop: string }) => {
  return (
    <div className="relative z-0 w-full h-125 overflow-hidden">
      <img
        src={`${IMAGE_BANNER_URL}${backdrop}`}
        className="w-full h-full opacity-85 object-cover "
        alt="movie backdrop"
      />

      <div className="absolute inset-0 bg-black/75" />

      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
    </div>
  );
};

export default HomeBanner;
