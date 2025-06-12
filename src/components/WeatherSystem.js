import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WeatherSystem = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to determine season
  const getSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  // Function to determine time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 20) return 'evening';
    return 'night';
  };

  // Function to determine weather based on season and time
  const determineWeather = () => {
    const season = getSeason();
    const timeOfDay = getTimeOfDay();
    
    // Weather probabilities based on season and time
    const weatherOptions = {
      spring: {
        morning: ['rain', 'cloudy', 'windy'],
        afternoon: ['sunny', 'rain', 'windy'],
        evening: ['cloudy', 'windy', 'rain'],
        night: ['windy', 'cloudy']
      },
      summer: {
        morning: ['sunny', 'cloudy', 'windy'],
        afternoon: ['sunny', 'windy'],
        evening: ['cloudy', 'windy'],
        night: ['windy', 'cloudy']
      },
      autumn: {
        morning: ['rain', 'cloudy', 'windy'],
        afternoon: ['cloudy', 'rain', 'windy'],
        evening: ['rain', 'cloudy', 'windy'],
        night: ['windy', 'rain']
      },
      winter: {
        morning: ['snow', 'cloudy', 'windy'],
        afternoon: ['snow', 'windy'],
        evening: ['snow', 'cloudy', 'windy'],
        night: ['windy', 'snow']
      }
    };

    const options = weatherOptions[season][timeOfDay];
    return options[Math.floor(Math.random() * options.length)];
  };

  // Update weather periodically
  useEffect(() => {
    const updateWeather = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentWeather(determineWeather());
        setIsTransitioning(false);
      }, 1000); // Transition duration
    };

    // Initial weather
    updateWeather();

    // Update every 30 minutes
    const interval = setInterval(updateWeather, 20 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Weather effect components
  const WeatherEffects = {
    rain: (
      <div className="weather-effect rain">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="raindrop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${0.5 + Math.random() * 0.5}s`
            }}
          />
        ))}
      </div>
    ),
    sunny: (
      <div className="weather-effect sunny">
        <div className="sun" />
        <div className="sun-rays" />
      </div>
    ),
    snow: (
      <div className="weather-effect snow">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    ),
    cloudy: (
      <div className="weather-effect cloudy">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="cloud"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    ),
    windy: (
      <div className="wind-effect">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="wind-particle" style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${2 + Math.random() * 3}s`,
            '--size': `${10 + Math.random() * 20}px`,
            '--opacity': `${0.1 + Math.random() * 0.3}`,
            '--y-offset': `${Math.random() * 100}%`
          }} />
        ))}
      </div>
    ),
    // Add more weather effects here
  };

  return (
    <div className="weather-container">
      {/* Wind effect is always present */}
      <WindEffect intensity={getWindIntensity(currentWeather)} />
      
      {/* Other weather effects */}
      {currentWeather === 'rain' && <RainEffect />}
      {currentWeather === 'snow' && <SnowEffect />}
      {currentWeather === 'sunny' && <SunnyEffect />}
      {currentWeather === 'cloudy' && <CloudyEffect />}
    </div>
  );
};

// Helper function to determine wind intensity
const getWindIntensity = (weather) => {
  const intensities = {
    'rain': 0.8,    // Strong wind with rain
    'snow': 0.6,    // Moderate wind with snow
    'sunny': 0.3,   // Light breeze on sunny days
    'cloudy': 0.5,  // Moderate wind with clouds
    'windy': 1.0    // Maximum wind intensity
  };
  return intensities[weather] || 0.3; // Default to light breeze
};

const WindEffect = ({ intensity }) => {
  // Calculate number of particles based on intensity
  const particleCount = Math.floor(10 + (intensity * 20)); // 10-30 particles
  
  return (
    <div className="wind-effect">
      {[...Array(particleCount)].map((_, i) => (
        <div key={i} className="wind-particle" style={{
          '--delay': `${Math.random() * 5}s`,
          '--duration': `${2 + Math.random() * 3}s`,
          '--size': `${10 + Math.random() * 20}px`,
          '--opacity': `${0.1 + Math.random() * 0.3 * intensity}`,
          '--y-offset': `${Math.random() * 100}%`,
          '--speed': `${1 + intensity * 2}s`
        }} />
      ))}
    </div>
  );
};

const RainEffect = () => {
  return (
    <div className="rain-effect">
      {[...Array(100)].map((_, i) => (
        <div key={i} className="rain-drop" style={{
          '--delay': `${Math.random() * 2}s`,
          '--duration': `${0.5 + Math.random() * 0.5}s`,
          '--x-offset': `${Math.random() * 100}%`
        }} />
      ))}
    </div>
  );
};

const SnowEffect = () => {
  return (
    <div className="snow-effect">
      {[...Array(50)].map((_, i) => (
        <div key={i} className="snowflake" style={{
          '--delay': `${Math.random() * 5}s`,
          '--duration': `${5 + Math.random() * 5}s`,
          '--x-offset': `${Math.random() * 100}%`,
          '--size': `${4 + Math.random() * 4}px`
        }} />
      ))}
    </div>
  );
};

const SunnyEffect = () => {
  return (
    <div className="sunny-effect">
      <div className="sun" />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="sun-ray" style={{
          '--rotation': `${i * 45}deg`
        }} />
      ))}
    </div>
  );
};

const CloudyEffect = () => {
  return (
    <div className="cloudy-effect">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="cloud" style={{
          '--delay': `${Math.random() * 5}s`,
          '--duration': `${20 + Math.random() * 10}s`,
          '--x-offset': `${Math.random() * 100}%`,
          '--y-offset': `${Math.random() * 30}%`,
          '--scale': `${0.8 + Math.random() * 0.4}`
        }} />
      ))}
    </div>
  );
};

export default WeatherSystem; 