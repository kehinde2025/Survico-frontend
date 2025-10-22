// src/pages/About.jsx
import React from 'react';
// This is the About page for Survico, showcasing the mission, how it works, and why users should choose Survico.
export default function About() {
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
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About Survico</h1>
          <p className="text-lg text-blue-100">
            At Survico, we believe your opinions matter. That’s why we pay you to share them.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-10 max-w-6xl mx-auto px-6 py-16">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
          <p className="text-lg text-gray-400">
            Survico empowers users to earn money online by simply participating in surveys.
            We bridge the gap between brands that need feedback and real people who want to be rewarded for sharing it.
          </p>
        </div>
        <div className="md:w-1/2">
          <img src="/mission-illustration.svg" alt="Mission" className="w-full rounded-xl shadow-md" />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#140932] py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Create a free account",
              "Complete your profile",
              "Answer surveys honestly",
              "Get paid instantly",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-[#524675] rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <span className="text-3xl font-bold text-white">{i + 1}</span>
                <p className="mt-2 text-gray-300">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Survico Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-10">Why Choose Survico?</h2>
          <ul className="space-y-4 text-lg text-gray-400 list-disc list-inside">
            <li>✅ Fast and secure payouts</li>
            <li>✅ Surveys matched to your interests</li>
            <li>✅ No hidden fees or tricks</li>
            <li>✅ Trusted by thousands of users</li>
          </ul>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-[#140932] text-white px-6">
        <h3 className="text-3xl font-bold mb-4">Ready to earn from your opinions?</h3>
        <p className="mb-6 text-lg">Join thousands of users getting paid through Survico today.</p>
        <a
          href="/signup"
          className="inline-block bg-blue-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Join Survico Now
        </a>
      </section>

    </div>
  );
}
