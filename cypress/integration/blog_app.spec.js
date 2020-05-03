describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: 'jeffrey',
            password: 'hello'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function () {
        cy.contains('bastard')
        cy.contains('Log In')
    })

    it('login form can be opened', function () {
        cy.contains('Log In').click()
    })

    it('user can log in', function () {

        cy.contains('Log In').click()
        cy.get('#loginUsername').type('jeffrey')
        cy.get('#loginPassword').type('hello')
        cy.get('#blogSubmitButton').click()

        cy.contains('jeffrey logged in')
    })

    it('login fails with wrong credentials', function () {
        cy.contains('Log In').click()
        cy.get('#loginUsername').type('poopers')
        cy.get('#loginPassword').type('hello')
        cy.get('#blogSubmitButton').click()
        cy.contains('wrong credentials')

    })

    describe('when user logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'jeffrey', password: 'hello' })
        })

        it('can add new blog', function () {
            cy.contains('Add new Blog').click()
            cy.get('#blogTitle').type('A new blog Title')
            cy.get('#blogAuthor').type('Some jerkface')
            cy.get('#blogUrl').type('http://www.somestpidblog.com')
            cy.get('#blogSave').click()

            cy.contains('New blog A new blog Title added!')
        })

        it('when a blog exists it can be liked', function () {
            cy.createBlog({
                title: 'The new blog is cool',
                author: 'Sissy mcPete',
                url: 'http://www.faces.com'
            })
            cy.contains('The new blog').contains('details').click()
            cy.contains('Likes: 0').get('.likeButton').click()
            cy.contains('Likes: 1')
        })

        it('when user created a blog they can delete it', function () {
            cy.createBlog({
                title: 'The new blog is cool',
                author: 'Sissy mcPete',
                url: 'http://www.faces.com',
                likes: 0
            })
            cy.contains('The new blog is cool').contains('details').click()
            cy.contains('Delete').click()

            cy.contains('Deleted blog The new blog is cool')
        })

        it.only('blogs are sorted by likes descending', function () {
            cy.createBlog({
                title: 'The new blog is cool',
                author: 'Sissy mcPete',
                url: 'http://www.faces.com',
                likes: 0
            })
            cy.createBlog({
                title: 'This blog has most likes',
                author: 'Sissy mcPete',
                url: 'http://www.faces.com',
                likes: 15
            })
            cy.createBlog({
                title: 'This blog has medium likes',
                author: 'Sissy mcPete',
                url: 'http://www.facesprain.com',
                likes: 9
            })
            cy.contains('This blog has most').contains('details').click()
            cy.contains('The new blog').contains('details').click()
            cy.contains('This blog has medium').contains('details').click()
            cy.get('.likesNumber').then(likes => {
                let allOK = true
                for (let i = 0; i < likes.length - 1; ++i) {
                    const current = parseInt(likes[i].innerHTML)
                    const next = parseInt(likes[i + 1].innerHTML)
                    if (current < next) {
                        allOK = false
                    }
                }
                return allOK
            }).should('equal', true)
        })

    })
})