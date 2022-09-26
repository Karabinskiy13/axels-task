import React from 'react';
import { jest } from '@jest/globals';
import { shallow } from 'enzyme';

import SinglePicture from '../components/SinglePicture';

import { Image } from '../types';

const singlePicture: Image = {
  id: 1,
  previewURL: '/image.png',
  tags: 'tags',
  largeImageURL: '/'
};

describe('<SinglePicture>', () => {
  it('Should render component', () => {
    const wrapper = shallow(<SinglePicture picture={singlePicture} showModal={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('Calling callback on card click', () => {
    const showModalCb = jest.fn(() => true);
    const wrapper = shallow(<SinglePicture picture={singlePicture} showModal={showModalCb} />);
    const card = wrapper.find('.picture');
    card.simulate('click');
    expect(showModalCb).toBeCalledWith(true);
  });

  it('Should display props', () => {
    const wrapper = shallow(<SinglePicture picture={singlePicture} showModal={jest.fn()} />);
    expect(wrapper.find('.picture__image').prop('src')).toEqual(singlePicture.previewURL);
  });
});
