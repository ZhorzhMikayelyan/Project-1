import { useState } from 'react';
import PetInfoCard from './PetInfoCard';
import FeedingPanel from './FeedingPanel';

function PetCard({ pet, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: pet.name,
    gender: pet.gender,
    breed: pet.breed,
    age: pet.age,
    planCalories: pet.planCalories
  });

  const handleUpdate = async () => {
    await fetch(`/pets/${pet.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        age: Number(form.age),
        planCalories: Number(form.planCalories)
      })
    });
    setEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(`Delete ${pet.name}?`);
    if (!confirmDelete) return;

    await fetch(`/pets/${pet.id}`, { method: 'DELETE' });
    onUpdate();
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '16px',
      marginBottom: '24px',
      borderRadius: '8px',
      background: '#fff'
    }}>
      <div style={{
        borderBottom: '1px solid #ddd',
        paddingBottom: '12px',
        marginBottom: '16px'
      }}>
        <PetInfoCard
          pet={pet}
          editing={editing}
          form={form}
          setForm={setForm}
          onEdit={() => setEditing(true)}
          onSave={handleUpdate}
          onCancel={() => setEditing(false)}
          onDelete={handleDelete}
        />
      </div>
  
      <div style={{
        background: '#f9f9f9',
        padding: '12px',
        borderRadius: '6px'
      }}>
        <FeedingPanel pet={pet} onUpdate={onUpdate} />
      </div>
    </div>
  
  );
}

export default PetCard;
