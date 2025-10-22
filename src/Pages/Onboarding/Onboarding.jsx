import React, { useState } from 'react';
import Step1Personal from './Step1personal';
import Step2Location from './Step2Location';
import Step3Employment from './Step3Employment';
import Step4Interests from './Step4Interests';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    jobTitle: '',
    education: '',
    income: '',
    interests: [],
    device: '',
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const updateForm = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const steps = {
    1: <Step1Personal nextStep={nextStep} data={formData} updateForm={updateForm} />,
    2: <Step2Location nextStep={nextStep} prevStep={prevStep} data={formData} updateForm={updateForm} />,
    3: <Step3Employment nextStep={nextStep} prevStep={prevStep} data={formData} updateForm={updateForm} />,
    4: <Step4Interests prevStep={prevStep} data={formData} updateForm={updateForm} />,
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl space-y-6">
        <h2 className="text-xl font-bold text-center text-blue-700">
          📋 Profile Setup ({step}/4)
        </h2>
        {steps[step]}
      </div>
    </div>
  );
}
