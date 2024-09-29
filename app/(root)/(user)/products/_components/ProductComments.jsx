import React, { useState } from "react";

const ProductComments = () => {
  // Initial comments data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Alice",
      comment: "These sneakers are amazing! Super comfortable.",
      rating: 5,
    },
    {
      id: 2,
      author: "Bob",
      comment: "Not bad, but the sizing runs a little small.",
      rating: 3,
    },
    {
      id: 3,
      author: "Charlie",
      comment: "Good shoes, but the delivery was delayed.",
      rating: null,
    },
  ]);

  // New comment state
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRating, setNewRating] = useState(null);

  const addComment = () => {
    if (newComment && newAuthor) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: newAuthor,
          comment: newComment,
          rating: newRating,
        },
      ]);
      // Clear input fields after submission
      setNewComment("");
      setNewAuthor("");
      setNewRating(null);
    }
  };

  return (
    <div className="mt-12">
      <h3 className="text-3xl font-bold mb-6">Customer Reviews</h3>

      {/* Existing Comments */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-6 bg-white shadow-md rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xl font-semibold">{comment.author}</h4>
              {comment.rating !== null && (
                <div className="flex space-x-1 text-yellow-500">
                  {Array(comment.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-xl">★</span>
                    ))}
                  {Array(5 - comment.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-xl text-gray-300">★</span>
                    ))}
                </div>
              )}
            </div>
            <p className="text-gray-700 text-lg">{comment.comment}</p>
          </div>
        ))}
      </div>

      {/* Add New Comment */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
        <h4 className="text-2xl font-semibold mb-4">Leave a Comment</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          />
          <select
            value={newRating || ""}
            onChange={(e) => setNewRating(Number(e.target.value))}
            className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
          >
            <option value="">Rating (Optional)</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <textarea
          placeholder="Your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="block w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500"
          rows="4"
        ></textarea>
        <button
          onClick={addComment}
          className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Submit Comment
        </button>
      </div>
    </div>
  );
};

export default ProductComments;
