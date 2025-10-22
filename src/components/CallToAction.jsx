// src/components/FinalCTA.jsx
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="bg-[#140932] text-white py-16 text-center px-6">
      <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
      <p className="mb-6 text-lg">Join thousands of users making money with Survico every day.</p>
      <Link
        to="/signup"
        className="bg-[#5e36cc] text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
      >
        Get Started Now
      </Link>
    </section>
  );
}
