import React from 'react';
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SinglePicture from '../components/SinglePicture';

import { Image } from '../types';

const singlePicture: Image = {
  id: 1,
  previewURL: '/image.png',
  tags: 'tags',
  largeImageURL: '/'
};

describe('<SinglePicture>', () => {
  test('Should render component', () => {
    const { asFragment } = render(<SinglePicture picture={singlePicture} showModal={jest.fn()} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should call a callback when the card is clicked', async () => {
    const showModalCb = jest.fn(() => true);
    const { asFragment } = render(
      <SinglePicture picture={singlePicture} showModal={showModalCb} />
    );
    const user = userEvent.setup();
    await user.click(screen.getByAltText('picture__image'));
    expect(showModalCb).toBeCalledWith(true);
  });

  //   it('Should display image from props', async () => {
  //     const { asFragment } = render(<SinglePicture picture={singlePicture} showModal={jest.fn()} />);

  //     expect(.find('.picture__image').prop('src')).toEqual(singlePicture.previewURL);
  //   });
});
