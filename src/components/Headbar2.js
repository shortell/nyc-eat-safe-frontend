"use client";
import React, { useState } from 'react';
import Searchbar from './Searchbar';
import BoroughSelect from './BoroughSelect';


const HeadBar2 = () => {
    const [selectedBoroughs, setSelectedBoroughs] = useState([]);

    const handleBoroughSelectClose = (boroughs) => {
        // This function will be called when the borough selector is closed
        console.log("Borough selection updated:", boroughs);
        // No need to update state here as it's already being updated in the BoroughSelect component
        // The selectedBoroughs state is already shared with the Searchbar component
    };

    return (
        <div className="bg-gradient-to-b from-[#2A3E83] via-[#1655A0] to-[#016CCE] bg-gradient-to-b from-[0%] via-[90%] to-[98%] text-white p-6">
            <h1 className="text-center text-4xl font-bold mb-8 font-mono">NYC Eat Safe</h1>
            {/* Container for Searchbar (2/3) and BoroughSelect (1/3) */}
            <div className="flex w-full gap-4">
                <div className="w-5/9 bg-[#F0F8FF] rounded-lg pt-2 pr-2 pl-2 pb-2">
                    <Searchbar selectedBoroughs={selectedBoroughs} />
                </div>
                <div className="w-4/9 bg-[#F0F8FF] rounded-lg pt-2 pr-2 pl-2 pb-2">
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