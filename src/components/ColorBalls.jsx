import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
`;

const Ball = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  border: 3px solid ${props => props.color};
  background: transparent;
  box-shadow: 0 0 15px ${props => props.color};
  pointer-events: none;
  opacity: 0.9;
  transition: transform 0.1s linear;
`;

const ColorBalls = () => {
  const [balls, setBalls] = useState([]);
  const animationFrameRef = useRef();
  const lastTimeRef = useRef(Date.now());

  const colors = [
    '#E74C3C', // Darker Red
    '#2980B9', // Darker Blue
    '#27AE60', // Darker Green
    '#8E44AD', // Darker Purple
    '#D35400', // Darker Orange
    '#16A085', // Darker Teal
    '#C0392B', // Darker Crimson
    '#2C3E50', // Darker Navy
    '#7D3C98', // Darker Violet
    '#1A5276', // Darker Royal Blue
    '#ffda05', // yellow
  ];

  const GRAVITY = 0.7;
  const FRICTION = 0.8;
  const BOUNCE = 0.7;
  const FOOTER_HEIGHT = 45; // Height of the footer area

  const addBalls = () => {
    const newBalls = Array.from({ length: 8 }, () => {
      const size = Math.random() * 30 + 20; // Random size between 20-50px
      const color = colors[Math.floor(Math.random() * colors.length)];
      const x = Math.random() * (window.innerWidth - size);
      
      return {
        id: Date.now() + Math.random(),
        x,
        y: -size,
        size,
        color,
        velocityY: 0,
        velocityX: (Math.random() - 0.5) * 2, // Random horizontal velocity
        createdAt: Date.now()
      };
    });

    setBalls(prev => [...prev, ...newBalls]);
  };

  const updateBalls = () => {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTimeRef.current) / 16; // Normalize to ~60fps
    lastTimeRef.current = currentTime;

    setBalls(prev => {
      return prev.map(ball => {
        let newY = ball.y;
        let newX = ball.x;
        let newVelocityY = ball.velocityY;
        let newVelocityX = ball.velocityX;

        // Apply gravity
        newVelocityY += GRAVITY * deltaTime;
        
        // Update position
        newY += newVelocityY;
        newX += newVelocityX;

        // Floor collision
        const floorY = window.innerHeight - ball.size - FOOTER_HEIGHT;
        if (newY > floorY) {
          newY = floorY;
          newVelocityY = -newVelocityY * BOUNCE;
          newVelocityX *= FRICTION;
        }

        // Wall collisions
        if (newX < 0) {
          newX = 0;
          newVelocityX = -newVelocityX * FRICTION;
        } else if (newX > window.innerWidth - ball.size) {
          newX = window.innerWidth - ball.size;
          newVelocityX = -newVelocityX * FRICTION;
        }

        // Stop the ball if it's moving very slowly
        if (Math.abs(newVelocityY) < 0.1 && newY >= floorY) {
          newVelocityY = 0;
        }
        if (Math.abs(newVelocityX) < 0.1) {
          newVelocityX = 0;
        }

        return {
          ...ball,
          y: newY,
          x: newX,
          velocityY: newVelocityY,
          velocityX: newVelocityX
        };
      }).filter(ball => Date.now() - ball.createdAt < 10000); // Remove balls after 10 seconds
    });

    animationFrameRef.current = requestAnimationFrame(updateBalls);
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.id === 'color-ball-trigger') {
        addBalls();
      }
    };

    window.addEventListener('click', handleClick);
    animationFrameRef.current = requestAnimationFrame(updateBalls);

    return () => {
      window.removeEventListener('click', handleClick);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <Container>
      {balls.map(ball => (
        <Ball
          key={ball.id}
          style={{
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            transform: `rotate(${ball.velocityX * 2}deg)`,
          }}
          size={ball.size}
          color={ball.color}
        />
      ))}
    </Container>
  );
};

export default ColorBalls; 