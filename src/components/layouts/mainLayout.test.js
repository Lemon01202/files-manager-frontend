import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';

jest.mock('@mui/material', () => ({
  AppBar: ({ children, ...props }) => <div data-testid="appbar" {...props}>{children}</div>,
  Toolbar: ({ children }) => <div data-testid="toolbar">{children}</div>,
  Typography: ({ children, variant }) => <span data-testid={`typography-${variant}`}>{children}</span>,
}));

jest.mock('@mui/system', () => ({
  Container: ({ children }) => <div data-testid="container">{children}</div>,
}));

describe('MainLayout', () => {
  it('renders AppBar with Toolbar and Typography', () => {
    render(<MainLayout children={<div />} />);

    const appBar = screen.getByTestId('appbar');
    expect(appBar).toBeInTheDocument();
    expect(appBar).toHaveAttribute('position', 'static');

    const toolbar = screen.getByTestId('toolbar');
    expect(toolbar).toBeInTheDocument();

    const typography = screen.getByTestId('typography-h6');
    expect(typography).toBeInTheDocument();
    expect(typography).toHaveTextContent('File Manager');
  });

  it('renders children inside Container', () => {
    const childText = 'Test Child Content';
    render(
      <MainLayout>
        <div>{childText}</div>
      </MainLayout>,
    );

    const container = screen.getByTestId('container');
    expect(container).toBeInTheDocument();

    expect(container).toHaveTextContent(childText);
  });
});
