import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


let component


test('initially shows basic view but not extended', () => {
    const blog = {
        author: 'Boogers McFee',
        title: 'This is the blog that does not end',
        url: 'http://www.laughingtime.com',
        likes: 775,
        user: { username: 'Pepsiquo' }
    }

    const user = {
        username: 'Pepsiquo',
        id: 'QWERY123'
    }

    const likeHandler = jest.fn()

    component = render(
        <Blog blog={blog} user={user} addBlogLike={likeHandler} />
    )
    const basicDiv = component.container.querySelector('.basicContent')
    const extendedDiv = component.container.querySelector('.extendedContent')

    expect(basicDiv).not.toHaveStyle('display:none')
    expect(extendedDiv).toHaveStyle('display:none')
})

test('shows extended view when button clicked', () => {
    const blog = {
        author: 'Boogers McFee',
        title: 'This is the blog that does not end',
        url: 'http://www.laughingtime.com',
        likes: 775,
        user: { username: 'Pepsiquo' }
    }

    const user = {
        username: 'Pepsiquo',
        id: 'QWERY123'
    }

    const likeHandler = jest.fn()

    component = render(
        <Blog blog={blog} user={user} addBlogLike={likeHandler} />
    )
    const detailsButton = component.getByText('details')
    fireEvent.click(detailsButton)

    const extendedDiv = component.container.querySelector('.extendedContent')
    expect(extendedDiv).not.toHaveStyle('display:none')
})

test('like handler is called each time like button is pressed', () => {
    const blog = {
        author: 'Boogers McFee',
        title: 'This is the blog that does not end',
        url: 'http://www.laughingtime.com',
        likes: 775,
        user: { username: 'Pepsiquo' }
    }

    const user = {
        username: 'Pepsiquo',
        id: 'QWERY123'
    }

    const likeHandler = jest.fn()
    component = render(
        <Blog blog={blog} user={user} addBlogLike={likeHandler} />
    )

    const detailsButton = component.getByText('details')
    fireEvent.click(detailsButton)

    const likesToAdd = 3

    const likeButton = component.getByText('Like')
    for (let i = 0; i < likesToAdd; i++) {
        fireEvent.click(likeButton)
    }

    expect(likeHandler.mock.calls).toHaveLength(likesToAdd)
})
