import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalActions from './ModalActions';

jest.mock('@mui/material', () => ({
  Box: ({ children, ...props }) => <div data-testid="box" {...props}>{children}</div>,
  Button: ({ children, onClick, variant, color, ...props }) => (
    <button
      data-testid={`button-${variant}-${color || 'default'}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  ),
}));

describe('ModalActions', () => {
  it('renders buttons with default props correctly', () => {
    render(
      <ModalActions
        onConfirm={() => {}}
        onCancel={() => {}}
        confirmText="Yes"
        cancelText="No"
      />,
    );

    const box = screen.getByTestId('box');
    expect(box).toBeInTheDocument();

    const confirmButton = screen.getByTestId('button-contained-primary');
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton).toHaveTextContent('Yes');

    const cancelButton = screen.getByTestId('button-outlined-default');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('No');
  });

  it('renders confirm button', () => {
    render(
      <ModalActions
        onConfirm={() => {}}
        onCancel={() => {}}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
      />,
    );

    const confirmButton = screen.getByTestId('button-contained-error');
    expect(confirmButton).toBeInTheDocument();
    expect(confirmButton).toHaveTextContent('Delete');

    const cancelButton = screen.getByTestId('button-outlined-default');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('Cancel');
  });

  it('calls onConfirm when confirm button is clicked', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();

    render(
      <ModalActions
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        confirmText="Yes"
        cancelText="No"
      />,
    );

    const confirmButton = screen.getByTestId('button-contained-primary');
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  it('calls onCancel when cancel button is clicked', () => {
    const mockOnConfirm = jest.fn();
    const mockOnCancel = jest.fn();

    render(
      <ModalActions
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        confirmText="Yes"
        cancelText="No"
      />,
    );

    const cancelButton = screen.getByTestId('button-outlined-default');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});
