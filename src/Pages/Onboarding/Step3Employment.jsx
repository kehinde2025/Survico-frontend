import { useState } from 'react';

export default function Step3Employment({ nextStep, prevStep, data, updateForm }) {
  const [local, setLocal] = useState({
    jobTitle: data.jobTitle || '',
    education: data.education || '',
    income: data.income || '',
  });

  const handleChange = (e) => {
    setLocal({ ...local, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    updateForm(local);
    nextStep();
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        name="jobTitle"
        value={local.jobTitle}
        onChange={handleChange}
        placeholder="Your Job Title"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <select
        name="education"
        value={local.education}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Highest Education Level</option>
        <option>Primary</option>
        <option>Secondary</option>
        <option>Diploma</option>
        <option>Undergraduate</option>
        <option>Postgraduate</option>
      </select>

      <select
        name="income"
        value={local.income}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Monthly Income (USD)</option>
        <option value="0-100">$0 – $100</option>
        <option value="100-500">$100 – $500</option>
        <option value="500-1000">$500 – $1,000</option>
        <option value="1000+">$1,000+</option>
      </select>

      <div className="flex justify-between pt-2">
        <button
          onClick={prevStep}
          className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
