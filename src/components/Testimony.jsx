// src/components/Testimonials.jsx
export default function Testimonials() {
  return (
    <section className="bg-[#140932] py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-white mb-6">What Users Are Saying</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          { name: 'Chinedu', text: 'Survico helped me earn $20 in just 3 days. Easy and fast!' },
          { name: 'Aisha', text: 'I love the referral program. I just invite and earn daily.' },
          { name: 'James', text: 'The surveys are simple and the tasks pay well.' },
        ].map(({ name, text }, idx) => (
          <div key={idx} className="bg-[#3d3358] p-6 rounded shadow">
            <p className="text-gray-300 italic">"{text}"</p>
            <p className="text-sm text-gray-300 font-semibold mt-3">– {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
