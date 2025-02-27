import { render, screen, fireEvent } from '@testing-library/react';
import BreadcrumbsNav from "./breadcrumbs";

describe('BreadcrumbsNav', () => {
  const mockOnFolderClick = jest.fn();

  const sampleBreadcrumbs = [
    { id: 1, folderName: 'Folder 1' },
    { id: 2, folderName: 'Folder 2' },
    { id: 3, folderName: 'Folder 3' },
  ];

  it('renders breadcrumbs with valid data', () => {
    render(<BreadcrumbsNav breadcrumbs={sampleBreadcrumbs} onFolderClick={mockOnFolderClick} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Folder 1')).toBeInTheDocument();
    expect(screen.getByText('Folder 2')).toBeInTheDocument();
    expect(screen.getByText('Folder 3')).toBeInTheDocument();
  });

  it('calls onFolderClick with null when Home is clicked', () => {
    render(<BreadcrumbsNav breadcrumbs={sampleBreadcrumbs} onFolderClick={mockOnFolderClick} />);
    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);
    expect(mockOnFolderClick).toHaveBeenCalledWith(null);
  });

  it('calls onFolderClick with the correct folder ID', () => {
    render(<BreadcrumbsNav breadcrumbs={sampleBreadcrumbs} onFolderClick={mockOnFolderClick} />);
    const folderLink = screen.getByText('Folder 1');
    fireEvent.click(folderLink);
    expect(mockOnFolderClick).toHaveBeenCalledWith(1);
  });
});
