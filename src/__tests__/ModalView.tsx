import React from 'react';
import { shallow } from 'enzyme';
import { jest } from '@jest/globals';

import ModalView from '../components/ModalView';

describe('<SinglePicture>', () => {
  it('Should render component', () => {
    const wrapper = shallow(<ModalView show={true} url={'/image.png'} hideModal={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Should display props', () => {
    const wrapper = shallow(<ModalView show={true} url={'/'} hideModal={jest.fn()} />);
    expect(wrapper.find('.modal__image').prop('src')).toEqual('/');
  });
});
