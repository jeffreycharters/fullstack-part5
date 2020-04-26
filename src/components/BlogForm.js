import React from 'react'

const NoteForm = ({ addBlog, newTitle, handleTitleChange, newUrl, handleUrlChange, newAuthor, handleAuthorChange }) => (
    <form onSubmit={addBlog}>
        Title: <input
            value={newTitle}
            onChange={handleTitleChange}
        />

        <br />
        url <input
            value={newUrl}
            onChange={handleUrlChange}
        />
        <br />
        <button type="submit">save</button>
    </form>
)

export default NoteForm