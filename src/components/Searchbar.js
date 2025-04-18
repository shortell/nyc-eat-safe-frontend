"use client"; // Ensures this component runs on the client side

import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const HeadBar = () => {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const timeoutRef = useRef(null);

    // Function to perform the actual API call
    // const performSearch = async (query) => {
    //     if (query.trim() !== "") {
    //         try {
    //             const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}`);
    //             // print the length of the response
    //             // console.log("Response length:", response.length);
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             const data = await response.json();
    //             console.log("Data length:", data.length);
    //             setResults(data); // Update state with fetched results
    //         } catch (error) {
    //             console.error("Error fetching search results:", error);
    //             setResults([]); // Clear results on error
    //         }
    //     } else {
    //         setResults([]); // Clear results if input is empty
    //     }
    // };
    // Function to perform the actual API call
    const performSearch = async (query) => {
        if (query.trim() !== "") {
            try {
                const response = await fetch('http://127.0.0.1:8000/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query: query })
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await response.json();
                console.log("Data length:", data.length);
                setResults(data); // Update state with fetched results
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults([]); // Clear results on error
            }
        } else {
            setResults([]); // Clear results if input is empty
        }
    };

    // Effect to handle debouncing
    useEffect(() => {
        // Clear previous timeout if it exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout
        timeoutRef.current = setTimeout(() => {
            performSearch(searchTerm);
        }, 500); // 500ms delay

        // Cleanup function to clear timeout when component unmounts or searchTerm changes
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [searchTerm]);

    // Function to handle input changes
    const handleChange = (event, newValue) => {
        setSearchTerm(newValue);
    };

    const capitalizeWords = (text) => {
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <Autocomplete
            freeSolo
            options={results || []}
            getOptionLabel={(option) => option?.dba || ""}
            filterOptions={(options) => options}
            isOptionEqualToValue={(option, value) => option.dba === value.dba && option.street === value.street}
            onInputChange={handleChange}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={`${option.dba}-${option.street}`} >
                        <div>
                            <strong>{capitalizeWords(option.dba || '')}</strong>
                            <div>
                                {option.quantity !== 1
                                    ? `View ${option.quantity || 0} locations`
                                    : (
                                        <>
                                            <span className="font-medium">{capitalizeWords(option.street || '')}</span>
                                            {option.borough && ', '}
                                            <span className="text-gray-500 text-sm text-right">{capitalizeWords(option.borough || '')}</span>
                                        </>
                                    )}
                            </div>
                        </div>
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Restaurant"
                    sx={{
                        backgroundColor: '#F0F8FF',
                        width: '100%',
                    }} />
            )}
        />
    );
};

export default HeadBar;