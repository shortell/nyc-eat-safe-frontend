import React, { createContext, useState } from 'react';

export const BoroughContext = createContext();

export const BoroughProvider = ({ children }) => {
    const [selectedBoroughs, setSelectedBoroughs] = useState([]);

    return (
        <BoroughContext.Provider value={{ selectedBoroughs, setSelectedBoroughs }}>
            {children}
        </BoroughContext.Provider>
    );
};