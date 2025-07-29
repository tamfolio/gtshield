import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  Link2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you're using react-toastify
import Navbar from "../Navbar";
import Footer from "../LandingPage/Footer";
import { publicRequest } from "../../../requestMethod";

const SingleNewsPage = () => {
  const { id } = useParams(); // Get the news ID from URL
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Fetch news article on component mount
  useEffect(() => {
    const fetchNewsArticle = async () => {
      if (!id) {
        setError("No article ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await publicRequest.get(`userTools/news/${id}`);
        
        if (response.data && response.data.data && response.data.data.news) {
          const newsData = response.data.data.news;
          
          // Debug logging
          console.log('News data received:', newsData);
          console.log('Cover image URL:', newsData.coverImage);
          
          // Transform API response to match component structure
          const transformedArticle = {
            id: newsData.id,
            title: newsData.title,
            subtitle: newsData.subtitle,
            author: {
              name: "Admin", // Default since API doesn't provide author info
              avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
              role: "Content Creator"
            },
            date: `Published ${new Date(newsData.datePublished).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}`,
            readTime: "5 min read", // Default since API doesn't provide read time
            tags: newsData.tags || [],
            coverImage: newsData.coverImage,
            content: {
              sections: [
                {
                  type: "text",
                  text: newsData.bodyText
                }
              ]
            }
          };
          
          console.log('Transformed article:', transformedArticle);
          setArticle(transformedArticle);
        } else {
          setError("Article not found");
        }
      } catch (err) {
        console.error("Error fetching news article:", err);
        setError(err?.response?.data?.error || "Failed to fetch article");
        toast.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticle();
  }, [id]);

  const handleBack = () => {
    navigate('/news');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article';
    
    switch(platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar isAuthenticated={isAuthenticated} />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading article...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar isAuthenticated={isAuthenticated} />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
              <p className="text-gray-600 mb-6">{error || "The article you're looking for doesn't exist."}</p>
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to News
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar isAuthenticated={isAuthenticated} />

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Article Header */}
        <div className="mb-12 text-center">
          <div className="text-sm text-purple-600 font-medium mb-3">
            {article.date}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>
          {article.subtitle && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex justify-center gap-2 mt-8">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Cover Image */}
        {article.coverImage && (
          <figure className="mb-12">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full rounded-lg"
              onError={(e) => {
                console.error('Image failed to load:', article.coverImage);
                // Show a placeholder or hide the image
                e.target.src = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop';
                e.target.classList.add('opacity-50');
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', article.coverImage);
              }}
            />
            <figcaption className="text-sm text-gray-500 text-center mt-2">
              URL: {article.coverImage}
            </figcaption>
          </figure>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {article.content.sections.map((section, index) => {
            switch (section.type) {
              case 'heading':
                return (
                  <h2 key={index} className="text-3xl font-bold text-gray-900 mt-12 mb-6">
                    {section.text}
                  </h2>
                );
              case 'text':
                return (
                  <div key={index} className="mb-6">
                    {section.heading && (
                      <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        {section.heading}
                      </h2>
                    )}
                    <div className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {section.text}
                    </div>
                  </div>
                );
              case 'quote':
                return (
                  <blockquote key={index} className="border-l-4 border-purple-600 pl-6 py-4 my-12 bg-purple-50 rounded-r-lg">
                    <p className="text-lg italic text-gray-800 mb-2">
                      "{section.text}"
                    </p>
                    {section.author && (
                      <cite className="text-sm text-gray-600 not-italic">
                        — {section.author}
                      </cite>
                    )}
                  </blockquote>
                );
              case 'image':
                return (
                  <figure key={index} className="my-10">
                    <img
                      src={section.src}
                      alt={section.caption || 'Article image'}
                      className="w-full rounded-lg"
                    />
                    {section.caption && (
                      <figcaption className="text-sm text-gray-500 text-center mt-3">
                        {section.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Author Bio Section */}
        <div className="border-t border-gray-200 pt-8 mt-16">
          <div className="flex items-center justify-between">
            {/* Left side - Author info */}
            <div className="flex items-center gap-4">
              {/* Author Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Author Info */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {article.author.name}
                </h3>
                <p className="text-sm text-gray-500">{article.author.role}</p>
              </div>
            </div>

            {/* Right side - Share buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copy link"
              >
                <Link2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Social Share - Simple text at bottom */}
        <div className="mt-12 mb-20 text-center">
          <p className="text-sm text-gray-500">
            <Clock className="w-4 h-4 inline mr-1" />
            {article.readTime}
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SingleNewsPage;