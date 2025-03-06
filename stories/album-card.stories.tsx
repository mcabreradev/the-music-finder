import type { Meta, StoryObj } from '@storybook/react';
import { AlbumCard } from '@/components/album-card';

// Mock next/image since it doesn't work well in Storybook
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} style={{ objectFit: props.objectFit }} />;
  },
}));

const meta: Meta<typeof AlbumCard> = {
  title: 'Components/AlbumCard',
  component: AlbumCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlbumCard>;

export const WithImage: Story = {
  args: {
    album: {
      idAlbum: '2114620',
      idArtist: '111239',
      strAlbum: '25',
      strArtist: 'Adele',
      intYearReleased: '2015',
      strAlbumThumb: 'https://www.theaudiodb.com/images/media/album/thumb/25-adele-5671f6a7e73fa.jpg',
    },
  },
};

export const WithoutImage: Story = {
  args: {
    album: {
      idAlbum: '123456',
      idArtist: '111239',
      strAlbum: 'Unknown Album',
      strArtist: 'Adele',
      intYearReleased: '2020',
      strAlbumThumb: '',
    },
  },
};