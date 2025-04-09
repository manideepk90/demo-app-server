import {useDispatch, useSelector} from 'react-redux';
import ConfigContainer from '../Config/ConfigContainer';
import {changeOption} from '../../redux/actions/serverActions';

export default function SDKprops({}) {
  const sdkProps = useSelector(state => state.sdkProps);
  const dispatch = useDispatch();

  return (
    <>
      <ConfigContainer
        heading="Sdk Props"
        shouldDisplay
        data={sdkProps}
        options={sdkProps.options}
        initcontent={sdkProps.selectedJSON}
        optionOnchange={e => {
          dispatch(changeOption(e.target.value));
        }}
      />
    </>
  );
}
