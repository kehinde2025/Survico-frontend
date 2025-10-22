import { useState } from 'react';

export default function Step2Location({ nextStep, prevStep, data, updateForm }) {
  const [local, setLocal] = useState({
    country: data.country || '',
    state: data.state || '',
    city: data.city || '',
    zip: data.zip || '',
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
        name="country"
        value={local.country}
        onChange={handleChange}
        placeholder="Country"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        name="state"
        value={local.state}
        onChange={handleChange}
        placeholder="State"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        name="city"
        value={local.city}
        onChange={handleChange}
        placeholder="City"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="text"
        name="zip"
        value={local.zip}
        onChange={handleChange}
        placeholder="Postal Code"
        className="w-full px-4 py-2 border rounded"
      />

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
