# Notes App
This is a simple notes management app built using React and Supabase. The app allows users to create, update, and manage notes.

## Technologies Used

- **React**: Frontend framework
- **Supabase**: Backend-as-a-service for authentication and database management
- **TailwindCSS**: Utility-first CSS framework for styling

## Clone the Repository 
```
git clone https://github.com/nuno24/notes_app.git
```

## Install the dependencies
Once in the project folder, run:
```
npm install
```

# Create a .env file and add the environment variables:

<p align="center">
    <img src="/src/assets/.envimg.png" alt=".env"/>
</p>

# Run the project
```
npm run dev
```

# Usage Guide

## Authentication
<details>
<summary>Login</summary>

- Enter your credentials to login, or create an account if you haven't registered yet.

<p align="center">
  <img src="/src/assets/login.png" alt="Login" />
</p>

</details>

<details>
<summary>Logout</summary>

- Click logout to get redirected to `/login`

<p align="center">
  <img src="/src/assets/logout.png" alt="Logout" />
</p>

</details>


## CREATE

- Click on "New Note" to create a new note.

<p align="center">
  <img src="/src/assets/newnote.png" alt="Create Note" />
</p>

## UPDATE

- Click on an existing note to update its content.

<p align="center">
  <img src="/src/assets/editnote.png" alt="Update Note" />
</p>

## MANAGE

- Click on the note to view, edit or delete it.

<p align="center">
  <img src="/src/assets/managenotes.png" alt="Manage Notes" />
</p>