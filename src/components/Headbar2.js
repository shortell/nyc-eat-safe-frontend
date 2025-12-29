"use client";
import React, { useState } from 'react';
import Searchbar from './Searchbar';
import BoroughSelect from './BoroughSelect';


import Link from 'next/link';

const HeadBar2 = () => {
    const [selectedBoroughs, setSelectedBoroughs] = useState([]);

    const handleBoroughSelectClose = (boroughs) => {
        // This function will be called when the borough selector is closed
        console.log("Borough selection updated:", boroughs);
        // No need to update state here as it's already being updated in the BoroughSelect component
        // The selectedBoroughs state is already shared with the Searchbar component
    };

    return (
        <div className="bg-gradient-to-b from-[#2A3E83] via-[#1655A0] to-[#016CCE] bg-gradient-to-b from-[0%] via-[90%] to-[98%] text-white py-6">
            <Link href="/">
                <h1 className="text-center text-4xl font-bold mb-2 font-mono cursor-pointer transition-opacity hover:opacity-90">NYC Eat Safe</h1>
            </Link>
            <p className="text-center text-base font-light italic tracking-wide text-blue-100 antialiased mb-4">
                An A isn’t always an A
            </p>




            {/* Container for Searchbar (2/3) and BoroughSelect (1/3) */}
            {/* Container for Searchbar and BoroughSelect */}
            <div className="flex w-full max-w-[1600px] mx-auto gap-4 px-4 md:px-8 lg:px-12 items-center">
                <div className="flex-grow bg-[#F0F8FF] rounded-[50px] p-2">
                    <Searchbar selectedBoroughs={selectedBoroughs} />
                </div>
                <div className="flex-none bg-[#F0F8FF] rounded-full p-2">
                    <BoroughSelect
                        selectedBoroughs={selectedBoroughs}
                        setSelectedBoroughs={setSelectedBoroughs}
                        onClose={handleBoroughSelectClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeadBar2;