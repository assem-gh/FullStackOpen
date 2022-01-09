import React, { Component } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('Test Blog', () => {
  const blog = {
    id: '123456789',
    title: 'Test',
    author: 'John doe',
    url: 'http://Test.com',
    likes: '7',
    user: {
      username: 'super user',
      name: 'super',
    },
  };

  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} userName="super user" updateBlog={mockHandler} />
    );
  });

  test('renders only Blog  title and Author by default', () => {
    expect(component.container).toHaveTextContent('Test');
    expect(component.container).toHaveTextContent('John doe');
    expect(component.container).not.toHaveTextContent('http://Test.com');
    expect(component.container).not.toHaveTextContent(7);
    const div = component.container.querySelector('.blog-container');
    expect(div).toBeDefined();
    expect(div).toHaveStyle(' border: 1px solid black');
  });

  test('Show Blog details when view button clicked', () => {
    const viewBtn = component.getByText('view');
    expect(viewBtn).toBeDefined();
    fireEvent.click(viewBtn);
    expect(component.container).toHaveTextContent('http://Test.com');
    expect(component.container).toHaveTextContent(7);
  });

  test('EventHandler called twice when clicked twice', () => {
    const viewBtn = component.getByText('view');
    fireEvent.click(viewBtn);
    const likeBtn = component.getByText('like');
    expect(likeBtn).toBeDefined();
    fireEvent.click(likeBtn);
    fireEvent.click(likeBtn);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
