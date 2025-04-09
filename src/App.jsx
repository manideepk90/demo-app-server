import './App.css';
import NavigationContainer from './Components/navigation/NavigationContainer';
import React from 'react';
import SDKprops from './Components/sdkProps';
import Server from './Components/server';
// import {getData, getOptions, saveData} from './utils/fetchutils';

function App() {
  return (
    <div className="main-container">
      <NavigationContainer />
      <main>
        <div className="root-container">
          <SDKprops />
          <Server />
        </div>
        <div className="root-container">
          {/* <EnvironmentConfig
            options={env.options}
            initcontent={env.selectedJson}
          />
          <GitContainer options={git.options} initcontent={git.selectedJson} /> */}
        </div>
        <div className="root-container">
          <button className="bt bt-primary">Save & Run</button>
        </div>
      </main>
    </div>
  );
}

export default App;
