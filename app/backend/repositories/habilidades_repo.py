from extensions import db
from typing import Optional, List
from datetime import date
from models import Habilidade
import json

class HabilidadeRepo:
 
    def create_habilidade(nome:str) -> Habilidade:
        hab = Habilidade(nome=nome)

        if HabilidadeRepo.habilidade_exists(nome):
            return None

        db.session.add(hab)
        db.session.commit()

        return hab
    
    def get_habilidade_by_id(habilidade_id:int) -> Habilidade:
        return Habilidade.query.filter_by(id=habilidade_id).first()
    
    def get_habilidade_by_name(name:str) -> Habilidade:
        return Habilidade.query.filter_by(nome=name).first()
    
    def get_all_habilidades() -> List[Habilidade]:
        return Habilidade.query.all()
    
    def habilidade_exists(name:str) -> bool:
        hab = HabilidadeRepo.get_habilidade_by_name(name=name)
        return hab is not None
    
    def update_habilidade(habilidade_id:str, data:dict) -> Optional[Habilidade]:
        hab = HabilidadeRepo.get_habilidade_by_id(habilidade_id=habilidade_id)
        if not hab:
            return None

        data.pop("id", None)
        hab.update_from_dict(data)
        db.session.commit()
        return hab
    
    def delete_habilidade(habilidade_id:str) -> Optional[Habilidade]:
        hab = HabilidadeRepo.get_habilidade_by_id(habilidade_id=habilidade_id)
        if not hab:
            return False

        db.session.delete(hab)
        db.session.commit()
        return True
    
