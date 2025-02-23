import React, { useState } from "react";

const VirtualDarshan = () => {
  const [reactions, setReactions] = useState({ "🙏": 0, "❤️": 0, "🔥": 0 });
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  // Function to handle reaction clicks
  const handleReaction = (emoji) => {
    setReactions({ ...reactions, [emoji]: reactions[emoji] + 1 });
  };

  // Function to handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      setComments([...comments, commentInput]);
      setCommentInput("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen py-5"style={{marginTop:'-20px'}}>
      {/* Live Stream Container */}
      <div className=" bg-black rounded-lg overflow-hidden shadow-lg relative"style={{width:'1270px'}}>
        <video className="w-full h-96" controls>
          <source src="/path-to-live-stream" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Reaction Buttons */}
      <div className="flex space-x-4 mt-4"style={{width:'1200px'}}>
        {Object.keys(reactions).map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className="bg-blue shadow-lg px-4 py-2 rounded-full text-2xl"
          >
            {emoji} {reactions[emoji]}
          </button>
        ))}
      </div>
      
      {/* Comment Section */}
      <div className="w-full max-w-2xl mt-6 bg-white p-4 rounded-lg shadow-md"style={{width:'1200px'}}>
        <h2 className="text-lg font-bold mb-2">Comments</h2>
        <div className="max-h-40 overflow-y-auto">
          {comments.map((comment, index) => (
            <p key={index} className="bg-gray-200 p-2 rounded-md mb-2">{comment}</p>
          ))}
        </div>
        <form onSubmit={handleCommentSubmit} className="mt-4 flex">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 p-2 border rounded-l-md"
          />
          <button type="submit" className="bg-orange-500 text-white font-semibold flex items-center px-2 py-1 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default VirtualDarshan;
