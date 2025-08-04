import React from 'react'
import Link from 'next/link'
import RestaurantList from './RestaurantList'

export default function CategoryPreview({ title, endpoint, restaurants, bgColor = "bg-white" }) {
  const href =
    '/category?' +
    new URLSearchParams({
      category_name: title,
      category_endpoint: endpoint,
    }).toString()

  return (
    <Link href={href} className="block cursor-pointer group">
      <div className={`w-full max-w-[600px] ${bgColor} rounded-xl shadow-lg ring-1 ring-gray-200 overflow-hidden`}>

        <h2 className="
          relative
          bg-gradient-to-b
          from-[#2A3E83] via-[#1655A0] to-[#016CCE]
          text-white px-4 py-3
          text-2xl font-bold
          pr-10
        ">
          {title}
          <span className="
            absolute right-4 top-1/2 -translate-y-1/2
            w-0 h-0
            border-l-[8px] border-l-white
            border-t-[6px] border-t-transparent
            border-b-[6px] border-b-transparent
          " />
        </h2>

        <div className="p-4">
          <RestaurantList restaurants={restaurants} />
        </div>
      </div>
    </Link>
  )
}

