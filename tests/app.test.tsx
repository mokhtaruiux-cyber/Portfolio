import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';
import { siteContent } from '../content';

const renderWithRoute = (route: string) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
};

describe('App routing and landmarks', () => {
  it('renders the brand link to home', () => {
    renderWithRoute('/');
    const brandLink = screen.getByRole('link', { name: /mokhtar/i });
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('exposes a skip link to main content', () => {
    renderWithRoute('/');
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders the projects archive route', () => {
    renderWithRoute('/projects');
    const heading = screen.getByRole('heading', {
      name: new RegExp(siteContent.featuredWork.archive.title, 'i'),
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the blog index route', () => {
    renderWithRoute('/blog');
    const heading = screen.getByRole('heading', {
      name: new RegExp(siteContent.writing.index.title, 'i'),
    });
    expect(heading).toBeInTheDocument();
  });
});
