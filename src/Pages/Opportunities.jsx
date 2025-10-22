// src/pages/Opportunities.jsx
export default function Opportunities() {
  return (
    <div className="bg-[#140932] ">

      
      {/* Header Section with Gradient Overlay */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white text-center py-28 px-6"
        style={{ backgroundImage: "url('/about-header.jpg')" }} // Put your image in /public folder
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-700/80 z-0"></div>

        {/* Header Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Multiple Ways to Earn on Survico</h1>
          <p className="text-lg text-blue-100">
            Survico gives you flexible options to make money online — fast, easy, and secure.
          </p>
        </div>
      </section>


      {/* Earning Methods */}
      <section className="max-w-6xl mx-auto px-6 py-16 space-y-12">

        {/* 1. Paid Surveys */}
        <div className="bg-blue-100 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-blue-800 mb-2">📋 Take Paid Surveys</h2>
          <p className="text-gray-700">
            Earn cash by answering simple questions. Surveys are matched to your profile for quick and honest feedback.
          </p>
        </div>

        {/* 2. CPA Tasks */}
        <div className="bg-yellow-100 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-yellow-800 mb-2">🧩 Complete CPA Tasks</h2>
          <p className="text-gray-700">
            Earn rewards for completing small tasks like signing up for free trials, submitting forms, or answering quizzes.
          </p>
        </div>

        {/* 3. Download Apps */}
        <div className="bg-green-100 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-green-800 mb-2">📱 Download & Use Apps</h2>
          <p className="text-gray-700">
            Get paid to try out free apps. Just download, open, and follow simple instructions to earn.
          </p>
        </div>

        {/* 4. Buy Through Our Link */}
        <div className="bg-purple-100 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-purple-800 mb-2">🛍️ Shop with Our Links</h2>
          <p className="text-gray-700">
            Earn cashbacks when you buy products through Survico’s special links. Save money while earning rewards.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-[#140932] text-white py-16 px-6">
        <h3 className="text-3xl font-bold mb-2">Start Earning Today</h3>
        <p className="mb-6 text-lg">Create your free Survico account and choose how you want to earn.</p>
        <a
          href="/signup"
          className="inline-block text-white bg-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition"
        >
          Join Survico Now
        </a>
      </section>
    </div>
  );
}
