import './App.css';
import ConfigContainer from './Components/ConfigContainer';
import NavigationContainer from './Components/NavigationContainer';
import EnvironmentConfig from './Components/EnvironmentConfig';
import GitContainer from './Components/GitContainer';

function App() {
  return (
    <>
      <NavigationContainer />
      <main>
        <div className="root-container">
          <ConfigContainer heading="Sdk Props" shouldDisplay />
          <ConfigContainer heading="Server config" />
        </div>
        <div className="root-container">
          <EnvironmentConfig />
          <GitContainer />
        </div>
        {/* <div className="root-container">
          <button>Save & Run</button>
        </div> */}
      </main>
    </>
  );
}

export default App;
