import React from 'react';
import { shallow } from 'enzyme';
import App from '../../App';
import store from '../../redux/store';
import { Provider } from 'react-redux';

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
