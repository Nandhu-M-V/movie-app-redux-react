const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h2 className="text-white text-lg font-semibold mb-3">MovieApp</h2>
            <p>
              Discover trending movies, explore details, and stay updated with
              the latest releases powered by TMDB.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li className="hover:text-white transition cursor-pointer">
                Home
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Discover
              </li>
              <li className="hover:text-white transition cursor-pointer">
                Top Rated
              </li>
            </ul>
          </div>

          {/* API Credit */}
          <div>
            <h3 className="text-white font-medium mb-3">About</h3>
            <p>
              This product uses the TMDB API but is not endorsed or certified by
              TMDB.
            </p>
          </div>
        </div>

        <div className="border-t border-zinc-700 mt-8 pt-6 text-center text-xs">
          © {new Date().getFullYear()} MovieApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
