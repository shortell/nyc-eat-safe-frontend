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
    <div className="p-4 bg-[#f5f2fa]">
      <h1 className="bg-gradient-to-b from-[#2A3E83] via-[#1655A0] to-[#016CCE] text-white p-3 rounded-md text-2xl font-bold mb-2">
        Feedback
      </h1>
      <div className="flex justify-center items-start min-h-[70vh] mt-0">
        <div className="flex flex-col gap-4 max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-700 mb-2">
            Thank you for using our website!
            Let us know what you like and don`t like about it so we can make it better.
          </p>
          {status && (
            <p className={`text-center text-sm ${isSuccess ? 'text-gray-700' : 'text-red-600'}`}>
              {status}
            </p>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextField
              label="Email (optional)"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-1/2 self-center"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}