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
    renderCode(componentName, tags);
    Prism.highlightAll();
  }, [componentName]); // Re-render and update the code when componentName change
  //adding tags as a dependency breaks prism

  function renderCode(name: string, elements: RenderCodeProps) {
    if (name === undefined) return;
    //Check if it has end .tsx
    if (name.slice(-4) === '.tsx') {
      name = name.slice(0, -4);
    }
    // Capitalize the component name
    name = name.charAt(0).toUpperCase() + name.slice(1);

    //itirate through the tags
    const htmlElements = tags.map((tag) => {
      return <li key={tag.id}>{tag.name}</li>;
    });
    // console.log(htmlElements);

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
      </>
    );
  };
  
  export default ${name};
  `;
    }
    setCodeSnippet(codeSnippet);
  }

  return (
    <Box>
      <ul>
        <pre>
          <code className='language-javascript'>{codeSnippet}</code>
        </pre>
      </ul>
    </Box>
  );
};

export default CodePreview;
