import Prism from 'prismjs';
import { Box } from '@mui/material';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css'; //okadia theme
import 'prismjs/components/prism-jsx.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/plugins/match-braces/prism-match-braces.min';
import 'prismjs/plugins/match-braces/prism-match-braces.css';
import { useContext, useEffect, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server'; //renders React components to HTML string
import { CodeContext, CodeSnippetContext } from '../../App';
import AppContext from '../../context/AppContext';
import { RenderCodeProps } from '../../utils/interfaces';

interface CodePreviewProps {
  treeData: object;
}

const CodePreview = ({ treeData: CodePreviewProps }) => {
  const [componentName, setComponentName] = useContext(CodeContext);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext);
  const [htmlCode, setHtmlCode] = useState<JSX.Element>(null);
  const { tags, setTags } = useContext(AppContext);

  useEffect(() => {
    // Generate the code snippet
    renderCode(componentName);
    Prism.highlightAll();
  }, [componentName]); // Re-render and update the code when componentName change
  //adding tags as a dependency breaks prism

  const addingChildrenTags = (elements: Tag[]): Tag[] => {
    //check if the container property is true
    //add a property of children
    tags.map((tag) => {
      if (tag.container) {
        tag.children = [];
      }
      //if it has a parent, push it inside of the corresponding children array
      if (tag.parent) {
        const parentId = tag.parent;
        console.log(parentId);

        const index = tags.findIndex((tag) => tag.id === parentId);
        tags[index].children.push(tag);
      }
    });

    return tags;
  };

  const childrenTags = addingChildrenTags(tags);
  console.log('CHILDREN', childrenTags);

  const generateCode = (elements: Tag[]): JSX.Element => {
    const renderElements = elements.map((element) => {
      if (element.children) {
        const children = element.children;
        const result = children.map((child) => {
          console.log(child);
          if (child.name === 'img' || child.name === 'link') {
            console.log('checking for img or link');
            return `<${child.name} ${child.attribute}>\n`;
          } else {
            return `<${child.name}>\n</${child.name}>\n`;
          }
        });
        return `<${element.name}>\n ${result}\n</${element.name}>\n`;
      } else if (!element.container && !element.parent) {
        return `<${element.name}>\n</${element.name}>\n`;
      } else console.log('in other conditional');
    });
    console.log(renderElements);
    return renderElements;
  };

  const additional = generateCode(childrenTags);
  console.log('additional', additional);

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
      </div>
    );
  };
  
  export default ${name};
  `;
    } else {
      codeSnippet = `import React from 'react';
  
  const ${name} = () => {
    return (
      <>${additional}</>
    );
  };
  
export default ${name};
  `;
    }
    setCodeSnippet(codeSnippet);
  }

  return (
    <>
      <Box>
        <pre className='line-numbers'>
          <code className='language-jsx match-braces'>{codeSnippet}</code>
        </pre>
        <pre className='line-numbers'>
          <code className='language-html line-numbers'>{additional}</code>
        </pre>
      </Box>
      <div style={{ textAlign: 'center' }}>
        <ul>
          <li>hello</li>
        </ul>
        <ul>
          <li> {additional}</li>
        </ul>
      </div>
    </>
  );
};

export default CodePreview;
