import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SinglePicture from './SinglePicture';
import { Image } from '../../types';

configure({ adapter: new Adapter() });
const singlePicture: Image = {
  id: 1,
  previewURL: '/',
  tags: 'tags',
  largeImageURL: '/'
};
const showModals =(status: boolean) => void;

describe('<SinglePicture>', () => {
  it('props', () => {
    const wrapper = shallow(<SinglePicture picture={singlePicture} showModal={showModals} />);
    expect(wrapper.props().picture.showModal).to.equal('Success!');
  });
});
