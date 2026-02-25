import React from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export default function FilterDashboard({
    // Zipcode Props
    zipcode,
    onZipcodeChange,

    // Location Props
    locationStatus,
    requestLocation,
    showLocationControls, // boolean: true if location is found (or if we want to show controls)

    // Radius Props
    radius,
    setRadius, // (val) => void

    // Custom Slots
    sortChildren, // React Node for the Sort chips

    // State Props
    controlsDisabled = false, // true if zipcode is entered (overriding location)

    // Layout Props
    className = ""
}) {
    return (
        <div className={`w-full md:flex-1 md:flex md:justify-end ${className}`}>
            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6 w-full md:w-auto">

                {/* Radius Section */}
                {showLocationControls && (
                    <div className={`w-full md:w-auto flex flex-col gap-1 transition-opacity duration-200 ${controlsDisabled ? 'opacity-40 pointer-events-none' : ''}`}>
                        <div className="flex flex-col items-start gap-1 w-full md:w-auto min-w-[200px] md:min-w-[250px] px-2">
                            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap ml-1">
                                Radius
                            </span>
                            <Slider
                                value={radius || 11}
                                onChange={(e, val) => setRadius(val === 11 ? null : val)}
                                min={1}
                                max={11}
                                step={1}
                                disabled={controlsDisabled}
                                marks={[
                                    { value: 1, label: '1 mile' },
                                    { value: 11, label: <span className="mr-3">Citywide</span> }
                                ]}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(val) => val === 11 ? 'Citywide' : val}
                                sx={{ width: '96%', mx: 'auto' }}
                            />
                        </div>
                    </div>
                )}

                {showLocationControls && <div className="hidden md:block h-8 w-px bg-gray-200"></div>}

                {/* Sort Section */}
                {showLocationControls && (
                    <div className={`w-full md:w-auto flex flex-wrap items-center gap-3 transition-opacity duration-200 ${controlsDisabled ? 'opacity-40 pointer-events-none' : ''}`}>
                        <span className="text-sm font-semibold text-gray-700">Sort:</span>
                        {sortChildren}
                    </div>
                )}

                {showLocationControls && <div className="hidden md:block h-8 w-px bg-gray-200"></div>}

                {/* Zipcode Section */}
                <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center gap-2">
                    <TextField
                        id="zipcode-input"
                        label="Zipcode"
                        variant="outlined"
                        size="small"
                        value={zipcode}
                        onChange={onZipcodeChange}
                        sx={{ backgroundColor: 'white', width: { xs: '95%', md: '140px' } }}
                        placeholder="Zipcode"
                    />

                    {/* Show "Use Location" button only if we don't have location yet */}
                    {locationStatus !== 'found' && (
                        <>
                            <span className="hidden md:block text-gray-400 font-medium text-sm">OR</span>
                            <Button
                                variant="contained"
                                onClick={requestLocation}
                                startIcon={<MyLocationIcon />}
                                size="small"
                                sx={{
                                    backgroundColor: '#2563eb',
                                    textTransform: 'none',
                                    whiteSpace: 'nowrap',
                                    width: { xs: '100%', md: 'auto' },
                                    '&:hover': { backgroundColor: '#1d4ed8' }
                                }}
                            >
                                {locationStatus === 'finding' ? 'Locating...' : 'Use My Location'}
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
