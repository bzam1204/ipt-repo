import { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/message')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Falha ao buscar dados:', err));
  }, []);

  return (
    <div>
      <h1>Monorepo com Vite + React + Express</h1>
      <p>Mensagem do Backend: <strong>{message}</strong></p>
    </div>
  );
}

export default App;
