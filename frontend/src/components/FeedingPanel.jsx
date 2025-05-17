import { useState } from 'react';

function FeedingPanel({ pet, onUpdate }) {
  const [feeding, setFeeding] = useState({ time: '', calories: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(feeding.calories) < 0) {
      alert("Calories must be positive");
      return;
    }

    await fetch(`/pets/${pet.id}/feeding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time: feeding.time,
        calories: Number(feeding.calories)
      })
    });

    setFeeding({ time: '', calories: '' });
    onUpdate();
  };

  const handleDelete = async (fid) => {
    await fetch(`/pets/${pet.id}/feeding/${fid}`, {
      method: 'DELETE'
    });
    onUpdate();
  };

  const handleEdit = async (f) => {
    const newTime = prompt('New time (HH:MM):', f.time);
    const newCalories = prompt('New calories:', f.calories);

    if (newTime && newCalories !== null) {
      await fetch(`/pets/${pet.id}/feeding/${f.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          time: newTime,
          calories: Number(newCalories)
        })
      });
      onUpdate();
    }
  };

  const totalCalories = pet.feedings.reduce((sum, f) => sum + f.calories, 0);
  const plan = pet.planCalories;
  const percentage = plan > 0 ? Math.min(100, Math.round((totalCalories / plan) * 100)) : 0;

  let status = '';
  let color = '';

  if (plan > 0) {
    if (totalCalories < plan) {
      status = `Remaining: ${plan - totalCalories} kcal`;
      color = 'green';
    } else if (totalCalories === plan) {
      status = `Plan completed`;
      color = 'blue';
    } else {
      status = `Exceeded by ${totalCalories - plan} kcal`;
      color = 'red';
    }
  } else {
    status = 'No plan set';
    color = 'gray';
  }

  return (
    <div>
      <p style={{ color }}>{status}</p>
      {plan > 0 && (
        <p style={{ fontSize: '14px', color: '#555' }}>
          Progress: {percentage}%
        </p>
      )}

      <h4>Feedings</h4>
      <ul>
        {pet.feedings.map(f => (
          <li key={f.id}>
            🦴 {f.time}, {f.calories} kcal
            <button onClick={() => handleEdit(f)}>✏️</button>
            <button onClick={() => handleDelete(f.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="time"
          name="time"
          value={feeding.time}
          onChange={e => setFeeding({ ...feeding, time: e.target.value })}
          required
        />
        <input
          type="number"
          name="calories"
          placeholder="Calories"
          min="0"
          value={feeding.calories}
          onChange={e => setFeeding({ ...feeding, calories: e.target.value })}
          required
        />
        <button type="submit">Add feeding</button>
      </form>
    </div>
  );
}

export default FeedingPanel;
