import React from 'react';
import Link from 'next/link';
import RestaurantCard from './RestaurantCard';
// import RestaurantCarousel from './RestaurantCarousel';

export default function CategoryPreview({ title, endpoint, restaurants = [], count = 0 }) {
  const [page, setPage] = React.useState(0);
  const href =
    '/category?' +
    new URLSearchParams({
      category_name: title,
      category_endpoint: endpoint,
    }).toString();

  const containerRef = React.useRef(null);
  const [itemsPerPage, setItemsPerPage] = React.useState(4);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const updateItemsPerPage = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;

      // Calculate items per page based on specific breakpoints
      // Requirements:
      // Small: 1 card
      // Wider: 2 cards
      // Medium: 3 cards
      // Max: 4 cards
      // Constants: Card Min Width ~320px, Gap 40px
      // 2 cards: 640 + 40 = 680
      // 3 cards: 960 + 80 = 1040
      // 4 cards: 1280 + 120 = 1400

      if (width >= 1400) {
        setItemsPerPage(4);
      } else if (width >= 1040) {
        setItemsPerPage(3);
      } else if (width >= 680) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };

    // Initial calculation
    updateItemsPerPage();

    const observer = new ResizeObserver(updateItemsPerPage);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const showMoreCard = count > restaurants.length;
  const moreCount = count - restaurants.length;

  const allItems = React.useMemo(() => {
    if (!showMoreCard) return restaurants;
    return [...restaurants, { type: 'view-more', id: 'view-more-card' }];
  }, [restaurants, showMoreCard]);

  const maxPages = Math.ceil(allItems.length / itemsPerPage);

  // Reset page if it exceeds maxPages after resize
  React.useEffect(() => {
    if (page >= maxPages && maxPages > 0) {
      setPage(Math.max(0, maxPages - 1));
    }
  }, [maxPages, page]);

  const currentItems = allItems.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (page < maxPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <Link
          href={href}
          className="text-xs font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors shadow-sm border border-gray-200"
        >
          See all
        </Link>
      </div>

      {/* Desktop Carousel (Hidden on mobile) */}
      <div className="hidden md:flex flex-col w-full relative group">
        <div className="flex items-center w-full">
          {/* Left Arrow */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            className={`mr-2 p-1 transition-all duration-200 focus:outline-none ${page === 0
              ? 'opacity-20 cursor-not-allowed text-gray-300'
              : 'text-gray-400 hover:text-gray-900 hover:scale-110'
              }`}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 16 6 L 10 12 L 16 18" />
            </svg>
          </button>

          {/* Grid Items */}
          <div
            ref={containerRef}
            className="grid gap-10 flex-1"
            style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }}
          >
            {currentItems.map((item) => (
              item.type === 'view-more' ? (
                <Link
                  key="view-more"
                  href={href}
                  className="w-full h-full block"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-200 group/more text-center cursor-pointer">
                    <span className="text-lg font-semibold text-gray-800 mb-2 group-hover/more:text-gray-900">
                      View {moreCount.toLocaleString()} more
                    </span>
                    <span className="text-lg font-semibold text-gray-800 mb-4 group-hover/more:text-gray-900">
                      restaurants in this category
                    </span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 shadow-sm group-hover/more:scale-110 group-hover/more:bg-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link
                  key={item.camis}
                  href={`/restaurant/${item.camis}`}
                  className="w-full"
                >
                  <div className="w-full h-full flex justify-center">
                    <RestaurantCard restaurant={item} compact />
                  </div>
                </Link>
              )
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextPage}
            disabled={page >= maxPages - 1}
            className={`ml-2 p-1 transition-all duration-200 focus:outline-none ${page >= maxPages - 1
              ? 'opacity-20 cursor-not-allowed text-gray-300'
              : 'text-gray-400 hover:text-gray-900 hover:scale-110'
              }`}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 8 6 L 14 12 L 8 18" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center space-x-2 mt-1">
          {Array.from({ length: maxPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${page === index
                ? 'bg-gray-800 scale-110'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Scroll (Hidden on desktop) */}
      <div className="flex md:hidden overflow-x-auto gap-3 pb-2 px-1 snap-x scroll-pl-1 hide-scrollbar pt-1">
        {allItems.map((item) => (
          item.type === 'view-more' ? (
            <Link
              key="view-more-mobile"
              href={href}
              className="min-w-[320px] w-[320px] snap-start h-full"
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white hover:bg-gray-50 rounded-2xl shadow-xl hover:shadow-2xl border border-gray-100 transition-all duration-200 text-center group/more cursor-pointer">
                <span className="text-lg font-semibold text-gray-800 mb-2 group-hover/more:text-gray-900">
                  View {moreCount.toLocaleString()} more
                </span>
                <span className="text-lg font-semibold text-gray-800 mb-4 group-hover/more:text-gray-900">
                  restaurants in this category
                </span>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-800 shadow-sm group-hover/more:scale-110 group-hover/more:bg-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              key={item.camis}
              href={`/restaurant/${item.camis}`}
              className="min-w-[320px] w-[320px] snap-start"
            >
              <div className="w-full h-full">
                <RestaurantCard restaurant={item} compact />
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
