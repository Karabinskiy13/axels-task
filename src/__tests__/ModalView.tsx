import React from 'react';
import { render, screen } from '@testing-library/react';
import { jest } from '@jest/globals';

import ModalView from '../components/ModalView';

describe('<Modal View>', () => {
  test('Should render component', () => {
    const { asFragment } = render(
      <ModalView show={true} url={'/image.png'} hideModal={jest.fn()} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should display modal view from props', async () => {
    render(<ModalView show={true} url={'/image.png'} hideModal={jest.fn()} />);
    await screen.findAllByAltText('modal__image');
    expect(screen.getByAltText('modal__image')).toHaveAttribute('src', '/image.png');
  });
});
