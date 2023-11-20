"use client";

import { useState } from 'react'
import Jelly from "../components/Jelly"

const challenge1 = () => {
    const [jellyData, setJellyData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      setJellyData({
        ...jellyData,
        [e.target.id]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault(); // prevents page reload
      try {
        setLoading(true);
        setError(null);
        setJellyData({});
  
        //Check valid jelly link
        if (!jellyData.jellyLink.includes("www.jellyjelly.com/ti/r")) {
          setError("Invalid jelly link");
          setLoading(false);
          return;
        }
  
        // Get jelly id from link
        var linkSplit = jellyData.jellyLink.split('/');
        var id = linkSplit[linkSplit.length - 1];
        
        // Get jelly 
        const jellyResp = await fetch("/api/jelly", {
          method: "POST",
          headers : {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"id": id}),
        });
        const jelly = await jellyResp.json();
        var title = jelly.title;
        var summary = jelly.summary;
  
        // Get generated image
        const dalleResp = await fetch("/api/dalle3", {
          method: "POST",
          headers : {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"prompt": title}),
        });
        const dalle = await dalleResp.json();
        var imageUrl = dalle.imageUrl;
  
        setLoading(false);
        setJellyData({
            ...jellyData,
            title: title,
            summary: summary,
            imageUrl: imageUrl,
        });

      } catch (err) {
        setLoading(false);
        setError(err.message);
        console.log(error);
      }
    }
    return (
      <div className="flex items-center">
        <label className="mr-2 text-lg" htmlFor="jellyLink">
          Enter a jelly link:
        </label>
        <input
          type="text"
          id="jellyLink"
          className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:border-blue-500"
          placeholder="https://example.com/jelly"
          value={jellyData.jellyLink}
          onChange={handleChange}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Loading..." : "Generate Image"}
        </button>
        {jellyData.imageUrl &&
          <Jelly 
            imgSrc={jellyData.imageUrl} 
            title={jellyData.title} 
            summary={jellyData.summary} 
          />
        }
        {error && <p>{error}</p>}
    </div>
    )
}

export default challenge1