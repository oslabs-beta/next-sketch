import React, { Dispatch, SetStateAction, useState } from 'react';
import HTMLTagsContainer from './components/middle/HTMLTagsContainer';
import './App.css';
import CreateComponentBtn from './components/middle/CreateComponentBtn';
import CodePreview from './components/right/CodePreview';

interface ComponentNameType {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
}

export const CodeContext = React.createContext<ComponentNameType | undefined>(
  undefined
);

const App = () => {
  const [componentName, setComponentName] = useState<string>('App');
  return (
    <CodeContext.Provider value={[componentName, setComponentName]}>
      <CreateComponentBtn />
      <div className='flex'>
        <HTMLTagsContainer />
      </div>
      <CodePreview />
    </CodeContext.Provider>
  );
};

export default App;
