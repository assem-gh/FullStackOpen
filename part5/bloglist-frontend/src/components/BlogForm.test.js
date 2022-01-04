import React, { Component } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('Test Blog form', () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  test('Blog form on submit call createBLog() with right details', () => {
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');
    const form = component.container.querySelector('form');

    fireEvent.change(title, {
      target: { value: 'Test blog' },
    });
    fireEvent.change(author, {
      target: { value: 'Test author' },
    });
    fireEvent.change(url, {
      target: { value: 'http://test.com' },
    });
    fireEvent.submit(form);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('Test blog');
    expect(createBlog.mock.calls[0][0].author).toBe('Test author');
    expect(createBlog.mock.calls[0][0].url).toBe('http://test.com');
  });
});
