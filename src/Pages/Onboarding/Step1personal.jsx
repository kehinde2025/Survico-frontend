import { useState } from 'react';

export default function Step1Personal({ nextStep, data, updateForm }) {
  const [local, setLocal] = useState({
    fullName: data.fullName || '',
    dob: data.dob || '',
    gender: data.gender || '',
    maritalStatus: data.maritalStatus || '',
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
        name="fullName"
        value={local.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded"
        required
      />

      <input
        type="date"
        name="dob"
        value={local.dob}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <select
        name="gender"
        value={local.gender}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>

      <select
        name="maritalStatus"
        value={local.maritalStatus}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded"
        required
      >
        <option value="">Marital Status</option>
        <option>Single</option>
        <option>Married</option>
        <option>Divorced</option>
      </select>

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Next
      </button>
    </div>
  );
}
