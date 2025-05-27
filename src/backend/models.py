from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

BASE = declarative_base()

class Members(BASE):
    __tablename__ = 'members'
    id = Column(Integer, primary_key=True, index=True)
    cpfcnpj = Column(String)
    name = Column(String (100))
    category = Column(String (50))
    image = Column(String)
    research = Column(String)
    proficiencias = Column(String)
    email = Column(String)
    phone = Column(String)
    education = Column(String)
    publication = Column(String)
    awards = Column(String)
    bio = Column(String)
    linkedin = Column(String)



class Projects(BASE):
    __tablename__ = 'projects'
    id = Column(Integer, primary_key=True, index=True)
    nome_project = Column(String)
    key_feature = Column(String)
    image_url = Column(String)
    descri = Column(String)


    
class User(BASE):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), nullable=False)
    email = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)


    

