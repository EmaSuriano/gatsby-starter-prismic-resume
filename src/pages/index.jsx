import { css } from '@emotion/core';
import { graphql } from 'gatsby';
import React from 'react';
import { RichText } from 'prismic-reactjs';
import Layout from '../components/Layout';
import Header from '../components/Header';

const container = css`
  max-width: 500px;
  color: #333333;
  margin: auto;
  margin-top: 50px;

  h1 {
    font-size: 30px;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 12px;
    font-weight: 600;
    color: #c9cccf;
    text-transform: uppercase;
    letter-spacing: 1.2px;
  }

  p {
    margin-bottom: 0.25rem;
  }

  a {
    transition: box-shadow 160ms ease 0s;
    box-shadow: rgb(238, 251, 255) 0px -9px 0px inset;
    border-bottom: 2px solid rgb(207, 243, 255);
    text-decoration: none;
    color: #323336;
    &:hover {
      box-shadow: rgb(207, 243, 255) 0px -1.2em 0px inset;
    }
  }

  .section,
  .skills {
    margin-top: 4rem;
  }

  .section ul {
    margin-top: 0.5rem;
    margin-left: 2.5rem;
    list-style: disc;
  }

  .section li {
    margin-bottom: 0.5rem;
  }

  .headline {
    display: block;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 1.2px;
    padding-top: 2rem;
    padding-bottom: 0.5rem;
  }

  .skills ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .skills li {
    margin-bottom: 1rem;
    margin-right: 0.5rem;
    padding: 0.25rem 1rem;
    background-color: #f1f5f7;
    white-space: nowrap;
  }
`;

const Section = ({ type, title, content }) => (
  <div className={type}>
    <h2>{title}</h2>
    <div>{content}</div>
  </div>
);

const MainTemplate = ({ name, description, sections = [], showMenu }) => (
  <Layout>
    <div css={container}>
      <Header name={name} showMenu={showMenu} />
      {description}
      {sections.map(asd => (
        <Section {...asd} />
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  {
    prismic {
      allMains {
        edges {
          node {
            accent
            name
            description
            body {
              ... on PRISMIC_MainBodySection {
                type
                primary {
                  title
                }
                fields {
                  content
                }
              }
              ... on PRISMIC_MainBodySkills {
                type
                primary {
                  title
                }
                fields {
                  content
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        cvFormat
      }
    }
  }
`;

const Main = ({ data }) => {
  const main = data.prismic.allMains.edges.slice(0, 1).pop();
  if (!main) return null;

  const { name, description, body } = main.node;

  const sections = body.map(section => {
    const { primary, fields, type } = section;

    return {
      type,
      title: RichText.render(primary.title),
      content: fields.map(({ content }) => RichText.render(content)),
    };
  });

  return (
    <MainTemplate
      name={RichText.render(name)}
      description={RichText.render(description)}
      sections={sections}
      showMenu={!data.site.siteMetadata.cvFormat}
    />
  );
};

export default Main;
