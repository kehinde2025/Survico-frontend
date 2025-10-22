import React from 'react'

import { useState } from 'react';

export default function Referr() {
  const userId = 'isaac123'; // Replace with dynamic ID from auth/user context
  const referralLink = `https://survico.com/signup?ref=${userId}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-blue-700">👥 Invite & Earn</h2>

      <p className="text-gray-700 text-center">
        Share your referral link and earn a bonus for every user that signs up and completes tasks!
      </p>

      <div className="bg-white shadow rounded p-4">
        <label className="text-sm text-gray-600 block mb-2 font-medium">Your Referral Link</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-3 py-2 border rounded bg-gray-100 text-gray-700 text-sm"
          />
          <button
            onClick={handleCopy}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <p className="text-gray-600 text-sm">Total Referrals: <span className="font-bold text-blue-700">7</span></p>
        <p className="text-gray-600 text-sm">Bonus Earned: <span className="font-bold text-green-700">₦1,750</span></p>
      </div>

      <p className="text-center text-gray-500 text-sm">
        Your friend must complete at least 1 task for your bonus to count.
      </p>
    </div>
  );
}
