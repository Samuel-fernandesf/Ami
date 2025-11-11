from extensions import db
from typing import Optional, List
from models import Oportunidade
from models import OportunidadeHabilidade
from models import Habilidade

class OportunidadeRepo:
    def create_oportunidade(
        id_organizacao: int,
        titulo: str,
        descricao: str,
        local_endereco: str,
        comunidade: str,
        data_hora,
        duracao_horas: int,
        num_vagas: int,
        habilidades: Optional[List[int]] = None,
        requisitos: Optional[str] = None,
        tags: Optional[str] = None
    ) -> Optional[Oportunidade]:
        
        oportunidade = Oportunidade(
            organizaçao_id=id_organizacao,
            titulo=titulo,
            descricao=descricao,
            local_endereco=local_endereco,
            comunidade=comunidade,
            data_hora=data_hora,
            duracao_horas=duracao_horas,
            num_vagas=num_vagas,
            requisitos=requisitos,
            tags=tags
        )

        OportunidadeRepo.update_oportunidade_habilidades(oportunidade, habilidades or [])
        db.session.add(oportunidade)
        db.session.commit()
        return oportunidade

    def get_oportunidade_by_id(id: int) -> Optional[Oportunidade]:
        return Oportunidade.query.filter_by(id=id).first()

    def get_all_oportunidades() -> List[Oportunidade]:
        return Oportunidade.query.all()

    def get_oportunidades_by_organizacao(id_organizacao: int) -> List[Oportunidade]:
        return Oportunidade.query.filter_by(organizaçao_id=id_organizacao).all()

    def get_oportunidades_abertas() -> List[Oportunidade]:
        return Oportunidade.query.filter_by(status='aberto').all()

    def update_oportunidade(id: int, data: dict) -> Optional[Oportunidade]:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(id)

        if not oportunidade:
            return None
        
        # tu ja sabe pra que serve
        OportunidadeRepo.update_oportunidade_habilidades(oportunidade, data.get("habilidades", []))
        data.pop("habilidades", None)

        oportunidade.update_from_dict(data)
        db.session.commit()
        return oportunidade

    def delete_oportunidade(id: int) -> bool:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(id)
        if not oportunidade:
            return False

        db.session.delete(oportunidade)
        db.session.commit()
        return True
    
    # HABILIDADES RELATED METHODS
    
    def add_habilidade_to_oportunidade(oportunidade_id: int, habilidade_id: int) -> bool:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(oportunidade_id)
        if not oportunidade:
            return False
        
        existing = OportunidadeHabilidade.query.filter_by(id_oportunidade=oportunidade.id, id_habilidade=habilidade_id).first()
        if existing:
            return False

        oh = OportunidadeHabilidade(id_oportunidade=oportunidade.id, id_habilidade=habilidade_id)
        db.session.add(oh)
        db.session.commit()
        return True
    
    def remove_habilidade_from_oportunidade(oportunidade_id: int, habilidade_id: int) -> bool:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(oportunidade_id)
        if not oportunidade:
            return False
        existing = OportunidadeHabilidade.query.filter_by(id_oportunidade=oportunidade.id, id_habilidade=habilidade_id).first()
        if not existing:
            return False

        db.session.delete(existing)
        db.session.commit()
        return True
    
    def update_oportunidade_habilidades(oportunidade_id: int, habilidade_ids: List[int]) -> None:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(oportunidade_id)
        if not oportunidade:
            return False
        current_habilidades = OportunidadeRepo.get_oportunidade_habilidades(oportunidade)
        current_habilidade_ids = {oh.id_habilidade for oh in current_habilidades}

        # Add new habilidades
        for hab_id in habilidade_ids:
            if hab_id not in current_habilidade_ids:
                OportunidadeRepo.add_habilidade_to_oportunidade(oportunidade, hab_id)

        # Remove old habilidades
        for oh in current_habilidades:
            if oh.id_habilidade not in habilidade_ids:
                OportunidadeRepo.remove_habilidade_from_oportunidade(oportunidade, oh.id_habilidade)
    
    def get_oportunidade_habilidade_by_id(oportunidade_id: str, habilidade_id: int) -> Optional[int]:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(oportunidade_id)
        if not oportunidade:
            return False
        
        existing : OportunidadeHabilidade = OportunidadeHabilidade.query.filter_by(id_oportunidade=oportunidade.id, id_habilidade=habilidade_id).first()
        if not existing:
            return None

        return existing.id_habilidade
    
    def get_oportunidade_habilidade_by_name(oportunidade_id: int, habilidade_name: str) -> Optional[OportunidadeHabilidade]:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(oportunidade_id)
        if not oportunidade:
            return False
        
        hab = Habilidade.query.filter_by(nome=habilidade_name).first()
        if not hab:
            return None

        existing : OportunidadeHabilidade = OportunidadeHabilidade.query.filter_by(id_oportunidade=oportunidade.id, id_habilidade=hab.id).first()
        if not existing:
            return None

        return existing.id_habilidade
    
    def get_oportunidade_habilidades(oportunidade_id: int) -> List[OportunidadeHabilidade]:
        oportunidade = OportunidadeRepo.get_oportunidade_by_id(oportunidade_id)
        if not oportunidade:
            return []
        
        return OportunidadeHabilidade.query.filter_by(id_oportunidade=oportunidade.id).all()
    

