import { createContext, useReducer, useContext } from 'react';
import codeReducer, { initialState } from './codeReducer';

interface CodeContextType {
  componentName: string;
  updateComponent: (newComponentName: string) => void;
}

//create context and initialize it with initial state
const componentContext = createContext(initialState);

const CodeProvider = ({ children }) => {
  console.log('CodeProvider');
  const [state, dispatch] = useReducer(codeReducer, initialState);
  console.log(state);

  //define action functions
  const updateComponent = (newComponentName) => {
    dispatch({
      payload: newComponentName,
    });
  };
  //defining the value that's passed in the wrapper
  const value: CodeContextType = {
    componentName: state.componentName,
    updateComponent,
  };

  return (
    <componentContext.Provider value={value}>
      {children}
    </componentContext.Provider>
  );
};

//useCode hook will be able to access componentName and updateComponent to update the context state.
export const useCode = () => {
  const context = useContext(componentContext);

  if (context === undefined) {
    throw new Error('useCode must be used within CodeProvider');
  }

  return context;
};

export default CodeProvider;
