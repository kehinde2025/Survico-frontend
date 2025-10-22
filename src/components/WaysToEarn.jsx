// src/components/WaysToEarn.jsx
export default function WaysToEarn() {
  return (
    <section className="py-16 px-6 bg-[#140932] text-center">
      <h2 className="text-3xl font-bold text-white mb-8">Ways to Earn</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto ">
        {[
          { title: 'Surveys', desc: 'Answer questions and get paid instantly.' },
          { title: 'App Installs', desc: 'Download apps and earn rewards.' },
          { title: 'CPA Offers', desc: 'Complete actions like signups or trials.' },
          { title: 'Referrals', desc: 'Invite others and earn when they earn.' },
        ].map(({ title, desc }, idx) => (
          <div key={idx} className="border p-6 rounded shadow hover:shadow-lg transition bg-[#3d3358]">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 text-gray-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
