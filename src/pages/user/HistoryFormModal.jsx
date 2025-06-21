import React, { useState } from 'react';

export default function HistoryFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    chronicIllnesses: "",
    medications: "",
    allergies: "",
    surgeries: "",
    familyHistory: "",
    lifestyle: "",
  });
  const [biometricMessage, setBiometricMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitted history:", formData);
    onClose();
  };

  const handleBiometricSave = async () => {
    try {
      const challenge = Uint8Array.from("biometric-challenge", c => c.charCodeAt(0));

      const publicKey = {
        challenge,
        rp: { name: "Health Record App" },
        user: {
          id: Uint8Array.from("1234567890", c => c.charCodeAt(0)), // use actual user ID in production
          name: "user@example.com",
          displayName: "User Example",
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "preferred",
        },
        timeout: 60000,
        attestation: "none",
      };

      const credential = await navigator.credentials.create({ publicKey });
      console.log("Biometric credential registered:", credential);

      setBiometricMessage("✅ Biometric credential saved. Medical history submitted.");
      handleSubmit();
    } catch (error) {
      console.error("Biometric registration failed:", error);
      setBiometricMessage("❌ Biometric setup failed or was cancelled.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-blue-700">Add Medical History</h2>

        <div className="space-y-3">
          <textarea name="chronicIllnesses" placeholder="Chronic Illnesses" className="w-full border p-2 rounded" onChange={handleChange} />
          <textarea name="medications" placeholder="Current Medications" className="w-full border p-2 rounded" onChange={handleChange} />
          <textarea name="allergies" placeholder="Allergies" className="w-full border p-2 rounded" onChange={handleChange} />
          <textarea name="surgeries" placeholder="Past Surgeries" className="w-full border p-2 rounded" onChange={handleChange} />
          <textarea name="familyHistory" placeholder="Family History (e.g., diabetes, cancer)" className="w-full border p-2 rounded" onChange={handleChange} />
          <textarea name="lifestyle" placeholder="Lifestyle Notes (smoking, alcohol, etc.)" className="w-full border p-2 rounded" onChange={handleChange} />
        </div>

        {biometricMessage && (
          <div className="mt-3 text-sm text-blue-700 font-medium">{biometricMessage}</div>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
          <button onClick={handleBiometricSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Save with Biometrics
          </button>
        </div>
      </div>
    </div>
  );
}
