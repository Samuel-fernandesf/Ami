from extensions import db
from typing import Optional, List
from models import Inscricao

class InscricaoRepo:
    def create_inscricao(
        id_usuario: int,
        id_oportunidade: int,
        status_inscricao: str = 'pendente',
        data_aprovacao_recusa = None
    ) -> Optional[Inscricao]:

        # Verifica se o usuário já está inscrito na oportunidade
        inscricao_existente = InscricaoRepo.get_inscricao_by_usuario_oportunidade(id_usuario, id_oportunidade)
        if inscricao_existente:
            return None

        inscricao = Inscricao(
            id_usuario=id_usuario,
            id_oportunidade=id_oportunidade,
            status_inscricao=status_inscricao,
            data_aprovacao_recusa=data_aprovacao_recusa
        )

        db.session.add(inscricao)
        db.session.commit()
        return inscricao

    def get_inscricao_by_id(id_inscricao: int) -> Optional[Inscricao]:   
        return Inscricao.query.filter_by(id_inscricao=id_inscricao).first()

    def get_all_inscricoes() -> List[Inscricao]:
        return Inscricao.query.all()

    def get_inscricoes_by_usuario(id_usuario: int) -> List[Inscricao]:
        return Inscricao.query.filter_by(id_usuario=id_usuario).all()

    def get_inscricoes_by_oportunidade(id_oportunidade: int) -> List[Inscricao]: 
        return Inscricao.query.filter_by(id_oportunidade=id_oportunidade).all()

    def get_inscricao_by_usuario_oportunidade(id_usuario: int, id_oportunidade: int) -> Optional[Inscricao]:   
        return Inscricao.query.filter_by(id_usuario=id_usuario, id_oportunidade=id_oportunidade).first()

    def get_inscricoes_pendentes() -> List[Inscricao]:  
        return Inscricao.query.filter_by(status_inscricao='pendente').all()

    def update_inscricao(id_inscricao: int, data: dict) -> Optional[Inscricao]:
        inscricao = InscricaoRepo.get_inscricao_by_id(id_inscricao)
        if not inscricao:
            return None

        inscricao.update_from_dict(data)
        db.session.commit()
        return inscricao

    def delete_inscricao(id_inscricao: int) -> bool:
        inscricao = InscricaoRepo.get_inscricao_by_id(id_inscricao)
        if not inscricao:
            return False

        db.session.delete(inscricao)
        db.session.commit()
        return True
