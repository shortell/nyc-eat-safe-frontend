"use client";

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function FeedbackPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, message };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Error submitting feedback');
      }

      setStatus('Feedback submitted successfully!');
      setIsSuccess(true);
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('There was an error submitting your feedback.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#f6f3fa] px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[#2A3E83] text-center mb-6">
          Feedback
        </h1>

        <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed">
          Thank you for using <strong>NYC Eat Safe</strong>. Every piece of feedback helps.
        </p>

        {status && (
          <div className={`mb-6 p-4 rounded-lg text-center ${isSuccess ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
            <p className="font-medium">{status}</p>
          </div>
        )}

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <TextField
            label="Email (optional)"
            variant="outlined"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&.Mui-focused fieldset': {
                  borderColor: '#2A3E83',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#2A3E83',
              },
            }}
          />
          <TextField
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            required
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '&.Mui-focused fieldset': {
                  borderColor: '#2A3E83',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#2A3E83',
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            className="self-center px-10 font-bold"
            sx={{
              backgroundColor: '#2A3E83',
              '&:hover': {
                backgroundColor: '#1E2D60',
              },
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
