import { formatDuration } from '@/lib/time';

describe('formatDuration', () => {
  it('should format duration with hours, minutes and seconds', () => {
    expect(formatDuration('3661000')).toBe('01:01:01');
    expect(formatDuration('7323000')).toBe('02:02:03');
  });

  it('should format duration with only minutes and seconds when less than an hour', () => {
    expect(formatDuration('300000')).toBe('05:00');
    expect(formatDuration('323000')).toBe('05:23');
  });

  it('should format duration with leading zeros', () => {
    expect(formatDuration('61000')).toBe('01:01');
    expect(formatDuration('9000')).toBe('00:09');
  });

  it('should handle undefined input', () => {
    expect(formatDuration(undefined)).toBe('00:00');
  });

  it('should handle zero milliseconds', () => {
    expect(formatDuration('0')).toBe('00:00');
  });

  it('should handle empty string', () => {
    expect(formatDuration('')).toBe('00:00');
  });

  it('should handle large duration values', () => {
    expect(formatDuration('7200000')).toBe('02:00:00');
    expect(formatDuration('7405000')).toBe('02:03:25');
  });
});
