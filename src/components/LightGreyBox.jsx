import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import './LightGreyBox.css';

const Container = styled.div`
  background: #0d1117;
  border: 2px solid #30363d;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  font-family: 'Press Start 2P', cursive;
  height: 40vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  color: #c9d1d9;
  margin-bottom: 20px;
  font-size: 1rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(201, 209, 217, 0.5);
  border-bottom: 2px solid #30363d;
  padding-bottom: 10px;
`;

const RepoContainer = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 4px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.02);
    background: #1c2128;
    border-color: #8b949e;
  }
`;

const RepoName = styled.a`
  color: #58a6ff;
  text-decoration: none;
  font-size: 0.8rem;
  display: block;
  margin-bottom: 5px;
  
  &:hover {
    color: #79c0ff;
    text-shadow: 0 0 10px rgba(88, 166, 255, 0.5);
  }
`;

const RepoDescription = styled.div`
  color: #8b949e;
  font-size: 0.6rem;
  line-height: 1.4;
`;

const LoadingText = styled.div`
  color: #58a6ff;
  text-align: center;
  font-size: 0.8rem;
  text-shadow: 0 0 10px rgba(88, 166, 255, 0.5);
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

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

  return (
    <Container>
      <Title>GITHUB PROJECTS</Title>
      {loading ? (
        <LoadingText>LOADING PROJECTS...</LoadingText>
      ) : (
        <div>
          {repos.map(repo => (
            <RepoContainer key={repo.id}>
              <RepoName 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </RepoName>
              <RepoDescription>
                {repo.description || 'No description available'}
              </RepoDescription>
            </RepoContainer>
          ))}
        </div>
      )}
    </Container>
  );
};

export default LightGreyBox;
