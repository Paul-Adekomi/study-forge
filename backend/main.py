from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session


from database import engine, Base, get_db
from schemas import UserCreate, UserLogin, NoteCreate, FlashCard, FlashCardResponse
from auth_utils import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)
import models
import os
import json

from groq import AsyncGroq

client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = (
        db.query(models.User).filter(models.User.username == user.username).first()
    )
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")

    existing_email = (
        db.query(models.User).filter(models.User.email == user.email).first()
    )
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hash_password(user.password),
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "username": new_user.username}


@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    existing_user = (
        db.query(models.User).filter(models.User.username == user.username)
    ).first()

    if not existing_user or not verify_password(
        user.password, existing_user.hashed_password
    ):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": existing_user.username})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/me")
def me(current_user: models.User = Depends(get_current_user)):
    return {
        "username": current_user.username,
        "email": current_user.email,
        "daily_generations": current_user.daily_generations,
        "avatar_url": current_user.avatar_url,
    }


@app.post("/notes")
def create_note(
    note: NoteCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    new_note = models.Note(
        title=note.title,
        content=note.content,
        owner_id=current_user.id,
        id=note.id,
        created_at=note.created_at,
    )
    db.add(new_note)
    db.commit()
    db.refresh(new_note)

    return {
        "id": new_note.id,
        "title": new_note.title,
        "content": new_note.content,
        "created_at": new_note.created_at,
        "owner_id": new_note.owner_id,
    }


@app.get("/notes")
def get_notes(
    current_note: models.User = Depends(get_current_user), db: Session = Depends(get_db)
):
    notes = db.query(models.Note).filter(models.Note.owner_id == current_note.id).all()
    return notes


@app.get("/notes/{note_id}")
def get_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    note = (
        db.query(models.Note)
        .filter(models.Note.id == note_id, models.Note.owner_id == current_user.id)
        .first()
    )

    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")

    return note


@app.delete("/notes/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):

    note = (
        db.query(models.Note)
        .filter(models.Note.id == note_id, models.Note.owner_id == current_user.id)
        .first()
    )

    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()

    return {"detail": "Note deleted"}


@app.put("/notes/{note_id}")
def update_note(
    note: NoteCreate,
    note_id: int,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_note = (
        db.query(models.Note)
        .filter(models.Note.id == note_id, models.Note.owner_id == current_user.id)
        .first()
    )

    if existing_note is None:
        raise HTTPException(status_code=404, detail="Note not found")

    existing_note.title = note.title
    existing_note.content = note.content
    db.commit()
    db.refresh(existing_note)

    return existing_note


DAILY_LIMIT = 10


@app.post("/notes/{note_id}/generate-flashcards")
async def generate_flashcards(
    note_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):

    if current_user.daily_generations >= DAILY_LIMIT:
        raise HTTPException(status_code=429, detail="Daily generation limit reached")
    note = (
        db.query(models.Note)
        .filter(models.Note.id == note_id, models.Note.owner_id == current_user.id)
        .first()
    )

    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")

    prompt = (
        f"Generate 5 flashcards (question and answer pairs) from this text. "
        f"Respond ONLY with valid JSON in this exact format: "
        f'{{"flashcards": [{{"question": "...", "answer": "..."}}]}}\n\n'
        f"{note.content}"
    )

    response = await client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )
    result = json.loads(response.choices[0].message.content)

    db.query(models.User).filter(models.User.id == current_user.id).update(
        {models.User.daily_generations: models.User.daily_generations + 1}
    )
    db.commit()

    return result


import cloudinary
import cloudinary.uploader
from fastapi import UploadFile, File

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
)


@app.post("/me/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    result = cloudinary.uploader.upload(file.file)
    current_user.avatar_url = result["secure_url"]
    db.commit()
    db.refresh(current_user)

    return {"avatar_url": current_user.avatar_url}
