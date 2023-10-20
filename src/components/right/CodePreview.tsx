import Prism from 'prismjs';
import { Box } from '@mui/material';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css'; //okadia theme
import 'prismjs/components/prism-javascript';
import { useContext, useEffect } from 'react';
import { CodeContext } from '../../App';

interface CodePreviewProps {
  code: string;
}

const CodePreview = ({ code }: CodePreviewProps) => {
  const [componentName, setComponentName] = useContext(CodeContext);
  let codeSnippet = '';

  useEffect(() => {
    Prism.highlightAll();
  }, [componentName]); //make it re render every time the component name is changed

  function renderCode(title: string) {
    if (componentName === 'NotFound') {
      codeSnippet = `
import React from 'react';

const ${componentName} = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      {/* You can add additional content or links here */}
    </div>
  );
};

export default ${componentName};

      `;
    } else {
      codeSnippet = `
      import React from 'react';
    
      const ${componentName} = () => {
        return (
          <>
            {/* Your page content goes here */}
          </>
        );
      };
    
      export default ${componentName};`;
    }
    return codeSnippet;
  }

  renderCode(componentName);

  //write the code on the physical file

  // function handleCodeChange() {
  //   const response = await fetch('http://localhost:3000/', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(body),
  // });
  // }

  return (
    <Box>
      <pre>
        <code className='language-javascript'>{codeSnippet}</code>
      </pre>
    </Box>
  );
};

export default CodePreview;
