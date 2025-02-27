import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './Loader';

jest.mock('@mui/material', () => ({
  CircularProgress: () => <div data-testid="circular-progress" />,
  Box: ({ children, sx }) => (
    <div data-testid="box" style={sx}>
      {children}
    </div>
  ),
}));

describe('Loader', () => {
  it('renders CircularProgress', () => {
    render(<Loader />);

    const box = screen.getByTestId('box');
    expect(box).toBeInTheDocument();

    const circularProgress = screen.getByTestId('circular-progress');
    expect(circularProgress).toBeInTheDocument();
    expect(box).toContainElement(circularProgress);
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
