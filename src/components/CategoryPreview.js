// components/CategoryPreview.jsx
import React from 'react'
import Link from 'next/link'
import RestaurantList from './RestaurantList'

export default function CategoryPreview({ title, endpoint, restaurants }) {
  // build the query‐string
  const href =
    '/category?' +
    new URLSearchParams({
      category_name: title,
      category_endpoint: endpoint,
    }).toString()

  return (
    <Link href={href} className="block cursor-pointer">
      <div>
        <h2
          className="
            bg-gradient-to-b
            from-[#2A3E83] via-[#1655A0] to-[#016CCE]
            text-white p-3 rounded-md
            text-2xl font-bold mb-4
          "
        >
          {title}
        </h2>
        <RestaurantList restaurants={restaurants} />
      </div>
    </Link>
  )
}