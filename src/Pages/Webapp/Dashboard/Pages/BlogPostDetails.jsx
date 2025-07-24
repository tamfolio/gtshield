import React, { useState } from 'react';
import { Calendar, User, Clock, Share2, Bookmark, Heart, MessageCircle, Eye, Send, Link2, X, Facebook, Linkedin } from 'lucide-react';
import Navbar from '../../../../Components/Website/Navbar';
import Footer from '../../../../Components/Website/LandingPage/Footer';

const BlogPostDetail = ({ postId = '1', onBack }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState('');

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
        
        <img src="/api/placeholder/600/300" alt="Team collaboration" class="w-full rounded-lg my-6" />
        
        <blockquote>
          "In a world where and more competitive than care they move particularly are more information and technicians at the phones are loyal and or never attended. Andy by whom are their never hear."
          <footer>— Olivia Rhye, Product Designer</footer>
        </blockquote>
        
        <h2>Software and tools</h2>
        <p>UI design is a process from the client, meet, and when organizations really matter, no user is usually happy with your implementation. Regardless of the UX design in the matter, most players want what the UI provides, especially when they're users actively make yourself efficient throughout.</p>
        
        <p>UI UX design is to understand complex, whether it gets a recognized really or not not is not that something new to point against.</p>
        
        <img src="/api/placeholder/600/400" alt="Designer workspace" class="w-full rounded-lg my-6" />
        
        <p>We like to audience and too. Perhaps at first, you're interested commercial competencies seriously. And 'commercial' there is just certain designing specifically design but how to make your site 'something' successful. Commercial design implementation, UX design integration can even increase about the UI design.</p>
        
        <h2>Heading text</h2>
        <p>We set up the layout for layout, selecting set up for layout, layout as structured business is up on layouts. You will think our text, such as business on each as layout layout business on do not have to much structured layout. You always choose not to much, and will lead layout on the list. They will structured not, at these, their than on text, and then find text, than structured business as is single as much on much.</p>
        
        <p>Once and five text directions suggest very condition. Report against commercial communications so maybe is 'throughout marketing every very social' business is.</p>
      `
    }
  };

  const post = blogPosts[postId] || blogPosts[1];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Women Safety': return 'text-purple-600 bg-purple-50';
      case 'Child Protection': return 'text-blue-600 bg-blue-50';
      case 'Reporting Guide': return 'text-green-600 bg-green-50';
      case 'Civic Rights': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      // Handle comment submission
      console.log('Comment submitted:', comment);
      // Here you would typically send the comment to your backend
      // For now, we'll just clear the form
      setComment('');
      // You could also show a success message or add the comment to local state
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
    alert('Link copied to clipboard!');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    switch(platform) {
      case 'x':
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
      <Navbar isAuthenticated={true}/>

      {/* Featured Badge */}
      {post.featured && (
        <div className="text-center py-4 bg-gray-50">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
            Featured on Jan 2024
          </span>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {post.subtitle}
          </p>
        </div>

        {/* Hero Image */}
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-12">
          <img 
            src={post.heroImage} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:p-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-ul:text-gray-700 prose-li:marker:text-blue-500 prose-img:rounded-lg">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Article Actions - Removed, replaced with author section */}

        {/* Author Bio Section */}
        <div className="border-t border-gray-200 pt-8 mt-16">
          <div className="flex items-center justify-between">
            {/* Left side - Author info */}
            <div className="flex items-center gap-4">
              {/* Author Avatar */}
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              
              {/* Author Info */}
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {post.author.name}
                </h3>
                <p className="text-sm text-gray-500">{post.author.role}</p>
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
                onClick={() => handleShare('x')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share on X"
              >
                <X className="w-5 h-5" />
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

        {/* Read time at bottom */}
        <div className="mt-12 mb-20 text-center">
          <p className="text-sm text-gray-500">
            <Clock className="w-4 h-4 inline mr-1" />
            {post.readTime}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Comments (100)</h2>
          
          {/* Comment Form */}
          <div className="mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share your thoughts
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write your comment here..."
              />
            </div>
            <button
              onClick={handleCommentSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit
            </button>
          </div>

          {/* Sample Comments */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">RE</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">Roger Edwards</h4>
                    <span className="text-gray-500 text-sm">2 hours ago</span>
                  </div>
                  <p className="text-gray-700">
                    I've done extensive research around health of cases and workloads, though sometimes I'm wondering exactly what direction digital health is taking. I have verified different data sources on our company internal calls, but I'm not totally sure what's next because cost structure.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-gray-500 hover:text-gray-700 text-sm">Like</button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm">Reply</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">CA</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">Candice Alexander</h4>
                    <span className="text-gray-500 text-sm">6 hours ago</span>
                  </div>
                  <p className="text-gray-700">
                    While I've been building content at home-lab systems and know I did it correctly. I thought I would walk them through details because our test cases could save them some time. I wonder if there is a better way to get past a few obstacles about this message.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <button className="text-gray-500 hover:text-gray-700 text-sm">Like</button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              See 98 more comments
            </button>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default BlogPostDetail;