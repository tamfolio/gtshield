import React from "react";
import {
  ArrowLeft,
  Clock,
  Link2,
  Twitter,
  Facebook,
  Linkedin,
} from "lucide-react";
import Navbar from "../Navbar";
import Footer from "../LandingPage/Footer";
import { useNavigate } from "react-router-dom";

const SingleNewsPage = ({ article }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const navigate = useNavigate();
  
  const defaultArticle = {
    id: 1,
    title: "News Headline goes here",
    subtitle: "How do you create compelling presentations that wow your colleagues and impress your managers? Find out with our in-depth guide on UX presentations.",
    author: {
      name: "Olivia Rhye",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      role: "Product Designer"
    },
    date: "Published 20 Jan 2024",
    readTime: "5 min read",
    tags: ["Design", "Research", "Presentation"],
    content: {
      sections: [
        {
          type: "text",
          heading: "Introduction",
          text: "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.\n\nEgestas tellus rutrum tellus pellentesque eu tincidunt. Neque tempor arcu feugiat purus diam, sem et. Eget turpis diam gravida accumsan, viverra. Lorem diam tincidunt varius elit, vehicula eu. Ultricies non amet elit. Quam id risus metus turpis volutpat. Amet massa volutpat id."
        },
        {
          type: "quote",
          text: "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
          author: "Olivia Rhye, Product Designer"
        },
        {
          type: "text",
          text: "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.\n\nElit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus tincidunt eleifend."
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
          caption: "Image caption goes here"
        },
        {
          type: "text",
          text: "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci."
        },
        {
          type: "heading",
          text: "Software and tools"
        },
        {
          type: "text",
          text: "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.\n\nEgestas tellus rutrum tellus pellentesque eu tincidunt. Neque tempor arcu feugiat purus diam, sem et. Eget turpis diam gravida accumsan, viverra. Lorem diam tincidunt varius elit, vehicula eu. Ultricies non amet elit. Quam id risus metus turpis volutpat. Amet massa volutpat id."
        },
        {
          type: "heading",
          text: "Other resources"
        },
        {
          type: "text",
          text: "Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.\n\n1. Lectus id duis vitae porttitor enim gravida morbi.\n2. Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.\n3. Suspendisse maecenas ac donec scelerisque diam sed est duis purus."
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
          caption: ""
        },
        {
          type: "text",
          text: "Lectus leo eros faucibus bibendum quis vive. Mattis enim, nisl maecenas nulla diam mi tellus malesuada. Luctus lectus non pellentesque euismod. Dictum non saepe tempor non malesuada morbi duis. Convallis placerat morbi tristique scelerisque at sed. At id mauris venenatis faucibus id gravida ultrices. Quis elit commodo nisi consequat nulla sem bibendum phasellus."
        },
        {
          type: "heading",
          text: "Heading text"
        },
        {
          type: "text",
          text: "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.\n\nNunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.\n\nOdio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor."
        },
        {
          type: "image",
          src: "https://images.unsplash.com/photo-1494790108755-2616c5a7e01f?w=800&h=400&fit=crop",
          caption: ""
        },
        {
          type: "text",
          text: "Nulla efficitur eleifend nisi, sit amet bibendum sapien fringilla ac. Mauris euismod malesuada tellus. Praesent erat magna, gravida a turpis eget fringilla. Donec ac metus magna. Donec varius ante eget arcu malesuada vulputate. Nam vel nunc et felis facilisis tincidunt mauris non. Nulla rutrum vestibulum laoreet."
        }
      ]
    }
  };

  const currentArticle = article || defaultArticle;

  const handleBack = () => {
    navigate('/news');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
    alert('Link copied to clipboard!');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = currentArticle.title;
    
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
            {currentArticle.date}
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {currentArticle.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {currentArticle.subtitle}
          </p>

          {/* Tags */}
          <div className="flex justify-center gap-2 mt-8">
            {currentArticle.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {currentArticle.content.sections.map((section, index) => {
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
                  src={currentArticle.author.avatar}
                  alt={currentArticle.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Author Info */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {currentArticle.author.name}
                </h3>
                <p className="text-sm text-gray-500">{currentArticle.author.role}</p>
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
            {currentArticle.readTime}
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SingleNewsPage;