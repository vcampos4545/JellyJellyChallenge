import React from 'react'

const Home = () => {
  return (
    <section>
        <div className="bg-gradient h-screen flex items-center justify-center">
          <div className="card">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              A JellyJelly Coding Challenge
            </h1>
            <p className="text-gray-600 mb-8">
              A coding challenge for Jelly Jelly developed by Vaughn Campos.  On this simple site 
              you can generate album cover images using OpenAI's Dall-e-3 image generation model
              for a Jelly conversation and browse products listed on any shopify site.  
            </p>
          </div>
        </div>
    </section>
  )
}

export default Home