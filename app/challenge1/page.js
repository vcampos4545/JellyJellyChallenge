"use client";

import { useState } from 'react'
import Jelly from "../components/Jelly"

const challenge1 = () => {
    const [jellyData, setJellyData] = useState({});
    const [jellyLink, setJellyLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [generateImageWith, setGenerateImageWith] = useState('title');

    const handleSubmit = async (e) => {
      e.preventDefault(); // prevents page reload
      try {
        setLoading(true);
        setError(null);
        setJellyData({});
  
        //Check valid jelly link
        if (!jellyLink.includes("www.jellyjelly.com/ti/r")) {
          setError("Invalid jelly link");
          setLoading(false);
          return;
        }
  
        // Get jelly id from link
        var linkSplit = jellyLink.split('/');
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
        console.log(title)
        console.log(summary)
  
        // Get generated image
        const dalleResp = await fetch("/api/dalle3", {
          method: "POST",
          headers : {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({"prompt": generateImageWith === "title" ? title : summary}),
        });
        console.log(dalleResp)
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
        setError(err);
        console.log(error);
      }
    }
    return (
      <div className="container mx-auto p-4 text-center flex-center">
        {/* Search Input */}
        <div className="mb-4">
          <label htmlFor="jellyLinkInput" className="block text-lg font-semibold mb-2">
            Enter a Jelly Link:
          </label>
          <input
            type="text"
            id="jellyLink"
            value={jellyData.jellyLink}
            onChange={(e) => setJellyLink(e.target.value)}
            className="border p-2 w-full"
          />
        </div>

        {/* Generate Image Dropdown */}
        <div className="mb-4">
          <label htmlFor="generateImageDropdown" className="block text-lg font-semibold mb-2">
            Generate Image with:
          </label>
          <select
            id="generateImageDropdown"
            value={generateImageWith}
            onChange={(e) => setGenerateImageWith(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="title">Title</option>
            <option value="summary">Summary</option>
          </select>
        </div>

        {/* Generate Image Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
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