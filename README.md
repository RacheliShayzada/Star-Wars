# Movie App with Favorite Movies

This is a React application where users can browse a list of movies, view movie details, and mark their favorite movies. It uses `zustand` for state management and `localStorage` to persist user preferences, such as favorite movies and preferred categories.

## Features

- Display a list of movies.
- Add/remove movies to/from favorites.
- Movies persist their favorite status using `localStorage`.
- User preferences (favorite movies) are stored and retrieved from `localStorage` using `zustand` and `persist`.
- Filter movies based on preferred categories (optional feature).

## Tech Stack

- **React**: The front-end framework used for building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Zustand**: A state management library that stores global state such as user preferences.
- **LocalStorage**: To persist data (favorite movies) across page reloads.
- **CSS**: For styling the application.

## Setup and Installation

To set up and run the project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/movie-app.git
