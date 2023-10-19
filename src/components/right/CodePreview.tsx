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

  useEffect(() => {
    Prism.highlightAll();
  }, [code]); //make it re render every time the component name is changed

  const codeSnippet = `
    import React from 'react';

    const ${componentName} = () => {
      return ();
    };

    export default ${componentName};

  `;

  return (
    <Box>
      <pre>
        <code className='language-tsx'>{code}</code>
      </pre>
    </Box>
  );
};

export default CodePreview;
