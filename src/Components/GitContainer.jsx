import ConfigItem from './Config/ConfigItem';
import '../styles/env-config.css';
import {useState} from 'react';
export default function GitContainer({heading = 'Git'}) {
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
        <input placeholder="BRANCH / PR"></input>
      </div>
    </div>
  );
}
