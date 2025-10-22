import React from 'react'

// src/pages/Referral.jsx
export default function Referral() {
  return (
    <div className="bg-[#140932] text-gray-800 ">

      {/* Header Section with Gradient Overlay */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white text-center py-28 px-6"
        style={{ backgroundImage: "url('/about-header.jpg')" }} // Put your image in /public folder
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-700/80 z-0"></div>

        {/* Header Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Refer & Earn with Survico</h1>
          <p className="text-lg text-blue-100">
            Invite friends to Survico and earn commission every time they complete a task. The more people you invite, the more you earn!
        </p>
        </div>
      </section>

      

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">
        <div className="bg-blue-100 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">📢 How It Works</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-lg">
            <li>Sign up and get your unique referral link.</li>
            <li>Share your link with friends via social media, WhatsApp, or email.</li>
            <li>You earn a bonus every time someone joins and completes a survey or CPA task.</li>
            <li>Track your referrals and earnings from your dashboard.</li>
          </ul>
        </div>

        {/* Benefits Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">🎁 Why Refer Others?</h2>
          <ul className="space-y-2 text-lg text-gray-700 list-disc list-inside">
            <li>Earn passive income daily</li>
            <li>Unlimited referrals — invite as many as you want</li>
            <li>Fast payout system once your referrals earn</li>
            <li>Grow your network, grow your income</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-[#140932] text-white py-16 px-6 ">
        <h3 className="text-3xl font-bold mb-2">Start Referring and Earning</h3>
        <p className="mb-6 text-lg">Sign up now to get your unique referral link and start inviting friends today!</p>
        <a
          href="/signup"
          className="inline-block text-white bg-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Get Started Now
        </a>
      </section>

    </div>
  );
}

