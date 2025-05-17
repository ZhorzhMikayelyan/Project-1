import { useState } from 'react';

function PetForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    breed: '',
    age: '',
    planCalories: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const onlyLetters = /^[a-zA-Zа-яА-ЯёЁ]+$/;
    if (!onlyLetters.test(form.name) || !onlyLetters.test(form.gender) || !onlyLetters.test(form.breed)) {
      alert('Name, gender, and breed must contain only letters');
      return;
    }

    const newPet = {
      ...form,
      age: Number(form.age),
      planCalories: Number(form.planCalories) || 0
    };

    await fetch('/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPet)
    });

    onAdd();
    setForm({ name: '', gender: '', breed: '', age: '', planCalories: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '24px' }}>
      <h2>Add Pet</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <select
        name="gender"
        value={form.gender}
        onChange={handleChange}
        required
      >
        <option value="">Gender</option>
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
      <input
        name="breed"
        placeholder="Breed"
        value={form.breed}
        onChange={handleChange}
        required
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
      />
      <input
        name="planCalories"
        type="number"
        placeholder="Daily Calorie Plan"
        value={form.planCalories}
        onChange={handleChange}
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default PetForm;
