import type { Meta, StoryObj } from '@storybook/react';
import { ArtistCard } from '@/components/artist-card';

// Mock next/image since it doesn't work well in Storybook
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} style={{ objectFit: props.objectFit }} />;
  },
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

const meta: Meta<typeof ArtistCard> = {
  title: 'Components/ArtistCard',
  component: ArtistCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArtistCard>;

export const WithImage: Story = {
  args: {
    artist: {
      idArtist: '111239',
      strArtist: 'Adele',
      strGenre: 'Pop',
      strArtistThumb: 'https://www.theaudiodb.com/images/media/artist/thumb/uxrqxy1347913147.jpg',
    },
  },
};

export const WithoutImage: Story = {
  args: {
    artist: {
      idArtist: '123456',
      strArtist: 'Unknown Artist',
      strGenre: 'Rock',
      strArtistThumb: '',
    },
  },
};