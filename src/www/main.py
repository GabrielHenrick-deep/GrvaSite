import uvicorn
from fastapi import FastAPI, HTTPException, status
from fastapi_sqlalchemy import DBSessionMiddleware, db

from schema import Members as schemaMembers
from schema import Projects as schemaProjects 

from models import Members as ModelMembers
from models import Projects as ModelProjects
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from fastapi import Depends
from sqlalchemy.orm import Session

import os
from dotenv import load_dotenv

load_dotenv('.env')

app = FastAPI()
# Dependency to get the database session
def get_db():
    db_session = db.session
    try:
        yield db_session
    finally:
        db_session.close()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou especifique "http://localhost:3001"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB Session Middleware
app.add_middleware(DBSessionMiddleware, db_url=os.getenv('DATABASE_URL'))

@app.get("/")
async def root():
    return {"message": "Conectado com sucesso!"}

@app.post('/members/', response_model=schemaMembers)
async def members(member: schemaMembers):
    db_member = ModelMembers(cpfcnpj=member.cpfcnpj, name=member.name, category=member.category,
                             image=member.image, research=member.research, proficiencias=member.proficiencias,
                             email=member.email, phone=member.phone, education=member.education,
                             publication=member.publication, awards=member.awards, bio=member.bio,
                             linkedin=member.linkedin)
    db.session.add(db_member)
    db.session.commit()
    return db_member

@app.get('/members/')
async def members():
    members = db.session.query(ModelMembers).all()
    return members
#Put Member
@app.put('/members/{member_id}', response_model=schemaMembers)
async def update_member(member_id: int, member: schemaMembers, db: Session = Depends(get_db)):
    db_member = db.query(ModelMembers).filter(ModelMembers.id == member_id).first()

    if db_member is None:
        return {"error": "Member not found"}
    
    db_member.cpfcnpj = member.cpfcnpj
    db_member.name = member.name
    db_member.category = member.category
    db_member.image = member.image
    db_member.research = member.research
    db_member.proficiencias = member.proficiencias
    db_member.email = member.email
    db_member.phone = member.phone
    db_member.education = member.education
    db_member.publication = member.publication
    db_member.awards = member.awards
    db_member.bio = member.bio
    db_member.linkedin = member.linkedin

    db.commit()
    db.refresh(db_member)
    return db_member

@app.delete('/members/{member_id}')
async def delete_member(member_id: int, db: Session = Depends(get_db)):
    db_member = db.query(ModelMembers).filter(ModelMembers.id == member_id).first()

    if db_member is None:
        raise HTTPException(status_code=404, detail="Member not found")

    db.delete(db_member)
    db.commit()

#Post Project
@app.post('/projects/', response_model=schemaProjects)
async def projects(project: schemaProjects):
    db_project = ModelProjects(nome_project=project.nome_project, key_feature=project.key_feature,
                               image_url=project.image_url, descri=project.descri)
    db.session.add(db_project)
    db.session.commit()
    return db_project


@app.get('/projects/')
async def projects():
    projects = db.session.query(ModelProjects).all()
    return projects


@app.put('/projects/{project_id}', response_model=schemaProjects)
async def update_project(project_id: int, project: schemaProjects, db: Session = Depends(get_db)):
    db_project = db.query(ModelProjects).filter(ModelProjects.id == project_id).first()

    if db_project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    db_project.nome_project = project.nome_project
    db_project.key_feature = project.key_feature
    db_project.image_url = project.image_url
    db_project.descri = project.descri

    db.commit()
    db.refresh(db_project)
    return db_project


@app.delete('/projects/{project_id}')
async def delet_project(project_id: int, db: Session = Depends(get_db)):
    db_project = db.query(ModelProjects).filter(ModelProjects.id == project_id).first()

    if db_project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    db.delete(db_project)
    db.commit()
    return {"message": "Project deleted successfully"}
    
# Running the app
Port = int(os.getenv('PORT', 3001))  # Carregar a porta do .env ou usar 3001 por padrão
if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=Port)
