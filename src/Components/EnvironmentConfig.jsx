import ConfigItem from './Config/ConfigItem';
import '../styles/env-config.css';
import {useState} from 'react';
export default function EnvironmentConfig({heading = 'Environment'}) {
  const [shouldDisplay, setShouldDisplay] = useState(false);
  return (
    <div className="config-container">
      <div className="heading">
        <h2 onClick={() => setShouldDisplay(prev => !prev)}>{heading}</h2>
        <button>Save</button>
      </div>
      <div>
        <ConfigItem />
      </div>
      <div className="env-input" aria-shouldDisplay={shouldDisplay}>
        <input placeholder="Publishable key"></input>
        <input placeholder="API/Secret key"></input>
        <input placeholder="Profile ID"></input>
      </div>
    </div>
  );
}
