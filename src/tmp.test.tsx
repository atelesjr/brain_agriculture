import { render, screen } from '@/test-utils';

it('smoke test renders', () => {
  render(<div>smoke</div>);
  expect(screen.getByText(/smoke/)).toBeInTheDocument();
});
