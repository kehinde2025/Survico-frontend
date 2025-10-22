// src/components/Hero.jsx
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      className="relative bg-[#140932] text-center py-20 px-4 overflow-hidden mt-10"
    >
      {/* Background Logo */}
      <img
        src="bg-[#140932]"  // use transparent version!
        alt="Survico Logo Background"
        className="absolute inset-0 w-72 h-72 opacity-10 mx-auto mt-10 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto ">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
          <span className='text-yellow-500'>Earn money</span> by sharing your opinion.
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Join <span className="font-semibold text-blue-600">Survico</span> and get paid for completing simple surveys.
        </p>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>

       

    </section>

    
  );
}
