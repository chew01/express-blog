# Express Blog (back-end)
This is the back-end of my **REST API blog project** built using Express JS and Mongoose for me to try my hand at full-stack web development.

The other components of this project are a **public-facing blog** at [Express Blog Frontend](https://github.com/chew01/express-blog-frontend) as well as a **private editor page** at [Express Blog Editor](https://github.com/chew01/express-blog-editor), both of which are built with React and Tailwind CSS.

This blog API was built based on the **Model-View-Controller (MVC)** architectural pattern.

## Design considerations
From the start, the design of the API encompassed these models and schemas:
- **Post** (Title, Content, Publish Status, Hyperlink, Timestamp, Tags, Author) whereby Author = User schema.
- **Comment** (Title, Content, Commenter Name, Commenter Email, Post) whereby Post = Post schema.
- **Tag** (Name)
- **User** (Name, Email, Password) which was only used for post creation/administrator privileges.

After which, **Routes and Controllers** were created to serve various relevant data, such as but not limited to:
- Get all public posts sorted by date created
- Get all comments associated with a given post
- Get all tags in the blog

Furthermore, I also sought to secure routes using **JWT authentication** to restrict unregistered users from:
- Post/Tag/User create, update, delete operations
- Accessing unpublished posts

This was done using **PassportJS** (Local and JWT strategies) and **BcryptJS** for password encryption.

Lastly, **Views** were reserved for the front-end sites built with React and Tailwind CSS.

## Frameworks/Libraries
- ExpressJS and Mongoose
- PassportJS and its Local/JWT strategies, as well as BcryptJS for encryption
- Express Validator for server-side form validation
- Cookie Parser for parsing cookies containing JWT Token
- Dotenv for environment variables, thereby securing MongoDB URLs/API keys
