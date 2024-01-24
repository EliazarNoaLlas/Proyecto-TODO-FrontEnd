import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe("<Todo App/>", () => {
  test('renders App component', () => {
    render(<App />);
    const titleElement = screen.getByText(/Todo App/i);
    expect(titleElement).toBeTruthy();
  });
});
