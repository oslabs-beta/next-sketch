/* eslint-disable @typescript-eslint/no-explicit-any */
import Prism from 'prismjs';
import { Box, Typography } from '@mui/material';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css'; //okadia theme
import 'prismjs/components/prism-jsx.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/match-braces/prism-match-braces.min';
import 'prismjs/plugins/match-braces/prism-match-braces.css';
import { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { Tag } from '../../utils/interfaces';

declare const prettier: any;
declare const prettierPlugins: any;
const CodePreview = () => {
  const { tags, reset, setReset, componentName, codeSnippet, setCodeSnippet } =
    useContext(AppContext);

  useEffect(() => {
    console.log('inside codepreview useefffect');
    if (reset === true) {
      setReset(false);
      return;
    }
    // Generate the code snippet
    renderCode(componentName);

    Prism.highlightAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentName, tags]); // Re-render and update the code when componentName and tags change

  const addingChildrenTags = (elements: Tag[]): Tag[] => {
    //check if the container property is true
    //add a property of children
    const tagsCopy = structuredClone(elements);
    const tagsDirectory = {};
    //create a dictinary of tags for easy lookup based on id
    tagsCopy.forEach((tag) => {
      tagsDirectory[tag.id] = tag;
      console.log('DIRECTORY', tagsDirectory);
      if (tag.container) {
        tag.children = [];
      }
    });
    //map through the tags to see if they have a parent
    tagsCopy.map((tag) => {
      if (tag.parent) {
        const parentId = tag.parent;
        if (typeof parentId === 'number') {
          const parentTag = tagsDirectory[parentId];
          if (parentTag) {
            parentTag.children.push(tag);
          }
        }
      }
    });
    const rootNodes = tagsCopy.filter((tag) => !tag.parent);
    console.log(rootNodes);
    return rootNodes;
  };
  const childrenTags = addingChildrenTags(tags);

  const generateCode = (elements: Tag[]): string => {
    const renderElements = elements.map((element) => {
      if (element.name === 'unordered list') element.name = 'ul';
      if (element.name === 'ordered list') element.name = 'ol';
      if (element.name === 'list item') element.name = 'li';
      let tagStart = `<${element.name}`;
      let tagEnd = `</${element.name}>`;
      if (element.attribute) {
        tagStart += ` ${element.attribute}`;
      }
      if (element.name === 'img' || element.name === 'link') {
        tagStart += ' />';
        tagEnd = '';
      } else {
        tagStart += '>';
      }
      if (element.children) {
        const children = element.children;
        const result = children.map((child) => generateCode([child]));
        return `${tagStart}${result.join('')}${tagEnd}`;
      } else {
        return `${tagStart}${tagEnd}`;
      }
    });
    return renderElements.join('');
  };
  const additional = generateCode(childrenTags);

  const formatCode = (code: string) => {
    return prettier.format(code, {
      parser: 'babel',
      plugins: prettierPlugins,
      jsxBracketSameLine: true,
      singleQuote: true,
    });
  };
  function renderCode(name: string) {
    if (name === undefined) return;
    //Check if it has end .tsx
    if (name.slice(-4) === '.tsx') {
      name = name.slice(0, -4);
    }
    // Capitalize the component name
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let codeSnippet = '';
    if (name === 'NotFound') {
      codeSnippet = `
  import React from 'react';
  const ${name} = () => {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        ${additional}
      </div>
    );
  };
  export default ${name};
  `;
    } else {
      codeSnippet = `import React from 'react';
  const ${name} = () => {
    return (
      <>
        ${additional}
      </>
    );
  };
export default ${name};
  `;
    }
    setCodeSnippet(formatCode(codeSnippet));
  }
  return (
    <>
      <Box
        sx={{
          borderRadius: '20px',
          boxShadow: '-1px 1px 18px 0px rgba(0,0,0,0.75)',
          paddingLeft: 2,
          paddingRight: 2,
          bgcolor: 'rgba(229, 63, 115)',
          height: '100%',
        }}
      >
        <Typography
          variant='h6'
          style={{
            color: 'white',
            fontSize: '1.8rem',
            paddingTop: '1.5%',
            paddingLeft: '1%',
          }}
        >
          Code Preview
        </Typography>
        <Box
          sx={{
            // border: 2,
            // borderColor: 'darkred'
            height: '90%',
            overflow: 'auto',
            scrollbarWidth: 'none', // Hide the scrollbar for firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
            },
            '&-ms-overflow-style:': {
              display: 'none', // Hide the scrollbar for IE
            },
            fontSize: '20px',
            '@media (min-width: 2000px)': {
              /* CSS styles to apply when the screen is larger than 2000px */
              fontSize: '30px',
            },
          }}
        >
          <pre className='line-numbers' style={{ height: '90%' }}>
            <code className='language-jsx match-braces'>{codeSnippet}</code>
          </pre>
        </Box>
      </Box>
    </>
  );
};
export default CodePreview;
