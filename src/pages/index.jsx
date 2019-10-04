import { css } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import { Parser } from 'html-to-react';
import React from 'react';
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

const htmlToReactParser = new Parser();

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

const Main = () => {
  const { prismicMain, site } = useStaticQuery(graphql`
    query {
      prismicMain {
        data {
          name {
            text
            html
          }
          description {
            text
            html
          }
          body {
            ... on PrismicMainBodySection {
              slice_type
              primary {
                title {
                  text
                  html
                }
              }
              items {
                content {
                  text
                  html
                }
              }
            }
            ... on PrismicMainBodySkills {
              slice_type
              primary {
                title {
                  text
                  html
                }
              }
              items {
                content {
                  text
                  html
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
  `);

  const { name, description, body } = prismicMain.data;
  const { cvFormat } = site.siteMetadata;

  const sections = body.map(section => {
    const { primary, items, slice_type: type } = section;

    return {
      type,
      title: primary.title.text,
      content: items.map(item => htmlToReactParser.parse(item.content.html)),
    };
  });
  return (
    <MainTemplate
      name={name.text}
      description={htmlToReactParser.parse(description.html)}
      sections={sections}
      showMenu={!cvFormat}
    />
  );
};

// export default props => {
//   const { data } = props;
//   const content = data.prismicMain.data;
//   const name = content.name.text;
//   const description = content.description.html;

//   const sections = content.body.map(section => {
//     const title = section.primary.title.text;
//     const items = section.items.map(item =>
//       htmlToReactParser.parse(item.content.html),
//     );

//     if (section.slice_type === 'section') {
//       return (
//         <div className="section">
//           <h2>{title}</h2>
//           <div>{items}</div>
//         </div>
//       );
//     }
//     if (section.slice_type === 'skills') {
//       return (
//         <div className="skills">
//           <h2>{title}</h2>
//           <div>{items}</div>
//         </div>
//       );
//     }
//   });

//   return (
//     <Layout>
//       <div css={container}>
//         <Header name={name} />
//         {htmlToReactParser.parse(description)}
//         {sections}
//       </div>
//     </Layout>
//   );
// };

export default Main;
