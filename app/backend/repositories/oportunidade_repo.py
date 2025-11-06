from extensions import db
from typing import Optional, List
from datetime import datetime
from models import Oportunidade

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
