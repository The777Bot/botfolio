const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// GitHub contributions endpoint
app.get('/api/github/contributions', async (req, res) => {
  try {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GitHub token not configured on server');
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
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

    if (!data.data || !data.data.user) {
      throw new Error('User data not found');
    }

    const contributionDays = data.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap(week => week.contributionDays || []);

    res.json({
      totalContributions: data.data.user.contributionsCollection.contributionCalendar.totalContributions,
      contributionDays
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 