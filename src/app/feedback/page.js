// "use client";

// import React from 'react';
// import TextField from '@mui/material/TextField';

// export default function FeedbackPage() {
//   return (
//     <div>
//       <h2>Feedback</h2>
//       <div>
//         <p></p>

//         <TextField
//           label="Email"
//           placeholder='Email (optional)'
//         />
//         <TextField
//           label="Message"
//           placeholder='Enter your feedback here...'
//           multiline
//         />

//       </div>

//     </div>
//   );
// }
"use client";

import React from 'react';
import TextField from '@mui/material/TextField';

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Feedback</h2>
        {/* Feedback introduction message */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">We’d Love to Hear From You!</h3>
          <p className="mb-2">
            Thank you for taking the time to share your thoughts — it really means a lot.
            Your feedback helps shape the future of this site.
          </p>
          <p className="mb-2">
            Tell us what you love so we don’t accidentally change it.
          </p>
          <p className="mb-2">
            Tell us what’s not working so we can change it.
          </p>
          <p className="mb-2">
            Tell us what’s missing so we can add it.
          </p>
          <p className="mb-2">
            Or just say hi — we’re listening!
          </p>
          <p className="mb-2">
            Every comment helps us make things better. Thanks again!
          </p>
        </div>
        {/* Feedback form */}
        <div className="space-y-4">
          <TextField
            fullWidth
            variant="outlined"
            label="Email (optional)"
            placeholder="johndoe@hotmail.net"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Message"
            placeholder="Enter your feedback here..."
            multiline
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}