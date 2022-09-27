import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import App from '../App';
import store from '../redux/store';

describe('<SinglePicture>', () => {
  it('Should render component', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
