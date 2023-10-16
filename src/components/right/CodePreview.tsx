import Prism from 'prismjs';
import './prism/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism.css'; // Use the path to the actual Prism.css file
import 'prismjs/themes/prism-okaidia.css'; //okadia theme
import 'prismjs/components/prism-javascript';
import { useEffect } from 'react';

const CodePreview = () => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <pre>
      <code className='language-javascript'>
        {`
          import React from 'react';

          const Hellooo = () => {
            console.log('Hello World)
          };

          export default Hello;
        `}
      </code>
    </pre>
  );
};

export default CodePreview;
