import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  ArrowRight,
  User,
  Calendar,
  BarChart3,
  Users,
  MessageSquare,
  BookOpen,
  Shield,
  Heart,
  TruckElectric,
} from "lucide-react";
import Navbar from "../../../../Components/Website/Navbar";
import Footer from "../../../../Components/Website/LandingPage/Footer";

const Community = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("View all");
  const [sortBy, setSortBy] = useState("Most recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPoll, setShowPoll] = useState(false);

  // Sample data for articles
  const articles = [
    {
      id: 1,
      category: "Women Safety",
      title: "UX review presentations",
      description:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      author: "Olivia Rhye",
      date: "20 Jan 2025",
      image: "/api/placeholder/280/160",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      id: 2,
      category: "Civic Rights",
      title: "Migrating to Linear 101",
      description:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      author: "Phoenix Baker",
      date: "19 Jan 2025",
      image: "/api/placeholder/280/160",
    },
    {
      id: 3,
      category: "Reporting Guide",
      title: "Building your API stack",
      description:
        "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
      author: "Lana Steiner",
      date: "18 Jan 2025",
      image: "/api/placeholder/280/160",
    },
    {
      id: 4,
      category: "Women Safety",
      title: "PM mental models",
      description:
        "Mental models are simple expressions of complex processes or relationships.",
      author: "Demi Wilkinson",
      date: "16 Jan 2025",
      image: "/api/placeholder/280/160",
    },
    {
      id: 5,
      category: "Child Protection",
      title: "What is wireframing?",
      description:
        "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
      author: "Candice Wu",
      date: "15 Jan 2025",
      image: "/api/placeholder/280/160",
    },
    {
      id: 6,
      category: "Child Protection",
      title: "How collaboration makes us better designers",
      description:
        "Collaboration can make our teams stronger, and our individual designs better.",
      author: "Natali Craig",
      date: "14 Jan 2025",
      image: "/api/placeholder/280/160",
    },
    {
      id: 7,
      category: "Child Protection",
      title: "Our top 10 Javascript frameworks to use",
      description:
        "JavaScript frameworks make development easy with extensive features and functionalities.",
      author: "Drew Cano",
      date: "13 Jan 2025",
      image: "/api/placeholder/280/160",
    },
    {
      id: 8,
      category: "Women Safety",
      title: "Podcast: Creating a better CX Community",
      description:
        "Starting a community doesn't need to be complicated, but how do you get started?",
      author: "Orlando Diggs",
      date: "12 Jan 2025",
      image: "/api/placeholder/280/160",
    },
  ];

  const categories = [
    "View all",
    "Women Safety",
    "Child Protection",
    "Reporting Guide",
    "Civic Rights",
  ];

  const filteredArticles =
    selectedCategory === "View all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  // Add navigation handler
  const handleArticleClick = (articleId) => {
    navigate(`/communities/${articleId}`);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Women Safety":
        return <Heart className="w-4 h-4" />;
      case "Child Protection":
        return <Shield className="w-4 h-4" />;
      case "Reporting Guide":
        return <BookOpen className="w-4 h-4" />;
      case "Civic Rights":
        return <Users className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Women Safety":
        return "text-purple-600 bg-purple-50";
      case "Child Protection":
        return "text-blue-600 bg-blue-50";
      case "Reporting Guide":
        return "text-green-600 bg-green-50";
      case "Civic Rights":
        return "text-orange-600 bg-orange-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <>
      <Navbar isAuthenticated={true} />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <p className="text-blue-600 font-medium mb-2">
                Community Engagement Hub
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Community Engagement Hub
              </h1>
              <p className="text-lg text-gray-600">
                The latest industry news, interviews, technologies, and
                resources.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Centered */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-between mb-8">
            <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Most recent</option>
                <option>Most popular</option>
                <option>Oldest first</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Articles Grid - Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                  {article.gradient && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${article.gradient} opacity-20`}
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        article.category
                      )}`}
                    >
                      {getCategoryIcon(article.category)}
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3" />
                      </div>
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - Centered */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50">
                ← Previous
              </button>
              <div className="flex items-center gap-1">
                {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                  <button
                    key={index}
                    className={`min-w-[32px] h-8 px-2 rounded text-sm flex items-center justify-center ${
                      page === currentPage
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community;