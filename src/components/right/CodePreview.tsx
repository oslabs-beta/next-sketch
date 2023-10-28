import Prism from 'prismjs';
import { Box } from '@mui/material';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css'; //okadia theme
import 'prismjs/components/prism-javascript';
import { useContext, useEffect } from 'react';
import { CodeContext, CodeSnippetContext } from '../../App';
import AppContext from '../../context/AppContext';
import { RenderCodeProps } from '../../utils/interfaces';

interface CodePreviewProps {
  treeData: object;
}

const CodePreview = ({ treeData: CodePreviewProps }) => {
  const [componentName, setComponentName] = useContext(CodeContext);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext);
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
          return (
            <div key={child.id}>
              {child.openTag}
              {child.closeTag}
            </div>
          );
        });
        return (
          <ul>
            <div>
              {element.openTag}
              {result}
              {element.closeTag}
            </div>
          </ul>
        );
      } else if (!element.container && !element.parent) {
        console.log(element);
        console.log('independent tag');

        return (
          <div>
            {element.openTag}
            {element.closeTag}
          </div>
        );
      } else console.log('in other conditional');
    });

    return renderElements;
  };

  const additional = generateCode(childrenTags);
  console.log(additional);

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
      codeSnippet = `
  import React from 'react';
  
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
    setCodeSnippet(codeSnippet);
  }

  return (
    // <Box>
    //   <pre>
    //     <code className='language-javascript'>{codeSnippet}</code>
    //   </pre>
    // </Box>
    <div style={{ textAlign: 'center' }}>
      <ul>
        <li>hello</li>
      </ul>
      <ul>
        <li> {additional}</li>
      </ul>
    </div>
  );
};

export default CodePreview;
