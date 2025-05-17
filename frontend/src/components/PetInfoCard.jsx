function PetInfoCard({ pet, editing, form, setForm, onEdit, onSave, onCancel, onDelete }) {
    return (
      <div style={{ marginBottom: '12px' }}>
        {editing ? (
          <>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
            />
            <select
              value={form.gender}
              onChange={e => setForm({ ...form, gender: e.target.value })}
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
            <input
              value={form.breed}
              onChange={e => setForm({ ...form, breed: e.target.value })}
              placeholder="Breed"
            />
            <input
              type="number"
              value={form.age}
              onChange={e => setForm({ ...form, age: e.target.value })}
              placeholder="Age"
            />
            <input
              type="number"
              value={form.planCalories}
              onChange={e => setForm({ ...form, planCalories: e.target.value })}
              placeholder="Plan kcal"
            />
            <button onClick={onSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
          </>
        ) : (
          <>
            <h3>{pet.name}</h3>
            <p>
              Gender: {pet.gender}<br />
              Breed: {pet.breed}<br />
              Age: {pet.age} years
            </p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    );
  }
  
  export default PetInfoCard;
  