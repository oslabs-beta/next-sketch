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
import { useContext, useEffect, useState } from 'react';
import { CodeContext, CodeSnippetContext } from '../../App';
import AppContext from '../../context/AppContext';

interface CodePreviewProps {
  treeData: object;
}

declare const prettier: any;
declare const prettierPlugins: any;

const CodePreview = ({ treeData: CodePreviewProps }) => {
  const [componentName, setComponentName] = useContext(CodeContext);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext);
  const { tags, setTags } = useContext(AppContext);
  const { newTags, setNewTags } = useState<Tag[]>([]);

  useEffect(() => {
    // Generate the code snippet
    if(tags.length === 0) {
      return
    }
    renderCode(componentName);
    Prism.highlightAll();
  }, [componentName, tags]); // Re-render and update the code when componentName change
  //adding tags as a dependency breaks prism

  const addingChildrenTags = (elements: Tag[]): Tag[] => {
    //check if the container property is true
    //add a property of children
    const tagsCopy = structuredClone(elements);

    const tagsDirectory = {};

    //create a dictinary of tags for easy lookup based on id
    tagsCopy.forEach((tag) => {
      tagsDirectory[tag.id] = tag;
      if (tag.container) {
        tag.children = [];
      }
    });

    //map through the tags to see if they have a parent
    tagsCopy.map((tag) => {
      if (tag.parent) {
        const parentId = tag.parent;
        const parentTag = tagsDirectory[parentId];

        if (parentTag) {
          parentTag.children.push(tag);
        }
      }
    });

    const rootNodes = tagsCopy.filter((tag) => !tag.parent);
    return rootNodes;
  };

  const childrenTags = addingChildrenTags(tags);

  const generateCode = (elements: Tag[]): JSX.Element => {
    console.log('Tags', elements)
    const renderElements = elements.map((element) => {

      //checking for ul, ol and li
      if(element.name === 'unordered list'){
        element.name = 'ul'
      }
      if(element.name === 'ordered list'){
        element.name = 'ol'
      }
      if(element.name === 'list item'){
        element.name = 'li'
      }

      if (element.children) {
        const children = element.children;
        const result = children.map((child) => {

          // if(child.children) {
          //   console.log('NESTED');
          //   console.log(child);
          //   generateCode(child.children)
          // }



          //checking for ul li and ol
          if(child.name === 'unordered list'){
            child.name = 'ul'
          }
          if(child.name === 'ordered list'){
            child.name = 'ol'
          }
          if(child.name === 'list item'){
            child.name = 'li'
          }


          if (child.name === 'img' || child.name === 'link') {
            return `<${child.name} ${child.attribute} />`;
          } else {
            return `<${child.name}></${child.name}>`;
          }
        });
        return `<${element.name}>${result.join('')}</${element.name}>`;
      } else if (!element.container && !element.parent) {
        if (element.name === 'img' || element.name === 'link') {
          return `<${element.name} ${element.attribute} />`;
        }
        return `<${element.name}></${element.name}>`;
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
        border: 2,
        borderColor: 'darkgreen',
        flexGrow: 1,
        paddingLeft: 2,
        paddingRight: 2,
      }}
    >
      <Typography variant='h6'>Code Preview</Typography>
      <Box
        sx={{
          border: 2,
          borderColor: 'darkred',
          height: '35vh',
          overflow: 'auto',
          scrollbarWidth: 'none', // Hide the scrollbar for firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
          },
          '&-ms-overflow-style:': {
            display: 'none', // Hide the scrollbar for IE
          },
        }}
      >
          <pre className='line-numbers'>
            <code className='language-jsx match-braces'>{codeSnippet}</code>
          </pre>
        <pre className='line-numbers'>
          {/* <code className='language-html line-numbers'>{additional}</code> */}
        </pre>
      </Box>
      </Box>
    </>
  );
};

export default CodePreview;
