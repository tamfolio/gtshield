import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const NewsBlog = () => {
  const [activeFilter, setActiveFilter] = useState("View all");
  const [currentPage, setCurrentPage] = useState(1);

  const filters = [
    "View all",
    "Security Alerts",
    "Platform Updates",
    "Success Stories",
    "Press Coverage",
  ];

  const articles = [
    {
      id: 1,
      title: "Bill Walsh leadership lessons",
      description:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
      author: "Alec Whitten",
      date: "17 Jan 2025",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=240&fit=crop",
      tags: ["Security Alert", "Management"],
      category: "Security Alerts",
    },
    {
      id: 2,
      title: "PM mental models",
      description:
        "Mental models are simple expressions of complex processes or relationships.",
      author: "Demi Wilkinson",
      date: "16 Jan 2025",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=240&fit=crop",
      tags: ["Product", "Research", "Frameworks"],
      category: "Success Stories",
    },
    {
      id: 3,
      title: "What is Wireframing?",
      description:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
      author: "Candice Wu",
      date: "15 Jan 2025",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop",
      tags: ["Design", "Research"],
      category: "Platform Updates",
    },
    {
      id: 4,
      title: "How collaboration makes us better designers",
      description:
        "Collaboration can make our teams stronger, and our individual designs better.",
      author: "Natali Craig",
      date: "14 Jan 2025",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=240&fit=crop",
      tags: ["Design", "Research"],
      category: "Success Stories",
    },
    {
      id: 5,
      title: "Our top 10 Javascript frameworks to use",
      description:
        "JavaScript frameworks make development easy with extensive features and functionalities.",
      author: "Drew Cano",
      date: "13 Jan 2025",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=240&fit=crop",
      tags: ["Software Development", "Tools", "SaaS"],
      category: "Platform Updates",
    },
    {
      id: 6,
      title: "Podcast: Creating a better CX Community",
      description:
        "Starting a community doesn't need to be complicated, but how do you get started?",
      author: "Orlando Diggs",
      date: "12 Jan 2025",
      image:
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=240&fit=crop",
      tags: ["Podcasts", "Customer Success"],
      category: "Press Coverage",
    },
  ];

  const filteredArticles =
    activeFilter === "View all"
      ? articles
      : articles.filter((article) => article.category === activeFilter);

  const totalPages = Math.ceil(filteredArticles.length / 6);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * 6,
    currentPage * 6
  );

  const getTagColor = (tag) => {
    const colors = {
      "Security Alert": "bg-red-100 text-red-800",
      Management: "bg-gray-100 text-gray-800",
      Product: "bg-blue-100 text-blue-800",
      Research: "bg-purple-100 text-purple-800",
      Frameworks: "bg-orange-100 text-orange-800",
      Design: "bg-green-100 text-green-800",
      "Software Development": "bg-emerald-100 text-emerald-800",
      Tools: "bg-yellow-100 text-yellow-800",
      SaaS: "bg-pink-100 text-pink-800",
      Podcasts: "bg-indigo-100 text-indigo-800",
      "Customer Success": "bg-cyan-100 text-cyan-800",
    };
    return colors[tag] || "bg-gray-100 text-gray-800";
  };

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
            <article key={article.id} className="group cursor-pointer">
              <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getTagColor(
                        tag
                      )}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
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
    </div>
  );
};

export default NewsBlog;
