/* eslint-disable @typescript-eslint/no-explicit-any */

//Import necessary libraries and components
import Prism from 'prismjs';
import { Box, Typography } from '@mui/material';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/match-braces/prism-match-braces.min';
import 'prismjs/plugins/match-braces/prism-match-braces.css';
import { useContext, useEffect } from 'react';
import AppContext from '../../context/AppContext';
import { Tag } from '../../utils/interfaces';

//Type declarations for external dependencies
declare const prettier: any;
declare const prettierPlugins: any;

//Main components for rendering
const CodePreview = () => {
  //Destructure values from the AppContextv(shared states across components)
  const { tags, reset, setReset, componentName, codeSnippet, setCodeSnippet } =
    useContext(AppContext);

  /* 
  This useEffect block serves as a conditional switch triggered by changes in the 'reset' state, 
  which is modified in the folder component. The 'reset' state is used to control whether 
  the component should generate a new code snippet or not. 

  If 'reset' is set to true, it indicates that the user is attempting to retrieve, 
  rather than generate, code for an existing file. In this case, the 'reset' state is 
  immediately set back to false, and the useEffect returns without further code execution.

  If 'reset' is false, the code proceeds to generate the code snippet using the 'renderCode' function
  based on the 'componentName'. Additionally, Prism is used to highlight the syntax of the code.
  */
  useEffect(() => {
    if (reset === true) {
      setReset(false);
      return;
    }
    // Generate the code snippet
    renderCode(componentName);

    //Highlight code using Prism
    Prism.highlightAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentName, tags]);

  /**
   * Adds a 'children' property to 'Tag' elements with hierarchical structure.
   *
   * @param {Tag[]} elements - Array of 'Tag' elements from DragOverlayWrapper state.
   * @returns {Tag[]} - Array of modified 'Tag' elements with introduced 'children' property.
   * @description The function assigns the 'children' property to a 'Tag' that is a container
   *               if it has elements nested inside, creating a hierarchical structure.
   */
  const addingChildrenTags = (elements: Tag[]): Tag[] => {
    //use builtin method structuredClone to create a deep copy of the tags
    const tagsCopy = structuredClone(elements);

    const tagsDirectory = {};

    //Create a dictinary of tags for easy lookup based on id
    tagsCopy.forEach((tag) => {
      tagsDirectory[tag.id] = tag;
      if (tag.container) {
        tag.children = [];
      }
    });

    //Map through the tags to see if they have a parent
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

    //Filter root nodes (nodes without a parent)
    const rootNodes = tagsCopy.filter((tag) => !tag.parent);
    return rootNodes;
  };

  const childrenTags = addingChildrenTags(tags);

  /**
   * Generates JSX code from an array of 'Tag' elements.
   *
   * @param {Tag[]} elements - Array of 'Tag' elements representing the structure.
   * @returns {string} - String representation of the generated JSX code.
   */
  const generateCode = (elements: Tag[]): string => {
    const renderElements = elements.map((element) => {
      //Adjust tag names for specific cases
      if (element.name === 'unordered list') element.name = 'ul';
      if (element.name === 'ordered list') element.name = 'ol';
      if (element.name === 'list item') element.name = 'li';

      let tagStart = `<${element.name}`;
      let tagEnd = `</${element.name}>`;

      //Add attributes to the opening tag if present
      if (element.attribute) {
        tagStart += ` ${element.attribute}`;
      }

      //Modify self-closing tags ande determine tag endings
      if (element.name === 'img' || element.name === 'link') {
        tagStart += ' />';
        tagEnd = '';
      } else {
        tagStart += '>';
      }

      if (element.children) {
        //Recursively generate code for children
        const children = element.children;
        const result = children.map((child) => generateCode([child]));
        return `${tagStart}${result.join('')}${tagEnd}`;
      } else {
        //Return the tag with or without children
        return `${tagStart}${tagEnd}`;
      }
    });

    //Join individual elements to form the complete JSX code
    return renderElements.join('');
  };

  //
  const additional = generateCode(childrenTags);

  //Format code using Prettier
  const formatCode = (code: string) => {
    return prettier.format(code, {
      parser: 'babel',
      plugins: prettierPlugins,
      jsxBracketSameLine: true,
      singleQuote: true,
    });
  };

  /**
   * Renders JSX code based on the component name
   *
   * @param {string} name - Component name
   * @returns {void} - Sets generated JSX code in the state
   */
  function renderCode(name: string) {
    if (name === undefined) return;

    //Check if the component name ends in .tsx
    if (name.slice(-4) === '.tsx') {
      name = name.slice(0, -4);
    }

    // Capitalize the component name
    name = name.charAt(0).toUpperCase() + name.slice(1);

    let codeSnippet = '';

    //Generate JS code based on the component name
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

    //Format and set the generated code in the state
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
