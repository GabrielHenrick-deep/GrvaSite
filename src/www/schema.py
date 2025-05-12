from pydantic import BaseModel

class Members(BaseModel):
    cpfcnpj: str
    name: str
    category: str
    image: str
    research: str
    proficiencias: str
    email: str
    phone: str
    education: str
    publication: str
    awards: str
    bio: str
    linkedin: str

    class Config:
        orm_mode = True

class Projects(BaseModel):
    nome_project: str
    key_feature: str
    image_url: str
    descri: str

    class Config:
        orm_mode = True        