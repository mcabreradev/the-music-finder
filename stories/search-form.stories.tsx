import type { Meta, StoryObj } from '@storybook/react';
import { SearchForm } from '@/components/search-form';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: () => {},
  }),
}));

// Mock the hooks/use-toast module
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: () => {},
  }),
}));

const meta: Meta<typeof SearchForm> = {
  title: 'Components/SearchForm',
  component: SearchForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchForm>;

export const Default: Story = {
  args: {},
};

export const WithInitialQuery: Story = {
  args: {
    initialQuery: 'Coldplay',
  },
};
