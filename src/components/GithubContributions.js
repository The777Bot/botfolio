import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #0d1117;
  border: 3px solid #30363d;
  border-radius: 0;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 4px 4px 0 #000;
  font-family: 'Press Start 2P', cursive;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

const Title = styled.h2`
  color: #c9d1d9;
  margin-bottom: 20px;
  font-size: 1rem;
  text-align: center;
  text-shadow: 2px 2px 0 #000;
  border-bottom: 3px solid #30363d;
  padding-bottom: 10px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #30363d 0%, #58a6ff 50%, #30363d 100%);
  }
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 2px;
  margin: 0 auto;
  max-width: 100%;
  overflow-x: auto;
  padding: 10px;
  background: #161b22;
  border: 2px solid #30363d;
  border-radius: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

const Day = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${props => {
    // GitHub's contribution colors
    switch(props.color) {
      case '#ebedf0': return '#161b22'; // No contributions
      case '#9be9a8': return '#0e4429'; // 1-3 contributions
      case '#40c463': return '#006d32'; // 4-6 contributions
      case '#30a14e': return '#26a641'; // 7-9 contributions
      case '#216e39': return '#39d353'; // 10+ contributions
      default: return '#161b22';
    }
  }};
  border-radius: 0;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.5);
    z-index: 1;
    box-shadow: 0 0 10px ${props => {
      switch(props.color) {
        case '#ebedf0': return '#161b22';
        case '#9be9a8': return '#0e4429';
        case '#40c463': return '#006d32';
        case '#30a14e': return '#26a641';
        case '#216e39': return '#39d353';
        default: return '#161b22';
      }
    }};
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #8b949e;
  margin-top: 20px;
  font-size: 0.7rem;
  text-shadow: 2px 2px 0 #000;
  padding: 10px;
  background: #161b22;
  border: 2px solid #30363d;
  border-radius: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

const LoadingText = styled.div`
  color: #58a6ff;
  text-align: center;
  font-size: 0.8rem;
  text-shadow: 2px 2px 0 #000;
  animation: blink 1s infinite;
  padding: 20px;
  background: #161b22;
  border: 2px solid #30363d;
  border-radius: 0;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ErrorText = styled.div`
  color: #f85149;
  text-align: center;
  font-size: 0.8rem;
  text-shadow: 2px 2px 0 #000;
  padding: 20px;
  background: #161b22;
  border: 2px solid #30363d;
  border-radius: 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: repeating-linear-gradient(
      -45deg,
      rgba(248, 81, 73, 0.1),
      rgba(248, 81, 73, 0.1) 1px,
      transparent 1px,
      transparent 2px
    );
    pointer-events: none;
  }
`;

const GithubContributions = () => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        if (!process.env.REACT_APP_GITHUB_TOKEN) {
          throw new Error('GitHub token not found. Please check your .env file.');
        }

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                user(login: "The777Bot") {
                  contributionsCollection {
                    contributionCalendar {
                      totalContributions
                      weeks {
                        contributionDays {
                          date
                          contributionCount
                          color
                        }
                      }
                    }
                  }
                }
              }
            `
          })
        });

        const data = await response.json();
        
        // Debug log
        console.log('GitHub API Response:', data);
        
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        if (!data.data || !data.data.user) {
          throw new Error('User data not found. Please check the GitHub username.');
        }

        const contributionDays = data.data.user.contributionsCollection.contributionCalendar.weeks
          .flatMap(week => week.contributionDays || []);

        setContributions({
          totalContributions: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
          contributionDays
        });
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  if (loading) {
    return (
      <Container>
        <LoadingText>LOADING CONTRIBUTIONS...</LoadingText>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorText>ERROR: {error}</ErrorText>
        <div style={{ 
          color: '#4a90e2', 
          fontSize: '0.7rem', 
          marginTop: '10px',
          textAlign: 'center' 
        }}>
          Please check your GitHub token in .env file
        </div>
      </Container>
    );
  }

  if (!contributions || !contributions.contributionDays) {
    return (
      <Container>
        <ErrorText>No contribution data available</ErrorText>
      </Container>
    );
  }

  return (
    <Container>
      <Title>GITHUB CONTRIBUTIONS</Title>
      <Calendar>
        {contributions.contributionDays.map((day, index) => (
          <Day 
            key={index} 
            color={day.color} 
            title={`${day.date}: ${day.contributionCount} contributions`} 
          />
        ))}
      </Calendar>
      <Stats>
        <span>TOTAL: {contributions.totalContributions}</span>
        <span>LAST YEAR</span>
      </Stats>
    </Container>
  );
};

export default GithubContributions; 