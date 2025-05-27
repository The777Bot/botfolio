import React, { useEffect, useState } from 'react';
import './LightGreyBox.css';

const LightGreyBox = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/The777Bot/repos');
        const data = await response.json();
        const filtered = data.filter(repo => !repo.fork && !repo.archived);
        setRepos(filtered);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const titleStyle = {
    fontSize: '14px',
    marginBottom: '15px',
    borderBottom: '2px solidrgb(83, 87, 69)',
    paddingBottom: '5px',
  };

  const repoStyle = {
    fontSize: '10px',
    marginBottom: '8px',
    padding: '5px',
    backgroundColor: 'rgba(61, 192, 9, 0.1)',
    borderRadius: '4px',
  };

  return (
    <div className="light-grey-box">
      <div style={titleStyle}>GitHub Projects</div>
      {loading ? (
        <div style={{ fontSize: '10px' }}>Loading projects...</div>
      ) : (
        <div>
          {repos.map(repo => (
            <div key={repo.id} style={repoStyle}>
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#a6ab90', textDecoration: 'none' }}
              >
                {repo.name}
              </a>
              <div style={{ fontSize: '8px', color: '#8bac0f', marginTop: '3px' }}>
                {repo.description || 'No description available'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LightGreyBox;
