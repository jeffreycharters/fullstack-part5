import React from 'react'

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
    <form onSubmit={handleLogin}>
        <div>username &nbsp;
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>

        <div>password &nbsp;
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
    </form>
)

export default LoginForm