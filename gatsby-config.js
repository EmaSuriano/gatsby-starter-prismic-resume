const theme = require('./src/theme.json');

require('dotenv').config({
  path: `.env`,
});

const manifestConfig = {
  name: 'Resume CV',
  short_name: 'Resume CV',
  start_url: '/',
  background_color: theme.background,
  theme_color: theme.accent,
  display: 'standalone',
};

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',

    {
      resolve: 'gatsby-plugin-manifest',
      options: manifestConfig,
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: 'emasuriano-cv',
        accessToken: process.env.API_KEY,
        path: '/preview',
        previews: true,
      },
    },
  ],
  siteMetadata: {
    title: 'Gatsby Theme Jam Example Submission',
    cvFormat: !!process.env.CV_FORMAT,
  },
};
