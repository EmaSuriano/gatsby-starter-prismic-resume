const { registerLinkResolver } = require('gatsby-source-prismic-graphql');

const linkResolver = () => {
  return '/';
};

registerLinkResolver(linkResolver);
