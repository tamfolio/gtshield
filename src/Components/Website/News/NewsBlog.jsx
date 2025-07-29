import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { userRequest } from "../../../requestMethod";

const NewsBlog = () => {
  const [activeFilter, setActiveFilter] = useState("View all");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  // Assuming you have userRequest function and token available
  // You might need to import these or pass them as props
  const token = "your-token-here"; // Replace with actual token

  const filters = [
    "View all",
    "Security Alerts",
    "Platform Updates", 
    "Success Stories",
    "Press Coverage",
  ];

  // Fetch news data from API
  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await userRequest(token).get("/userTools/news/all");
      console.log("✅ News fetched:", res.data);
      
      const newsData = res.data?.data?.news?.data || [];
      const paginationData = res.data?.data?.news?.pagination || {};
      
      // Transform API data to match component structure
      const transformedArticles = newsData.map(article => ({
        id: article.id,
        title: article.title,
        description: article.subtitle || article.bodyText?.substring(0, 100) + "...",
        author: "Author", // API doesn't seem to have author field
        date: new Date(article.datePublished).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short', 
          year: 'numeric'
        }),
        image: article.coverImage || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
        tags: article.tags || [],
        category: "Platform Updates", // You might want to map tags to categories
        caption: article.caption,
        bodyText: article.bodyText,
        isActive: article.isActive,
        isDraft: article.isDraft
      }));

      setArticles(transformedArticles);
      setPagination(paginationData);
    } catch (err) {
      console.error("❌ Failed to fetch news:", err);
      setError("Failed to fetch news articles");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Refetch when filter changes
  useEffect(() => {
    // Filter is handled client-side, no need to refetch
  }, [activeFilter]);

  const filteredArticles = activeFilter === "View all" 
    ? articles 
    : articles.filter(article => 
        article.tags.some(tag => 
          tag.toLowerCase().includes(activeFilter.toLowerCase().replace(/\s+/g, ''))
        )
      );

  const totalPages = Math.ceil(filteredArticles.length / 6);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * 6,
    currentPage * 6
  );

  const getTagColor = (tag) => {
    const colors = {
      "gateway": "bg-red-100 text-red-800",
      "crimewatch": "bg-gray-100 text-gray-800", 
      "modal": "bg-blue-100 text-blue-800",
      "kidnapping": "bg-purple-100 text-purple-800",
      "lost": "bg-orange-100 text-orange-800",
      "security": "bg-green-100 text-green-800",
    };
    
    const cleanTag = tag.replace('#', '').toLowerCase();
    return colors[cleanTag] || "bg-gray-100 text-gray-800";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">{error}</div>
          <button 
            onClick={() => fetchNews()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="overflow-x-auto">
          <div className="flex space-x-1 bg-gray-50 p-1 rounded-lg min-w-max">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 bg-white">
          <option>Most recent</option>
          <option>Oldest first</option>
          <option>Most popular</option>
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedArticles.map((article) => (
          <Link
            to={`/news/${article.id}`}
            key={article.id}
            className="group cursor-pointer"
          >
            <article className="group cursor-pointer">
              <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop";
                  }}
                />
              </div>

              <div className="space-y-3">
                <div className="text-sm text-blue-600 font-medium">
                  {article.author} • {article.date}
                </div>

                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {article.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                    >
                      {tag.replace('#', '')}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {paginatedArticles.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No articles found</div>
          <div className="text-gray-400 text-sm mt-2">
            Try adjusting your filters or check back later
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-md text-sm font-medium ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === 2 && currentPage > 4) {
                return (
                  <span key="dots1" className="px-2">
                    ...
                  </span>
                );
              } else if (
                page === totalPages - 1 &&
                currentPage < totalPages - 3
              ) {
                return (
                  <span key="dots2" className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsBlog;