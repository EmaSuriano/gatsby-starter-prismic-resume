require('dotenv').config({
  path: `.env`,
});

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-emotion',
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
