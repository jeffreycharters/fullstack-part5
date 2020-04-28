import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> sends correct details to createHandler', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, { target: { value: 'something short and sweet' } })
    fireEvent.change(author, { target: { value: 'sam mcgam' } })
    fireEvent.change(url, { target: { value: 'http://www.vietnamazon.com' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('something short and sweet')
    expect(createBlog.mock.calls[0][0].author).toBe('sam mcgam')
    expect(createBlog.mock.calls[0][0].url).toBe('http://www.vietnamazon.com')
})