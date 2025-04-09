import {useDispatch, useSelector} from 'react-redux';
import ConfigContainer from '../Config/ConfigContainer';
import {changeOption} from '../../redux/actions/serverActions';

export default function Server({}) {
  const serverConfig = useSelector(state => state.server);
  const dispatch = useDispatch();

  return (
    <>
      <ConfigContainer
        heading="Server config"
        shouldDisplay
        data={serverConfig}
        options={serverConfig.options}
        initcontent={serverConfig.selectedJSON}
        optionOnchange={e => {
          dispatch(changeOption(e.target.value));
        }}
      />
    </>
  );
}
