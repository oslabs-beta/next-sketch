import Prism from 'prismjs';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css'; //okadia theme
import 'prismjs/components/prism-javascript';
import { useContext, useEffect } from 'react';
import { CodeContext } from '../../App';

const CodePreview = () => {
  const [componentName, setComponentName] = useContext(CodeContext);

  useEffect(() => {
    Prism.highlightAll();
  }, [componentName]); //make it re render every time the component name is changed

  const codeSnippet = `
    import React from 'react';

    const ${componentName} = () => {};

    export default ${componentName};
  `;

  return (
    <pre>
      <code className='language-javascript'>{codeSnippet}</code>
    </pre>
  );
};

export default CodePreview;
