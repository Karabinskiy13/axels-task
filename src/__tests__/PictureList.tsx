import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import PictureList from '../components/PictureList';
import store from '../redux/store';

describe('<SinglePicture>', () => {
  it('Should render component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <PictureList />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
