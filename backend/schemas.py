from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=20)
    email: str = Field(...)
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    username: str = Field(...)
    password: str = Field(...)


class NoteCreate(BaseModel):
    title: str = Field(..., min_length=1)
    content: str = Field(..., min_length=1)


class FlashCard(BaseModel):
    question: str
    answer: str


class FlashCardResponse(BaseModel):
    flashcards: list[FlashCard]
