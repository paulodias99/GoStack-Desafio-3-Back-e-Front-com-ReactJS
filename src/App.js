import React, { useState, useEffect } from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
            title: `Novo repositorio ${Date.now()}`,
            url: 'www.teste.com',
            techs: ['ReactJS', 'PHP'],
        })

        const repo = response.data;

        setRepositories([...repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo =><li key={repo.id}>{repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          <br />
          </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
    
  );
}

export default App;
