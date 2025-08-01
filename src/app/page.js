// "use client";

// import { useState, useEffect } from 'react';
// import CategoryPreview from '@/components/CategoryPreview';

// export default function Home() {
//   const [categoriesData, setCategoriesData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         const response = await fetch('https://nyc-eat-safe-production.up.railway.app/home');
//         if (!response.ok) {
//           throw new Error('Failed to fetch home data');
//         }
//         const data = await response.json();
//         setCategoriesData(data);
//       } catch (err) {
//         console.error('Error fetching home data:', err);
//         setError('Failed to load data. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHomeData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center text-red-500">
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full max-w-full mx-auto px-4 py-6 space-y-8 bg-[#f5f2fa]">
//       {categoriesData?.borderline_a_grades && (
//         <CategoryPreview
//           title="Borderline A Restaurants"
//           restaurants={categoriesData.borderline_a_grades}
//         />
//       )}
//       {categoriesData?.cleanest_a_grades && (
//         <CategoryPreview
//           title="Cleanest Restaurants"
//           restaurants={categoriesData.cleanest_a_grades}
//         />
//       )}
//       {/* Add more category sections as needed */}
//     </div>
//   );
// }

"use client"

import { useState, useEffect } from 'react'
import CategoryPreview from '@/components/CategoryPreview'
// import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [categoriesData, setCategoriesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await fetch(
          'https://nyc-eat-safe-production.up.railway.app/home'
        )
        if (!res.ok) throw new Error('Failed to fetch home data')
        setCategoriesData(await res.json())
      } catch (err) {
        console.error(err)
        setError('Failed to load data.')
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    )

  return (
    <div className="w-full max-w-full mx-auto px-4 pt-1 pb-6 space-y-6 bg-[#f5f2fa]">
      <p className="text-xs text-gray-600 text-center mt-1 mb-2">
        Data is publicly available from the NYC Dept. of Health
      </p>

      {categoriesData?.risky_a_grades && (
        <CategoryPreview
          title="Borderline A Restaurants"
          endpoint="/risky-a-grades"
          restaurants={categoriesData.risky_a_grades}
        />
      )}
      {categoriesData?.cleanest_a_grades && (
        <CategoryPreview
          title="Cleanest Restaurants"
          endpoint="/cleanest-a-grades"
          restaurants={categoriesData.cleanest_a_grades}
        />
      )}
      {/* etc… */}
    </div>
  )

}
