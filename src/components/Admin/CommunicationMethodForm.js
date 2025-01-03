import React, { useState, useEffect } from "react";
import {
  addCommunicationMethod,
  updateCommunicationMethod,
} from "../services/api";

const CommunicationMethodForm = ({ onClose, fetchMethods, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    mandatory: false,
    sequence: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const methodData = {
      name: formData.name,
      mandatory: formData.mandatory,
      sequence: formData.sequence,
    };

    if (initialData) {
      await updateCommunicationMethod(initialData.id, methodData);
    } else {
      await addCommunicationMethod(methodData);
    }

    fetchMethods();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {initialData ? "Edit Communication Method" : "Add Communication Method"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Method Name Input */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Method Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter method name"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Sequence Input */}
            <div>
              <label htmlFor="sequence" className="block text-gray-700 font-medium mb-2">
                Sequence
              </label>
              <input
                type="number"
                id="sequence"
                name="sequence"
                value={formData.sequence}
                onChange={handleChange}
                placeholder="Enter sequence"
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Mandatory Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mandatory"
                name="mandatory"
                checked={formData.mandatory}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="mandatory" className="ml-2 text-gray-700">
                Mandatory
              </label>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunicationMethodForm;
