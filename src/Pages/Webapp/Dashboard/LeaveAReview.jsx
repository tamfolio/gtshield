import React, { useState } from 'react';

function LeaveAReview() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comments, setComments] = useState('');
  const [hideIdentity, setHideIdentity] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoveredRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    console.log({
      rating,
      comments,
      hideIdentity
    });
    // Handle form submission here
  };

  return (
    <div className="w-full flex flex-col items-center justify-start mx-auto bg-white p-8">
      <h1 className="text-2xl text-left font-semibold text-gray-900 mb-8">Rate Your Case</h1>
      
      {/* Rating Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              <svg
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? 'text-blue-600 fill-current'
                    : 'text-gray-300 fill-current'
                }`}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="mb-6">
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-3">
          Comments
        </label>
        <textarea
          id="comments"
          rows={6}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          placeholder="Share your experience..."
        />
      </div>

      {/* Hide Identity Checkbox */}
      <div className="mb-8">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={hideIdentity}
            onChange={(e) => setHideIdentity(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
          <span className="ml-2 text-sm text-gray-700">
            Hide my identity from police officers
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </button>
    </div>
  );
}

export default LeaveAReview;