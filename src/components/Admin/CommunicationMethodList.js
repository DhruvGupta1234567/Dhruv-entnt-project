import React, { useEffect, useState } from 'react';
import {
  getCommunicationMethods,
  deleteCommunicationMethod,
} from '../services/api';
import CommunicationMethodForm from './CommunicationMethodForm';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const CommunicationMethodList = () => {
  const [methods, setMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMethods();
  }, []);

  const fetchMethods = async () => {
    const { data } = await getCommunicationMethods();
    setMethods(data);
  };

  const handleDelete = async (id) => {
    console.log(id);
    await deleteCommunicationMethod(id);
    fetchMethods();
  };

  const handleEdit = (method) => {
    setSelectedMethod(method);
    setShowForm(true); // This will trigger the form to open in edit mode
  };

  console.log(methods);
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Communication Method Management</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => setShowForm(true)}
      >
        Add Communication Method
      </button>

      <table className="min-w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border p-2">Method</th>
            <th className="border p-2">Mandatory</th>
            <th className="border p-2">Sequence</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
{methods.map((method) => (
  <tr key={method.id}>
    <td className="border p-2">{method.name}</td>
    <td className="border p-2">{method.mandatory ? 'Yes' : 'No'}</td>
    <td className="border p-2">{method.sequence}</td>
    <td className="border p-2">
      <button onClick={() => handleEdit(method)}>
        <AiFillEdit className="text-blue-500 inline-block mx-1" />
      </button>
      <button onClick={() => handleDelete(method.id)}>
        <AiFillDelete className="text-red-500 inline-block mx-1" />
      </button>
    </td>
  </tr>
))}
        </tbody>
      </table>

      {showForm && (
        <CommunicationMethodForm
          onClose={() => {
            setShowForm(false);
            setSelectedMethod(null);
          }}
          fetchMethods={fetchMethods}
          initialData={selectedMethod}
        />
      )}
    </div>
  );
};

export default CommunicationMethodList;
