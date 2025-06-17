import React from 'react';
import { ArrowLeft, Calendar, User, ExternalLink, MessageCircle, Heart, Share2 } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from '../LandingPage/Footer';

const SingleNewsPage = ({ article }) => {
  // Default article data if none provided
  const defaultArticle = {
    id: 1,
    title: "Community Engagement Hub",
    subtitle: "How we've been changing communities for the better with our strategies and increase user engagement that can shift our clients goals on UX presentations.",
    author: "Alec Whitten",
    date: "17 Jan 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
    category: "Community Engagement",
    tags: ["Community", "Engagement", "Strategy", "UX"],
    content: {
      introduction: "We believe that a positive force in lives, and, life often unexpected ways. During the initial customer journey, we ask a lot of questions designed to understand the client's vision and goals. Some family process companies and advice, they can view blueprint in an integral project process.",
      sections: [
        {
          heading: "Introduction",
          text: "We believe that a positive force in lives, and, life often unexpected ways. During the initial customer journey, we ask a lot of questions designed to understand the client's vision and goals. Some family process companies and advice, they can view blueprint in an integral project process.\n\nNothing beats well-earned rest. Perfect feathers provided data which expect approach. Spite of traditional ideas and received thoughts lives of. Mostly, to basics out of feathers expected. Gently provide for our team and us."
        },
        {
          heading: "Software and tools",
          text: "Slowly car buffalo more milk. Develop to graspable car math marked in. Non demonstrate change light nonetheless movie. Squash, various reusable well service. General with functional advisor networks. Scare well night of formal ideas. Seek our various help with are very different.\n\nGently provide for our team and us. Respect contribution, made task out-there. It necessary throughout difficult lives. Understood, hoping and blooming. Sprintax.\n\nSoft car to sketches and idea. Pushing at you, enter important communion experiences. Primarily help, ball considerations while life various helped care. Lightly hand, careful, and respectful. Feathers provided data which expect approach. Spite of traditional ideas and more towards future experienced. Memcache paper bonus hit. Alone times, approach bonus car ideas, sketches, primary."
        },
        {
          heading: "Other resources",
          text: "Slowly car buffalo more milk. Develop to graspable car math marked in. Non demonstrate change light nonetheless movie. Squash, various reusable well service. General with functional advisor networks. Scare well night of formal ideas. Seek our various help with are very different.\n\nGently provide for our team and us. Respect contribution, made task out-there. It necessary throughout difficult lives. Understood, hoping and blooming. Sprintax."
        }
      ],
      quote: "In a world diluted and more ubiquitous than ever, they never trusted and challenged, gifted with small versions of the greatest tools that could possibly be invented, we have never been more ready to excel."
    }
  };

  const currentArticle = article || defaultArticle;

  const handleBack = () => {
    // Navigate back to news list
    console.log('Navigate back to news list');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar isAuthenticated={false}/>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to News</span>
        </button>

        {/* Article Header */}
        <div className="mb-8">
          <div className="text-sm text-blue-600 font-medium mb-2">
            Published Jan 17, 2025
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentArticle.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {currentArticle.subtitle}
          </p>
          
          {/* Article Meta */}
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>{currentArticle.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{currentArticle.date}</span>
            </div>
            <span>{currentArticle.readTime}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {currentArticle.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img
            src={currentArticle.image}
            alt={currentArticle.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We believe that a positive force in lives, and, life often unexpected ways. During the initial customer journey, we ask a lot of questions designed to understand the client's vision and goals. Some family process companies and advice, they can view blueprint in an integral project process.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nothing beats well-earned rest. Perfect feathers provided data which expect approach. Spite of traditional ideas and received thoughts lives of. Mostly, to basics out of feathers expected. Gently provide for our team and us.
            </p>
          </div>

          {/* Image within content */}
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
              alt="Team collaboration"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Main Content Sections */}
          <div className="space-y-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Slowly car buffalo more milk. Develop to graspable car math marked in. Non demonstrate change light nonetheless movie. Squash, various reusable well service. General with functional advisor networks. Scare well night of formal ideas. Seek our various help with are very different.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Gently provide for our team and us. Respect contribution, made task out-there. It necessary throughout difficult lives. Understood, hoping and blooming. Sprintax.
              </p>
            </div>

            {/* Quote Block */}
            <blockquote className="border-l-4 border-blue-600 pl-6 py-4 my-8 bg-gray-50 rounded-r-lg">
              <p className="text-lg italic text-gray-800">
                "In a world diluted and more ubiquitous than ever, they never trusted and challenged, gifted with small versions of the greatest tools that could possibly be invented, we have never been more ready to excel."
              </p>
              <cite className="text-sm text-gray-600 mt-2 block">— Gateway Shield Team</cite>
            </blockquote>

            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Gently provide for our team and us. Respect contribution, made task out-there. It necessary throughout difficult lives. Understood, hoping and blooming. Sprintax.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Soft car to sketches and idea. Pushing at you, enter important communion experiences. Primarily help, ball considerations while life various helped care. Lightly hand, careful, and respectful. Feathers provided data which expect approach. Spite of traditional ideas and more towards future experienced. Memcache paper bonus hit. Alone times, approach bonus car ideas, sketches, primary.
              </p>
            </div>

            {/* Software and Tools Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Software and tools</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We believe that a positive force in lives, and, life often unexpected ways. During the initial customer journey, we ask a lot of questions designed to understand the client's vision and goals. Some family process companies and advice, they can view blueprint in an integral project process.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nothing beats well-earned rest. Perfect feathers provided data which expect approach. Spite of traditional ideas and received thoughts lives of. Mostly, to basics out of feathers expected. Gently provide for our team and us.
              </p>
            </div>

            {/* Other Resources Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Other resources</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Slowly car buffalo more milk. Develop to graspable car math marked in. Non demonstrate change light nonetheless movie. Squash, various reusable well service. General with functional advisor networks. Scare well night of formal ideas. Seek our various help with are very different.
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>A comprehensive guide to effective community engagement strategies</li>
                <li>Case studies from successful community transformation projects</li>
                <li>Tools and templates for measuring community impact</li>
                <li>Best practices for sustainable community development</li>
                <li>Free tools generators designed through combined use utilizing engagement, directly and to stay productive</li>
                <li>Development software programs or technical ideas and more</li>
              </ul>
            </div>

            {/* Final Image */}
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=500&fit=crop"
                alt="Professional workspace"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>

            {/* Closing Text */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Moving fast</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Rapidly changing context demands agility. As we learn, teach to understand applications while this can be the best learned programs. Promote communication between individuals and teams while ensuring the best outcomes for the community.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Through quality coaching and outcomes coming into practice, achieve clients and activities. Contribute and engaged future and personal skill. Structure ability tuning and continuing education programs. Programs for local staff and community collaboration, data effective and inclusive deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Article Actions */}
        <div className="border-t border-gray-200 pt-6 mt-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                <Heart className="w-5 h-5" />
                <span>24</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <MessageCircle className="w-5 h-5" />
                <span>12</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {currentArticle.date}
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">AW</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{currentArticle.author}</h3>
              <p className="text-sm text-gray-600">Community Engagement Specialist</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default SingleNewsPage;