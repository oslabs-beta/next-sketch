import HTMLTagsContainer from './components/middle/HTMLTagsContainer';
import './App.css';
import CreateComponentBtn from './components/middle/CreateComponentBtn';

const App = () => {
  return (
    <>
      <CreateComponentBtn />
      <div className='flex'>
        <HTMLTagsContainer />
      </div>
    </>
  );
};

export default App;
