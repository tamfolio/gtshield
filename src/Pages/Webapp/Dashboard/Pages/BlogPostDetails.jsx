import React, { useState } from 'react';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, Heart, MessageCircle, Eye, ChevronRight } from 'lucide-react';
import Navbar from '../../../../Components/Website/Navbar';
import Footer from '../../../../Components/Website/LandingPage/Footer';

const BlogPostDetail = ({ postId = '1', onBack }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Sample blog post data - in real app, fetch based on ID
  const blogPosts = {
    1: {
      id: 1,
      category: 'Women Safety',
      title: 'Community Engagement Hub',
      subtitle: 'How do you create compelling presentations that wow your colleagues and impress your managers? Find out with our in-depth guide on UX presentations.',
      author: {
        name: 'Olivia Rhye',
        avatar: '/api/placeholder/40/40',
        role: 'Product Designer'
      },
      publishedDate: '11 Jan 2024',
      readTime: '5 min read',
      views: '2.1k',
      likes: 124,
      comments: 18,
      featured: true,
      heroImage: '/api/placeholder/800/400',
      content: `
        <h2>Introduction</h2>
        <p>UI design is a process from the client, meet, and when organizations really matter, no user is usually happy with your implementation. Regardless of the UX design in the matter, most players want what the UI provides, especially when they're users actively make yourself efficient throughout.</p>
        
        <p>UI UX design is to understand complex, whether it gets a recognized really or not and is not something new to point against.</p>
        
        <p>You too can be ambitious and lazy. Perhaps at first, you're interested commercial competencies seriously. And 'commercial' there in just certain designing specifically design but how to make your site 'something' successful. Commercial design implementation, UX design integration can even increase about the UI design.</p>
        
        <p>UI UX design is to understand complex, whether it gets a recognized really or not and is not that something new to point against.</p>
        
        <blockquote>
          "Readability and completeness, giving each component of the interface designed and competitive design presentation of the contents on page 80 reviews will reduce business of internal marketing."
          <footer>— by someone Olivia Designer</footer>
        </blockquote>
        
        <p>Other areas we came up to see and look. Another specifically, click with text from the business development service the healthcare things, and marketing.</p>
        
        <p>We like to audience and too. Perhaps at first, you're interested commercial competencies seriously. And 'commercial' there is just certain designing specifically design but how to make your site 'something' successful. Commercial design implementation, UX design integration can even increase about the UI design.</p>
        
        <img src="/api/placeholder/600/300" alt="Team collaboration" class="w-full rounded-lg my-6" />
        
        <p>Senior we could really count their. Maybe in to provide as you'll mainly be them, commercial we have spent recommendations for this. Update's services marketability, which can new up be there are for they do even to more the from that call at charge for.</p>
        
        <p>It doesn't it's just the standard, those call out at these ideas, and we charge too end with your own other.</p>
        
        <h2>What</h2>
        <p>We can use and comprehensive design, give all types of other things in front of most, than that the design, all full of marketing to those even content. And that the comprehensive give standard and business that we all know, is what through the comprehensive design we've all know. There. We're on the design to produce standard design full features the the most, than the comprehensive design.</p>
        
        <h2>Software and tools</h2>
        <p>UI design is a process from the client, meet, and when organizations really matter, no user is usually happy with your implementation. Regardless of the UX design in the matter, most players want what the UI provides, especially when they're users actively make yourself efficient throughout.</p>
        
        <p>UI UX design is to understand complex, whether it gets a recognized really or not not is not that something new to point against.</p>
        
        <h2>Other resources</h2>
        <p>UI UX design is new, well, it never present charmed anything about all those there, all you have it. I mention some before that some form of another release in interface or individual combinations as anything all them all can might images structure. Also are there some times such several networking groups at they may worry marketing important.</p>
        
        <p>It doesn't it's just the standard, those call out at these ideas, and we charge too end with your own other.</p>
        
        <ul>
          <li>UX design is never focused various, online organisations, further work, help marketing</li>
          <li>It doesn't it's just the standard, those call out at these ideas</li>
          <li>We charge too end with your own other</li>
        </ul>
        
        <img src="/api/placeholder/600/400" alt="Designer workspace" class="w-full rounded-lg my-6" />
        
        <p>We like to audience and too. Perhaps at first, you're interested commercial competencies seriously. And 'commercial' there is just certain designing specifically design but how to make your site 'something' successful. Commercial design implementation, UX design integration can even increase about the UI design.</p>
        
        <p>Most developers wouldn't have been as productive back then making information at important information locations where's distribution at our favorite domain around structure for you from. First of some great great design system will be something unique even all at some.</p>
        
        <p>Maybe such come back you should almost live things, ultimate, layout well, ultimate corporate needs financial you assume call ultimate daily services already all just even all you the make marketing. You business offer most design performance, such strategic very quality strategic.</p>
        
        <h2>Wrapping text</h2>
        <p>We set up the layout for layout, selecting set up for layout, layout as structured business is up on layouts. You will think our text, such as business on each as layout layout business on do not have to much structured layout. You always choose not to much, and will lead layout on the list. They will structured not, at these, their than on text, and then find text, than structured business as is single as much on much.</p>
        
        <p>Once and five text directions suggest very condition. Report against commercial communications so maybe is 'throughout marketing every very social' business is.</p>
        
        <p>An it go 'beyond design' not about the give or this, however suggest commercial text or to present information that design. An our will information about layout more, not on, and to they or give them content at have more information that design theme at this.</p>
        
        <p>Who will structured suggest content have many will social or are commercial, however will support really structured need at it business you can let many layout.</p>
        
        <p>Therefore, of business let even they structure that let suggest or have overall. Make sure it's provide text even have the structure like at design recommend single but structured will need as when they're working information.</p>
      `
    },
    2: {
      id: 2,
      category: 'Civic Rights',
      title: 'Migrating to Linear 101',
      subtitle: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here\'s how to get started with this powerful project management tool.',
      author: {
        name: 'Phoenix Baker',
        avatar: '/api/placeholder/40/40',
        role: 'Software Engineer'
      },
      publishedDate: '19 Jan 2025',
      readTime: '8 min read',
      views: '1.8k',
      likes: 89,
      comments: 12,
      featured: false,
      heroImage: '/api/placeholder/800/400',
      content: `
        <h2>Getting Started with Linear</h2>
        <p>Linear is a modern project management tool that helps teams track issues, plan sprints, and ship better software. In this comprehensive guide, we'll walk through everything you need to know to get started.</p>
        
        <h2>Setting up your workspace</h2>
        <p>The first step is creating your Linear workspace. This is where all your projects, teams, and issues will live. You can think of it as your command center for project management.</p>
        
        <blockquote>
          "Linear's clean interface and powerful keyboard shortcuts make it a joy to use for daily project management tasks."
          <footer>— Phoenix Baker, Software Engineer</footer>
        </blockquote>
        
        <h2>Key Features</h2>
        <p>Linear offers several key features that set it apart from other project management tools:</p>
        
        <ul>
          <li>Lightning-fast performance with instant search</li>
          <li>Powerful keyboard shortcuts for efficiency</li>
          <li>Git integration for seamless development workflow</li>
          <li>Automated project updates and notifications</li>
        </ul>
      `
    }
  };

  const post = blogPosts[postId] || blogPosts[1]; // Fallback to first post if ID not found

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Women Safety': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Child Protection': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Reporting Guide': return 'text-green-600 bg-green-50 border-green-200';
      case 'Civic Rights': return 'text-orange-600 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white">
        <Navbar isAuthenticated={true}/>
      {/* Header Navigation */}
      <div className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={onBack || (() => window.history.back())}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Community</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 transition-colors ${bookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 transition-colors ${bookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Bookmark className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {post.featured && (
          <div className="text-center mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              Featured on Jan 2024
            </span>
          </div>
        )}
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {post.subtitle}
          </p>
        </div>

        {/* Author and Meta Info */}
        <div className="flex items-center justify-center gap-6 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{post.author.name}</div>
              <div className="text-gray-500">{post.author.role}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.publishedDate}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{post.views}</span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="flex justify-center mb-8">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(post.category)}`}>
            {post.category}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
          <img 
            src={post.heroImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article 
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-ul:text-gray-700 prose-li:marker:text-blue-500"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Article Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setLiked(!liked)}
                    className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                      liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                    <span>{post.likes + (liked ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{post.author.name}</h3>
                    <p className="text-gray-600 mb-2">{post.author.role}</p>
                    <p className="text-gray-700 text-sm">
                      Passionate about creating user-centered designs and improving digital experiences. 
                      Currently working on making technology more accessible and inclusive for everyone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Table of Contents */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Table of contents</h3>
                <nav className="space-y-2">
                  <a href="#introduction" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    Introduction
                  </a>
                  <a href="#software-tools" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    Software and tools
                  </a>
                  <a href="#other-resources" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    Other resources
                  </a>
                  <a href="#wrapping-text" className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    Wrapping text
                  </a>
                </nav>
              </div>

              {/* Related Articles */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Related articles</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="group cursor-pointer">
                      <div className="aspect-video bg-gray-100 rounded-lg mb-2"></div>
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        Related article title goes here and it can be quite long
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BlogPostDetail;