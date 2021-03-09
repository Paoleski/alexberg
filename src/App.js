
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
  );
}

export default App;
