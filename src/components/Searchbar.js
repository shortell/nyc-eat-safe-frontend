"use client";

import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/navigation';

const HeadBar = ({ selectedBoroughs }) => {
    const [results, setResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState('');
    const timeoutRef = useRef(null);
    const router = useRouter();

    const performSearch = React.useCallback(async (query) => {
        if (query.trim() !== "") {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_RAILWAY_BACKEND_ENDPOINT}/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: query,
                        borough_filter: selectedBoroughs
                    })
                });

                if (!response.ok) throw new Error("Network response was not ok");

                const data = await response.json();
                setResults(data);
            } catch (error) {
                setResults([]);
            }
        } else {
            setResults([]);
        }
    }, [selectedBoroughs]);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            performSearch(searchTerm);
        }, 350);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [searchTerm, selectedBoroughs, performSearch]);

    // Handle input text changes (for TextField)
    const handleInputChange = (event, newInputValue) => {
        setInputValue(newInputValue);
        setSearchTerm(newInputValue);
    };

    // Handle option selection
    const handleOptionSelect = (event, selectedOption) => {
        if (!selectedOption || typeof selectedOption !== "object") return;

        if (selectedOption.quantity > 1) {
            const boroughFilter = Array.isArray(selectedBoroughs)
                ? selectedBoroughs.join(',')
                : selectedBoroughs;
            router.push(`/search-chains?dba=${encodeURIComponent(selectedOption.dba)}&borough_filter=${encodeURIComponent(boroughFilter)}`);
        } else {
            // ✅ Updated to new dynamic route
            router.push(`/restaurant/${encodeURIComponent(selectedOption.camis || selectedOption.id)}`);
        }
    };


    // Form submission: pick the first result, if any
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (results && results.length > 0) {
            handleOptionSelect(null, results[0]);
        }
    };

    const capitalizeWords = (text) => {
        return text
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <Autocomplete
                freeSolo
                options={results || []}
                getOptionLabel={(option) => option?.dba || ""}
                filterOptions={(options) => options}
                isOptionEqualToValue={(option, value) =>
                    option.dba === value.dba && option.street === value.street
                }
                inputValue={inputValue}
                onInputChange={handleInputChange}
                onChange={handleOptionSelect}
                renderOption={(props, option) => (
                    <li {...props} key={`${option.dba}-${option.street}`} >
                        <div>
                            <strong>{capitalizeWords(option.dba || '')}</strong>
                            <div>
                                {option.quantity > 1
                                    ? `View ${(option.quantity - 1) || 0} locations`
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
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Restaurant"
                        sx={{
                            backgroundColor: '#F0F8FF',
                            width: '100%',
                        }}
                    />
                )}
            />
        </form>
    );
};

export default HeadBar;

