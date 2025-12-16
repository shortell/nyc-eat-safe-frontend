"use client";

import React, { useState, useEffect, useRef, useId } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
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
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/search`, {
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
                console.log(data);
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

    const id = useId();

    return (
        <form onSubmit={handleFormSubmit}>
            <Autocomplete
                id={id}
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
                        label="Search"
                        placeholder="Restaurant"
                        sx={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50px',
                            width: '100%',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '50px',
                                paddingRight: '8px !important',
                                '& fieldset': {
                                    border: 'none',
                                },
                                '&:hover fieldset': {
                                    border: 'none',
                                },
                                '&.Mui-focused fieldset': {
                                    border: 'none',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                marginLeft: '12px',
                                '&.Mui-focused': {
                                    color: '#1655A0',
                                }
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {params.InputProps.endAdornment}
                                    <InputAdornment position="end">
                                        <IconButton
                                            type="submit"
                                            edge="end"
                                            sx={{
                                                backgroundColor: '#1655A0',
                                                color: 'white',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px',
                                                padding: '8px',
                                                mr: 0.5,
                                                transition: 'background-color 0.2s ease',
                                                '&:hover': {
                                                    backgroundColor: '#134685',
                                                },
                                            }}
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        </form>
    );
};

export default HeadBar;

