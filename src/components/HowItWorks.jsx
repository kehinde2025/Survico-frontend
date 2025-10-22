// src/components/HowItWorks.jsx
export default function HowItWorks() {
  return (
    <section className="bg-[#140932] py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-white mb-8">How It Works</h2>
      <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto text-gray-700">
        <div>
          <h3 className="text-xl font-semibold text-white">1. Sign Up</h3>
          <p>Register a free account with your email or phone number.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">2. Take Tasks</h3>
          <p>Complete surveys, install apps, or perform CPA tasks through our platform.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">3. Get Paid</h3>
          <p>Earn real cash into your wallet and withdraw when you're ready.</p>
        </div>
      </div>
    </section>
  );
}
