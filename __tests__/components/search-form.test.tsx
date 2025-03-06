import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '@/components/search-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the hooks/use-toast module
jest.mock('@/hooks/use-toast', () => ({
  useToast: jest.fn(),
}));

describe('SearchForm', () => {
  const mockPush = jest.fn();
  const mockToast = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    
    (useToast as jest.Mock).mockReturnValue({
      toast: mockToast,
    });
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the search form correctly', () => {
    render(<SearchForm />);
    
    expect(screen.getByPlaceholderText('Search for artists...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  
  it('initializes with the provided query', () => {
    render(<SearchForm initialQuery="test query" />);
    
    expect(screen.getByPlaceholderText('Search for artists...')).toHaveValue('test query');
  });
  
  it('updates the input value when typing', () => {
    render(<SearchForm />);
    
    const input = screen.getByPlaceholderText('Search for artists...');
    fireEvent.change(input, { target: { value: 'new query' } });
    
    expect(input).toHaveValue('new query');
  });
  
  it('navigates to search page on form submission with valid query', () => {
    render(<SearchForm />);
    
    const input = screen.getByPlaceholderText('Search for artists...');
    fireEvent.change(input, { target: { value: 'valid query' } });
    
    const form = input.closest('form');
    fireEvent.submit(form!);
    
    expect(mockPush).toHaveBeenCalledWith('/search?q=valid%20query');
    expect(mockToast).not.toHaveBeenCalled();
  });
  
  it('shows error toast on form submission with empty query', () => {
    render(<SearchForm />);
    
    const form = screen.getByPlaceholderText('Search for artists...').closest('form');
    fireEvent.submit(form!);
    
    expect(mockPush).not.toHaveBeenCalled();
    expect(mockToast).toHaveBeenCalledWith({
      title: "Search query is empty",
      description: "Please enter an artist name to search",
      variant: "destructive",
    });
  });
});