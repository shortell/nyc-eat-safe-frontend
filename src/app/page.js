"use client";

import { useState, useEffect } from 'react';
import CategoryPreview from '@/components/CategoryPreview';

// Backup data to use if fetch fails
const backupData = {
  "cleanest_a_grades": [
    {
      "camis": 50147482,
      "dba": "JAMROCK JERK",
      "borough": "Queens",
      "street": "109TH AVE",
      "zipcode": 11435,
      "inspection_date": "2025-03-14",
      "score": 0,
      "grade": "A"
    },
    {
      "camis": 50161413,
      "dba": "OFF GRIDS COMMON",
      "borough": "Queens",
      "street": "BELL BLVD",
      "zipcode": 11361,
      "inspection_date": "2025-02-28",
      "score": 0,
      "grade": "A"
    },
    {
      "camis": 50160902,
      "dba": "REBECCA'S CAKE POPS",
      "borough": "Manhattan",
      "street": "DELANCEY STREET",
      "zipcode": 10002,
      "inspection_date": "2025-02-27",
      "score": 0,
      "grade": "A"
    },
    {
      "camis": 50043079,
      "dba": "JJ BROWN CUP",
      "borough": "Manhattan",
      "street": "2 AVENUE",
      "zipcode": 10128,
      "inspection_date": "2025-02-21",
      "score": 0,
      "grade": "A"
    },
    {
      "camis": 50156262,
      "dba": "DONER HAUS",
      "borough": "Queens",
      "street": "30TH AVE",
      "zipcode": 11102,
      "inspection_date": "2025-02-19",
      "score": 0,
      "grade": "A"
    }
  ],
  "borderline_a_grades": [
    {
      "camis": 40586834,
      "dba": "PERFECTO PIZZA & COFFEE SHOP",
      "borough": "Queens",
      "street": "JAMAICA AVE",
      "zipcode": 11432,
      "inspection_date": "2022-08-23",
      "score": 43,
      "grade": "A"
    },
    {
      "camis": 50084407,
      "dba": "EL FOGON DOMINICANO RESTAURANT",
      "borough": "Bronx",
      "street": "MORRIS AVENUE",
      "zipcode": 10456,
      "inspection_date": "2025-02-21",
      "score": 27,
      "grade": "A"
    },
    {
      "camis": 50074809,
      "dba": "MOONSTRUCK EATERY",
      "borough": "Manhattan",
      "street": "EAST 58 STREET",
      "zipcode": 10022,
      "inspection_date": "2025-03-25",
      "score": 13,
      "grade": "A"
    },
    {
      "camis": 50000071,
      "dba": "GEORGIA DINER",
      "borough": "Queens",
      "street": "QUEENS BOULEVARD",
      "zipcode": 11373,
      "inspection_date": "2025-03-24",
      "score": 13,
      "grade": "A"
    },
    {
      "camis": 41429791,
      "dba": "RASPBERRY DELI & GROCERY",
      "borough": "Manhattan",
      "street": "2 AVENUE",
      "zipcode": 10029,
      "inspection_date": "2025-03-24",
      "score": 13,
      "grade": "A"
    }
  ]
};

// export default function Home() {
//   const [categoriesData, setCategoriesData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHomeData = async () => {
//       try {
//         // Check for cached data first
//         const cachedData = localStorage.getItem('homePageData');
//         const cachedTimestamp = localStorage.getItem('homePageDataTimestamp');
//         const now = new Date().getTime();

//         // Use cached data if it exists and is less than 1 hour old
//         if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < 3600000) {
//           console.log('Using cached data');
//           setCategoriesData(JSON.parse(cachedData));
//           setLoading(false);
//           return;
//         }

//         // Otherwise fetch fresh data
//         console.log('Fetching fresh data');
//         const response = await fetch('http://127.0.0.1:8000/home');

//         if (!response.ok) {
//           throw new Error('Failed to fetch home data');
//         }

//         const data = await response.json();

//         // Cache the data
//         localStorage.setItem('homePageData', JSON.stringify(data));
//         localStorage.setItem('homePageDataTimestamp', now.toString());

//         setCategoriesData(data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching home data:', err);
//         setError('Failed to load data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchHomeData();
//   }, []);

export default function Home() {
  const [categoriesData, setCategoriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Check for cached data first
        const cachedData = localStorage.getItem('homePageData');
        const cachedTimestamp = localStorage.getItem('homePageDataTimestamp');
        const now = new Date().getTime();

        // Use cached data if it exists and is less than 1 hour old
        if (cachedData && cachedTimestamp && (now - parseInt(cachedTimestamp)) < 3600000) {
          console.log('Using cached data');
          setCategoriesData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // Otherwise fetch fresh data
        console.log('Fetching fresh data'); // process.env.NEXT_PUBLIC_API_URL
        const response = await fetch('http://127.0.0.1:8000/home');

        if (!response.ok) {
          throw new Error('Failed to fetch home data');
        }

        const data = await response.json();

        // Cache the data
        localStorage.setItem('homePageData', JSON.stringify(data));
        localStorage.setItem('homePageDataTimestamp', now.toString());

        setCategoriesData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching home data:', err);
        console.log('Using backup data instead');
        // Use backup data instead of showing an error
        setCategoriesData(backupData);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2a3d83] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mx-auto px-4 py-6 space-y-8 bg-[#f5f2fa]">
      {categoriesData && (
        <>


          {categoriesData.borderline_a_grades && (
            <CategoryPreview
              title="Borderline A's"
              restaurants={categoriesData.borderline_a_grades}
            />
          )}



          {categoriesData.cleanest_a_grades && (
            <CategoryPreview
              title="Cleanest A's"
              restaurants={categoriesData.cleanest_a_grades}
            />
          )}

          {/* Add more category sections as needed */}
        </>
      )}
    </div>
  );
}