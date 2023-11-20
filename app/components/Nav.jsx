import React from 'react'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">
        <Link href="/">
          JellyJelly Challenge
        </Link>
      </div>

      <div className="space-x-4">
        <Link href="/challenge1" className="text-white">
          Challenge 1
        </Link>
        <Link href="/challenge2" className="text-white">
          Challenge 2
        </Link>
      </div>
    </nav>
  )
}

export default Nav