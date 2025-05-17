import { useEffect, useState } from 'react';
import PetCard from './components/PetCard';
import PetForm from './components/PetForm';

function App() {
  const [pets, setPets] = useState([]);

  const fetchPets = () => {
    fetch('/pets')
      .then(res => res.json())
      .then(setPets)
      .catch(console.error);
  };

  useEffect(fetchPets, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pet List</h1>
      <PetForm onAdd={fetchPets} />
  
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingTop: '16px'
      }}>
        {pets.map(p => (
          <PetCard key={p.id} pet={p} onUpdate={fetchPets} />
        ))}
      </div>
    </div>
  );
  
}

export default App;
