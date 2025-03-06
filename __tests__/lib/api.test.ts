import axios from 'axios';
import { searchArtists, getArtistById, getAlbumsByArtistId } from '@/lib/api';

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
  })),
  isAxiosError: jest.fn(),
}));

describe('API functions', () => {
  const mockAxiosGet = axios.create().get as jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('searchArtists', () => {
    it('should return artists when API call is successful', async () => {
      const mockArtists = [{ idArtist: '123', strArtist: 'Test Artist' }];
      mockAxiosGet.mockResolvedValueOnce({ data: { artists: mockArtists } });
      
      // We need to wait for the rate limiter to process the request
      const result = await searchArtists('test');
      
      expect(result).toEqual(mockArtists);
      expect(mockAxiosGet).toHaveBeenCalledWith('/search.php?s=test');
    });
    
    it('should return empty array when no artists are found', async () => {
      mockAxiosGet.mockResolvedValueOnce({ data: { artists: null } });
      
      const result = await searchArtists('nonexistent');
      
      expect(result).toEqual([]);
    });
  });
  
  describe('getArtistById', () => {
    it('should return artist when API call is successful', async () => {
      const mockArtist = { idArtist: '123', strArtist: 'Test Artist' };
      mockAxiosGet.mockResolvedValueOnce({ data: { artists: [mockArtist] } });
      
      const result = await getArtistById('123');
      
      expect(result).toEqual(mockArtist);
      expect(mockAxiosGet).toHaveBeenCalledWith('/artist.php?i=123');
    });
    
    it('should throw error when artist is not found', async () => {
      mockAxiosGet.mockResolvedValueOnce({ data: { artists: null } });
      
      await expect(getArtistById('nonexistent')).rejects.toThrow('Artist not found');
    });
  });
  
  describe('getAlbumsByArtistId', () => {
    it('should return albums when API call is successful', async () => {
      const mockAlbums = [{ idAlbum: '456', strAlbum: 'Test Album' }];
      mockAxiosGet.mockResolvedValueOnce({ data: { album: mockAlbums } });
      
      const result = await getAlbumsByArtistId('123');
      
      expect(result).toEqual(mockAlbums);
      expect(mockAxiosGet).toHaveBeenCalledWith('/album.php?i=123');
    });
    
    it('should return empty array when no albums are found', async () => {
      mockAxiosGet.mockResolvedValueOnce({ data: { album: null } });
      
      const result = await getAlbumsByArtistId('123');
      
      expect(result).toEqual([]);
    });
  });
});