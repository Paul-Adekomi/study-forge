# StudyForge

StudyForge is a full-stack study assistant that helps users organize notes and turn them into flashcards with AI assistance. The app combines a FastAPI backend with a Next.js frontend to provide a clean study workflow for note management, authentication, and flashcard generation.

## Features

- User sign up and login
- JWT-based authentication
- Create, view, update, and delete notes
- AI-powered flashcard generation from note content
- Daily generation limits for AI usage
- User profile with avatar upload support
- Responsive dashboard and study interface

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite
- JWT authentication with `python-jose`
- Password hashing with `passlib` and `bcrypt`
- Groq API integration for flashcard generation
- Cloudinary for avatar image uploads

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

## Project Structure

```text
study-forge/
├── backend/
│   ├── auth_utils.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── schemas.py
│   └── myenv/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── DESIGN.md
│   └── README.md
├── .git/
└── README.md
```

## Prerequisites

Before running the app, make sure you have:

- Python 3.12+
- Node.js 20+
- npm
- A Groq API key
- Cloudinary credentials

## Backend Setup

1. Open a terminal in the `backend` directory.
2. Create and activate a virtual environment if needed:

```bash
cd backend
python3 -m venv myenv
source myenv/bin/activate
```

3. Install backend dependencies:

```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the `backend` directory with the following variables:

```env
JWT_SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. Start the API server:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The backend will run at:

- http://127.0.0.1:8000

## Frontend Setup

1. Open a terminal in the `frontend` directory.
2. Install dependencies:

```bash
cd frontend
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run at:

- http://localhost:3000

## How the App Works

1. Users sign up or log in.
2. They create and manage notes in the dashboard.
3. They can generate flashcards from a note using the AI endpoint.
4. Generated flashcards are stored and displayed in the flashcards view.
5. Users can manage their profile and avatar image.

## API Overview

### Authentication
- `POST /signup`
- `POST /login`
- `GET /me`

### Notes
- `POST /notes`
- `GET /notes`
- `GET /notes/{note_id}`
- `PUT /notes/{note_id}`
- `DELETE /notes/{note_id}`

### Flashcards
- `POST /notes/{note_id}/generate-flashcards`

### Profile
- `POST /me/avatar`

## Notes

- The project uses SQLite, so data is stored locally in `backend/app.db`.
- The backend includes a daily AI generation limit of 10 requests per user.
- The frontend connects to the backend on `127.0.0.1:8000`, so both services need to be running together during local development.

## License

This project is currently for personal or educational use and does not appear to include a formal project license yet.

## Contributing

This is a personal learning project, but improvements are welcome. If you plan to extend it, consider:

- adding tests for API routes
- adding better error handling
- improving flashcard review flows
- adding note categories or tags
- enhancing the dashboard analytics
