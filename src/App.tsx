import History from './Components/History';
import './App.scss';
import data from './data.json'

function App() {
  return (
    <div className="App">
      <History data={data}/>
    </div>
  );
}

export default App;
