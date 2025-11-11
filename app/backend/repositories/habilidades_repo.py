from extensions import db
from typing import Optional, List
from models import Habilidade
from repositories import UserRepo, OportunidadeRepo

class HabilidadeRepo:
    def create_habilidade(nome:str) -> Habilidade:
        hab = Habilidade(nome=nome)

        if HabilidadeRepo.habilidade_exists(nome):
            return None

        db.session.add(hab)
        db.session.commit()

        return hab
    
    def get_habilidade_by_id(id:int) -> Habilidade:
        return Habilidade.query.filter_by(id=id).first()
    
    def get_habilidade_by_name(name:str) -> Habilidade:
        return Habilidade.query.filter_by(nome=name).first()
    
    def get_all_habilidades() -> List[Habilidade]:
        return Habilidade.query.all()
    
    def habilidade_exists(name:str) -> bool:
        hab = HabilidadeRepo.get_habilidade_by_name(name=name)
        return hab is not None
    
    def update_habilidade(id:str, data:dict) -> Optional[Habilidade]:
        hab = HabilidadeRepo.get_habilidade_by_id(id=id)
        if not hab:
            return None

        data.pop("id", None)
        hab.update_from_dict(data)
        db.session.commit()
        return hab
    
    def delete_habilidade(id:str) -> Optional[Habilidade]:
        hab = HabilidadeRepo.get_habilidade_by_id(id=id)
        if not hab:
            return False

        db.session.delete(hab)
        db.session.commit()
        return True
    
    def get_habilidades_by_user(user_id: int) -> List[Habilidade]:
        return UserRepo.get_user_habilidades(user_id)
    
    def user_has_habilidade(user_id: int, habilidade_id: int) -> bool:
        habilidades = UserRepo.get_user_habilidades(user_id)
        habilidade = HabilidadeRepo.get_habilidade_by_id(habilidade_id)
        return habilidade in habilidades
    
    def get_habilidades_by_oportunidade(oportunidade_id: int) -> List[Habilidade]:
        return OportunidadeRepo.get_oportunidade_habilidades(oportunidade_id)
    
    def oportunidade_has_habilidade(oportunidade_id: int, habilidade_id: int) -> bool:
        habilidades = OportunidadeRepo.get_oportunidade_habilidades(oportunidade_id)
        habilidade = HabilidadeRepo.get_habilidade_by_id(habilidade_id)
        return habilidade in habilidades

