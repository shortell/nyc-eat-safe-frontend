// "use client";
// import React from 'react';
// import Searchbar from './Searchbar';
// import BoroughSelect from './BoroughSelect';

// const HeadBar2 = () => {
//     return (
//         <div>
//             <h1>NYC Eat Safe</h1>
//             {/* Container for Searchbar (2/3) and BoroughSelect (1/3) */}
//             <div className="flex w-full">
//                 <div className="w-2/3 pr-2">
//                     <Searchbar />
//                 </div>
//                 <div className="w-1/3">
//                     <BoroughSelect />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeadBar2;
"use client";
import React, { useState } from 'react';
import Searchbar from './Searchbar';
import BoroughSelect from './BoroughSelect';


const HeadBar2 = () => {
    const [selectedBoroughs, setSelectedBoroughs] = useState([]);

    return (
        // <div className="bg-gradient-to-r from-[#202e66] to-[#364db1] text-white p-6 ">
        <div className="bg-[#2a3d83] text-white p-6 ">

            <h1 className="text-center text-4xl font-bold mb-8 font-mono">NYC Eat Safe</h1>
            {/* Container for Searchbar (2/3) and BoroughSelect (1/3) */}
            <div className="flex w-full gap-4">
                <div className="w-5/9 bg-[#F0F8FF] rounded-lg pt-2 pr-2 pl-2 pb-2">
                    <Searchbar />
                </div>
                <div className="w-4/9 bg-[#F0F8FF] rounded-lg pt-2 pr-2 pl-2 pb-2">
                    <BoroughSelect
                        selectedBoroughs={selectedBoroughs}
                        setSelectedBoroughs={setSelectedBoroughs}
                    />
                </div>
            </div>
        </div>
    );
};

export default HeadBar2;