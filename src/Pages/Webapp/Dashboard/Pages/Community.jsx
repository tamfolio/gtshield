import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add this import
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
  const navigate = useNavigate(); // Add navigation hook
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
      <Navbar isAuthenticated={TruckElectric} />
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
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

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
                    onClick={() => handleArticleClick(article.id)} // Add click handler
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

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                  ← Previous
                </button>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
                    <button
                      key={index}
                      className={`w-8 h-8 rounded text-sm ${
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

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Community Surveys */}
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-lg">Community Surveys</h3>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  No spam. Just the latest releases and tips, interesting
                  articles, and exclusive interviews in your inbox every week.
                </p>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3">
                  <Link to="/survey">Start Survey</Link>
                </button>
                <button
                  className="w-full border border-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  onClick={() => setShowPoll(true)}
                >
                  Start Poll
                </button>
              </div>

              {/* Sample Poll */}
              {showPoll && (
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <h4 className="font-medium text-gray-900 mb-4">
                    Question goes here and this is how it goes?
                  </h4>
                  <div className="space-y-3">
                    {[
                      { label: "Option 1", percentage: 10, selected: false },
                      { label: "Option 2", percentage: 10, selected: true },
                      { label: "Option 1", percentage: 10, selected: false },
                      { label: "Option 1", percentage: 10, selected: false },
                    ].map((option, index) => (
                      <div key={index} className="space-y-2">
                        <div
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                            option.selected
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border-2 ${
                                option.selected
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300"
                              }`}
                            >
                              {option.selected && (
                                <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                              )}
                            </div>
                            <span className="text-sm font-medium">
                              {option.label}
                            </span>
                            <span className="text-sm text-gray-500 ml-auto">
                              {option.percentage}%
                            </span>
                          </div>
                        </div>
                        <div className="bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${option.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community;
