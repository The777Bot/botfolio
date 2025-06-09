import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #4a90e2;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.3);
  font-family: 'Press Start 2P', cursive;
`;

const Title = styled.h2`
  color: #4a90e2;
  margin-bottom: 20px;
  font-size: 1rem;
  text-align: center;
  text-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(53, 1fr);
  gap: 2px;
  margin: 0 auto;
  max-width: 100%;
  overflow-x: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

const Day = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${props => props.color};
  border-radius: 2px;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.5);
    z-index: 1;
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #4a90e2;
  margin-top: 20px;
  font-size: 0.7rem;
  text-shadow: 0 0 5px rgba(74, 144, 226, 0.3);
`;

const LoadingText = styled.div`
  color: #4a90e2;
  text-align: center;
  font-size: 0.8rem;
  text-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const ErrorText = styled.div`
  color: #ff4444;
  text-align: center;
  font-size: 0.8rem;
  text-shadow: 0 0 10px rgba(255, 68, 68, 0.5);
`;

const GithubContributions = () => {
  const [contributions, setContributions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
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
        
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const contributionDays = data.data.user.contributionsCollection.contributionCalendar.weeks
          .flatMap(week => week.contributionDays);

        setContributions({
          totalContributions: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
          contributionDays
        });
      } catch (err) {
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
      </Container>
    );
  }

  if (!contributions) {
    return null;
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