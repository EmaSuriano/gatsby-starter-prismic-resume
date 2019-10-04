require('dotenv').config({
  path: `.env`,
});

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'emasuriano-cv',
        accessToken: process.env.API_KEY,
      },
    },
  ],
  siteMetadata: {
    title: 'Gatsby Theme Jam Example Submission',
    cvFormat: !!process.env.CV_FORMAT,
  },
};
