import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Grid } from '@/app/shared/components/Grid/Grid';

describe('Grid Component', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Grid content</div>
      </Grid>
    );
    
    expect(screen.getByText('Grid content')).toBeInTheDocument();
  });

  it('applies default CSS classes for responsive layout', () => {
    const { container } = render(
      <Grid>
        <div>Content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass(
      'w-full',
      'max-2xl:max-w-[1680px]',
      'xl:max-w-[1280px]',
      'lg:max-w-[766px]',
      'max-md:px-8',
      'mx-auto'
    );
  });

  it('renders as a div element', () => {
    const { container } = render(
      <Grid>
        <div>Content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer.tagName).toBe('DIV');
  });

  it('merges custom className with default classes', () => {
    const { container } = render(
      <Grid className="custom-class bg-red-500">
        <div>Content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('custom-class');
    expect(gridContainer).toHaveClass('bg-red-500');
    expect(gridContainer).toHaveClass('w-full');
    expect(gridContainer).toHaveClass('mx-auto');
  });

  it('overrides default classes with custom className using tailwind-merge', () => {
    const { container } = render(
      <Grid className="max-w-[500px] px-4">
        <div>Content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    // tailwind-merge should override conflicting classes
    expect(gridContainer).toHaveClass('max-w-[500px]');
    expect(gridContainer).toHaveClass('px-4');
    // Non-conflicting classes should remain
    expect(gridContainer).toHaveClass('w-full');
    expect(gridContainer).toHaveClass('mx-auto');
  });

  it('renders multiple children correctly', () => {
    render(
      <Grid>
        <div data-testid="child-1">First child</div>
        <div data-testid="child-2">Second child</div>
        <span data-testid="child-3">Third child</span>
      </Grid>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('renders complex nested children', () => {
    render(
      <Grid>
        <div>
          <h1>Title</h1>
          <p>Paragraph content</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </div>
      </Grid>
    );
    
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Title');
    expect(screen.getByText('Paragraph content')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
  });

  it('handles string children', () => {
    render(<Grid>Simple text content</Grid>);
    
    expect(screen.getByText('Simple text content')).toBeInTheDocument();
  });

  it('handles numeric children', () => {
    render(<Grid>{42}</Grid>);
    
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('handles React fragments as children', () => {
    render(
      <Grid>
        <>
          <div>Fragment child 1</div>
          <div>Fragment child 2</div>
        </>
      </Grid>
    );
    
    expect(screen.getByText('Fragment child 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment child 2')).toBeInTheDocument();
  });

  it('applies responsive breakpoint classes correctly', () => {
    const { container } = render(
      <Grid>
        <div>Responsive content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    
    // Check that all responsive classes are present
    expect(gridContainer).toHaveClass('max-2xl:max-w-[1680px]'); // 2xl breakpoint
    expect(gridContainer).toHaveClass('xl:max-w-[1280px]');      // xl breakpoint
    expect(gridContainer).toHaveClass('lg:max-w-[766px]');       // lg breakpoint
    expect(gridContainer).toHaveClass('max-md:px-8');           // md breakpoint
  });

  it('maintains full width with auto margin centering', () => {
    const { container } = render(
      <Grid>
        <div>Centered content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('w-full');
    expect(gridContainer).toHaveClass('mx-auto');
  });

  it('handles empty children gracefully', () => {
    const { container } = render(<Grid children={undefined} />);
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toBeEmptyDOMElement();
  });

  it('handles null children gracefully', () => {
    const { container } = render(
      <Grid>
        {null}
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toBeEmptyDOMElement();
  });

  it('handles undefined children gracefully', () => {
    const { container } = render(
      <Grid>
        {undefined}
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toBeEmptyDOMElement();
  });

  it('handles boolean children gracefully', () => {
    const { container } = render(
      <Grid>
        {true}
        {false}
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toBeEmptyDOMElement();
  });

  it('handles conditional rendering with children', () => {
    const showContent = true;
    
    render(
      <Grid>
        {showContent && <div>Conditional content</div>}
        {!showContent && <div>Alternative content</div>}
      </Grid>
    );
    
    expect(screen.getByText('Conditional content')).toBeInTheDocument();
    expect(screen.queryByText('Alternative content')).not.toBeInTheDocument();
  });

  it('handles array of children', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    
    render(
      <Grid>
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </Grid>
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('maintains semantic structure when used as container', () => {
    render(
      <Grid>
        <header>Header</header>
        <main>Main content</main>
        <footer>Footer</footer>
      </Grid>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  it('works with different HTML5 semantic elements as children', () => {
    render(
      <Grid>
        <article data-testid="article">Article content</article>
        <section data-testid="section">Section content</section>
        <aside data-testid="aside">Aside content</aside>
        <nav data-testid="nav">Navigation</nav>
      </Grid>
    );
    
    expect(screen.getByTestId('article')).toBeInTheDocument();
    expect(screen.getByTestId('section')).toBeInTheDocument();
    expect(screen.getByTestId('aside')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });

  it('handles mixed content types as children', () => {
    render(
      <Grid>
        Text content
        <div>Div element</div>
        {42}
        <span>Span element</span>
        {null}
        {undefined}
      </Grid>
    );
    
    expect(screen.getByText(/Text content/)).toBeInTheDocument();
    expect(screen.getByText('Div element')).toBeInTheDocument();
    const container42 = screen.getByText('Div element').parentElement;
    expect(container42?.textContent).toContain('42');
    expect(screen.getByText('Span element')).toBeInTheDocument();
  });

  it('applies className from props correctly', () => {
    const { container } = render(
      <Grid className="test-class">
        <div>Test content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('test-class');
  });

  it('handles undefined className prop', () => {
    const { container } = render(
      <Grid className={undefined}>
        <div>Test content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('w-full');
    expect(gridContainer).toHaveClass('mx-auto');
  });

  it('handles null className prop', () => {
    const { container } = render(
      <Grid className={null as any}>
        <div>Test content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('w-full');
    expect(gridContainer).toHaveClass('mx-auto');
  });

  it('handles empty string className prop', () => {
    const { container } = render(
      <Grid className="">
        <div>Test content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('w-full');
    expect(gridContainer).toHaveClass('mx-auto');
  });

  it('renders with maximum width constraints at different breakpoints', () => {
    const { container } = render(
      <Grid>
        <div>Responsive container</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    
    // Verify the specific max-width values for each breakpoint
    expect(gridContainer).toHaveClass('max-2xl:max-w-[1680px]');
    expect(gridContainer).toHaveClass('xl:max-w-[1280px]');
    expect(gridContainer).toHaveClass('lg:max-w-[766px]');
  });

  it('applies mobile padding correctly', () => {
    const { container } = render(
      <Grid>
        <div>Mobile content</div>
      </Grid>
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('max-md:px-8');
  });

  it('maintains consistent structure with complex children', () => {
    const { container } = render(
      <Grid>
        <div className="nested-container">
          <Grid>
            <span>Nested grid content</span>
          </Grid>
        </div>
      </Grid>
    );
    
    const outerGrid = container.firstChild;
    expect(outerGrid).toHaveClass('w-full', 'mx-auto');
    
    const nestedContainer = screen.getByText('Nested grid content').closest('.w-full');
    expect(nestedContainer).toBeInTheDocument();
  });

  it('handles dynamic className changes', () => {
    const { container, rerender } = render(
      <Grid className="initial-class">
        <div>Dynamic content</div>
      </Grid>
    );
    
    let gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('initial-class');
    
    rerender(
      <Grid className="updated-class">
        <div>Dynamic content</div>
      </Grid>
    );
    
    gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass('updated-class');
    expect(gridContainer).not.toHaveClass('initial-class');
  });
});