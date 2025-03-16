# Spotify Redesign Project

This project is a conceptual redesign of the Spotify application, focusing on enhancing user experience with a modern, intuitive interface. The design features a sleek dark theme, streamlined navigation, and an optimized music player layout, crafted in Figma. The goal is to reimagine Spotify’s UI while maintaining its core functionality, making it more visually appealing and user-friendly.

## Tech Stack

- **Next.js**: A React framework for building the frontend with server-side rendering and static site generation.
- **Django**: A Python web framework used for the backend, handling logic, APIs, and database management.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **Libraries**:
  - **Zustand**: A lightweight state management library for React, providing a simple and scalable way to manage app state.
  - **shadcn/ui**: A collection of reusable, customizable UI components for building consistent and accessible interfaces in Next.js.
  - **Axios**: For making HTTP requests between the frontend and backend, simplifying API communication.
  - **TypeScript**: A superset of JavaScript that adds static typing, enhancing code reliability and developer experience in Next.js.
  - **Django REST Framework**: A powerful toolkit for building RESTful APIs in Django, enabling rapid development and serialization.
  - **coresheaders**: A Django middleware library for managing Cross-Origin Resource Sharing (CORS), ensuring secure API access.
  - **simple jwt**: A Django library for implementing JWT-based authentication, providing straightforward token management.
  - **pillow**: A Python imaging library used for handling image processing tasks, such as resizing or formatting, in the Django backend.## Installation

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Fialex1212/spotify-redesign.git
   cd spotify-redesign
   ```

2. **Server Setup (Django)**

- Navigate to the backend directory:

```bash
cd server/base
```

- Create and enter virtual environment:

```bash
python -m venv venv
.\venv\scripts\activate
```

- Install dependencies:

```bash
pip install -r requirements.txt
```

- Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

3. **Frontend Setup (Next.js)**

- Navigate to the backend directory:

```bash
cd server/base
```

- Create and enter virtual environment:

```bash
python -m venv venv
.\venv\scripts\activate
```

- Install dependencies:

```bash
pip install -r requirements.txt
```

- Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

## **Authors**

- [@Sviat](https://github.com/DFirenice)
- [@Aleks Seriakov](https://github.com/Fialex1212)
