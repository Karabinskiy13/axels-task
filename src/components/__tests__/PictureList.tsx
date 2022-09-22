import React from 'react';
import { shallow } from 'enzyme';
import PictureList from '../PictureList';
import store from '../../redux/store';
import { Provider } from 'react-redux';

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
