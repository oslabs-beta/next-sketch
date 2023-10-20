import Prism from 'prismjs';
import { Box } from '@mui/material';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css'; //okadia theme
import 'prismjs/components/prism-javascript';
import { useContext, useEffect, useState } from 'react';
import { CodeContext, CodeSnippetContext } from '../../App';

const CodePreview = () => {
  const [componentName, setComponentName] = useContext(CodeContext);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext); // Use state to store the code

  useEffect(() => {
    // Generate the code snippet
    Prism.highlightAll();
    renderCode(componentName);
    handleCodeChange(codeSnippet);
    // setCodeSnippet(newCodeSnippet); // Update the state with the new code snippet
    //handleCodeChange(newCodeSnippet); // Send the new code snippet to the server
  }, [componentName, codeSnippet]); // Re-render and update the code when componentName changes

  function renderCode(title: string) {
    // Capitalize the component name
    title = title.charAt(0).toUpperCase() + title.slice(1);

    let codeSnippet = '';
    if (title === 'NotFound') {
      codeSnippet = `
  import React from 'react';
  
  const ${title} = () => {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        {/* You can add additional content or links here */}
      </div>
    );
  };
  
  export default ${title};
  `;
    } else {
      codeSnippet = `
  import React from 'react';
  
  const ${title} = () => {
    return (
      <>
        {/* Your page content goes here */}
      </>
    );
  };
  
  export default ${title};
  `;
    }
    setCodeSnippet(codeSnippet);
    return codeSnippet;
  }

  async function handleCodeChange(code: string) {
    console.log('passing to fetch', JSON.stringify(code));
    if (componentName) {
      console.log('inside of the if statement');
      const response = await fetch('http://localhost:3000/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(code), // Use the newCodeSnippet from state
      });
    }
  }

  return (
    <Box>
      <pre>
        <code className='language-javascript'>{codeSnippet}</code>
      </pre>
    </Box>
  );
};

export default CodePreview;
