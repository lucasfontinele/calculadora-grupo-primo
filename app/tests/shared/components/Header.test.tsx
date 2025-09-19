import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Header } from '@/app/shared/components/Header/Header';

// Mock Next.js components
vi.mock('next/image', () => ({
  default: ({ alt, src, width, height, className, ...props }: any) => (
    <img
      alt={alt}
      src={src}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Header Component', () => {
  it('renders header element with correct semantic structure', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header.tagName).toBe('HEADER');
  });

  it('applies correct CSS classes to header element', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'w-full',
      'border-b',
      'border-primary-gray',
    );
  });

  it('renders logo image with correct attributes', () => {
    render(<Header />);

    const logo = screen.getByAltText('Grupo Primo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toHaveAttribute('width', '176');
    expect(logo).toHaveAttribute('height', '32');
  });

  it('applies responsive classes to logo image', () => {
    render(<Header />);

    const logo = screen.getByAltText('Grupo Primo');
    expect(logo).toHaveClass('max-md:w-[120px]', 'max-md:h-[22px]');
  });

  it('renders logo as a link to home page', () => {
    render(<Header />);

    const logoLink = screen.getByRole('link');
    expect(logoLink).toHaveAttribute('href', '/');

    const logo = screen.getByAltText('Grupo Primo');
    expect(logoLink).toContainElement(logo);
  });

  it('contains Grid component with correct styling', () => {
    const { container } = render(<Header />);

    const gridElement = container.querySelector('.py-8');
    expect(gridElement).toBeInTheDocument();
    expect(gridElement).toHaveClass('py-8');
  });

  it('logo image has correct dimensions', () => {
    render(<Header />);

    const logo = screen.getByAltText('Grupo Primo');
    expect(logo).toHaveAttribute('width', '176');
    expect(logo).toHaveAttribute('height', '32');
  });

  it('applies border styling correctly', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('border-b');
    expect(header).toHaveClass('border-primary-gray');
  });

  it('renders without errors when mounted multiple times', () => {
    const { unmount } = render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();

    unmount();

    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByAltText('Grupo Primo')).toBeInTheDocument();
  });

  it('has correct image alt text for screen readers', () => {
    render(<Header />);

    const logo = screen.getByRole('img', { name: 'Grupo Primo' });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('alt', 'Grupo Primo');
  });

  it('maintains responsive design classes', () => {
    render(<Header />);

    const logo = screen.getByAltText('Grupo Primo');

    // Check responsive width and height classes
    expect(logo.className).toContain('max-md:w-[120px]');
    expect(logo.className).toContain('max-md:h-[22px]');
  });
});
