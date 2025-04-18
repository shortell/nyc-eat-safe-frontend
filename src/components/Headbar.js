"use client"; // Ensures this component runs on the client side

import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const HeadBar = () => {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const timeoutRef = useRef(null);

    // Function to perform the actual API call
    const performSearch = async (query) => {
        if (query.trim() !== "") {
            try {
                const response = await fetch(`http://127.0.0.1:8000/search?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
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
        <div className="flex justify-center items-center h-full bg-gray-200 shadow-md relative my-8 p-8">
            <Autocomplete
                className="w-1/2"
                freeSolo
                options={results || []}
                getOptionLabel={(option) => option?.dba || ""}
                onInputChange={handleChange}
                renderOption={(props, option) => {
                    const { key, ...restProps } = props; // Extract the key from props
                    return (
                        <li key={key} {...restProps}>
                            <div>
                                <strong>{capitalizeWords(option.dba || '')}</strong>
                                <div>
                                    {option.street && option.borough
                                        ? (
                                            <>
                                                <span className="font-medium">{capitalizeWords(option.street)}</span>
                                                {', '}
                                                <span className="text-gray-500 text-sm text-right">{capitalizeWords(option.borough)}</span>
                                            </>
                                        )
                                        : 'View All'}
                                </div>
                            </div>
                        </li>
                    );
                }}
                renderInput={(params) => (
                    <TextField {...params} label="Restaurant" />
                )}
            />
        </div>
    );
};

export default HeadBar;