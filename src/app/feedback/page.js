"use client";

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function FeedbackPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showInfoAlert, setShowInfoAlert] = useState(false);

  useEffect(() => {
    // Check if user has seen the new comments info
    const hasSeenInfo = sessionStorage.getItem('hasSeenCommentsInfo');
    if (!hasSeenInfo) {
      setShowInfoAlert(true);
      sessionStorage.setItem('hasSeenCommentsInfo', 'true');
    }
  }, []);



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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#f6f3fa] px-4 py-6">
      {showInfoAlert && (
        <div className="w-full max-w-7xl mb-4">
          <Alert severity="info" onClose={() => setShowInfoAlert(false)}>
            <span className="md:hidden">Welcome to the new Comments section! You can now see answered feedback below. Feel free to leave your own comments or feedback below.</span>
            <span className="hidden md:inline">Welcome to the new Comments section! You can now see answered feedback on the right. Feel free to leave your own comments or feedback below.</span>
          </Alert>
        </div>
      )}
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-[420px] shrink-0 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 md:p-10 md:sticky md:top-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#2A3E83] text-center mb-6">
            Let us know!
          </h1>

          <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed">
            See what others are saying or leave your own thoughts. Thank you for using <strong>NYC Eat Safe</strong>.
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
              rows={3}
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

        {/* Comments Section */}
        <div className="w-full flex-1 space-y-6 mt-1 md:mt-0">
          <h2 className="text-2xl font-bold text-[#2A3E83]">Answered Comments</h2>
          {comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="bg-white rounded-xl shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedComment(comment)}
            >
              <p className="text-xs text-gray-600 mb-1">
                {new Date(comment.created_date).toLocaleDateString()}
              </p>
              <div className="flex justify-between items-start mb-2 gap-4">
                <h3 className="font-bold text-lg text-gray-900">{comment.feedback_message}</h3>
                <Chip
                  label={comment.status}
                  variant="outlined"
                  className="shrink-0"
                  icon={comment.status === 'Fixed' ? <CheckIcon /> : undefined}
                  color={comment.status === 'Fixed' ? 'success' : 'default'}
                  sx={{
                    color: comment.status === 'Fixed' ? 'green' : undefined,
                    borderColor: comment.status === 'Fixed' ? 'green' : undefined,
                    '& .MuiChip-icon': {
                      color: comment.status === 'Fixed' ? 'green' : undefined,
                    }
                  }}
                />
              </div>

              {comment.response && (
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  <span className="font-medium text-gray-800">Response:</span> {comment.response}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedComment && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedComment(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedComment(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-1"
            >
              <CloseIcon />
            </button>

            <p className="text-xs text-gray-600 mb-2">
              {new Date(selectedComment.created_date).toLocaleDateString()}
            </p>

            <div className="flex justify-between items-start mb-6 gap-4 pr-8">
              <h3 className="font-bold text-2xl text-[#2A3E83]">{selectedComment.feedback_message}</h3>
              <Chip
                label={selectedComment.status}
                variant="outlined"
                className="shrink-0"
                icon={selectedComment.status === 'Fixed' ? <CheckIcon /> : undefined}
                color={selectedComment.status === 'Fixed' ? 'success' : 'default'}
                sx={{
                  color: selectedComment.status === 'Fixed' ? 'green' : undefined,
                  borderColor: selectedComment.status === 'Fixed' ? 'green' : undefined,
                  '& .MuiChip-icon': {
                    color: selectedComment.status === 'Fixed' ? 'green' : undefined,
                  }
                }}
              />
            </div>

            {selectedComment.response && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm font-bold text-gray-700 mb-2">Response:</p>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedComment.response}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
