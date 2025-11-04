from extensions import db
from typing import Optional, List
from datetime import datetime
from models.organizaçao import Organizacao

class OrganizacaoRepo:
    @staticmethod
    def create_organizacao(
        id_responsavel: int,
        razao_social: str,
        email_institucional: str,
        senha: str,
        cnpj_id: str,
        descricao: str,
        endereco_matriz: str,
        contato: str,
        documento: Optional[str] = None
    ) -> Optional[Organizacao]:
        
        organizacao = Organizacao(
            id_responsavel=id_responsavel,
            razao_social=razao_social,
            email_institucional=email_institucional,
            senha=senha,
            cnpj_id=cnpj_id,
            descricao=descricao,
            endereco_matriz=endereco_matriz,
            contato=contato,
            documento=documento
        )

        #check if email or cnpj_id is already in use
        if OrganizacaoRepo.get_organizacao_by_email(email_institucional) or OrganizacaoRepo.get_organizacao_by_cnpj(cnpj_id):
            return None

        db.session.add(organizacao)
        db.session.commit()
        
        return organizacao
    
    @staticmethod
    def get_organizacao_by_id(id_organizacao) -> Optional[Organizacao]:
        return Organizacao.query.filter_by(id_organizacao=id_organizacao).first()
    
    @staticmethod
    def get_organizacao_by_email(email_institucional) -> Optional[Organizacao]:
        return Organizacao.query.filter_by(email_institucional=email_institucional).first()
    
    @staticmethod
    def get_organizacao_by_cnpj(cnpj_id) -> Optional[Organizacao]:
        return Organizacao.query.filter_by(cnpj_id=cnpj_id).first()

    @staticmethod
    def get_all_organizacoes() -> List[Organizacao]:
        return Organizacao.query.all()
    
    @staticmethod
    def update_organizacao(id_organizacao: Organizacao, data: dict) -> Organizacao:
        organizacao = OrganizacaoRepo.get_organizacao_by_id(id_organizacao)
        if not organizacao:
            return None
        
        organizacao.update_from_dict(data)
        db.session.commit()
        
        return organizacao
    
    @staticmethod
    def delete_organizacao(id_organizacao) -> bool:
        organizacao = OrganizacaoRepo.get_organizacao_by_id(id_organizacao)
        if not organizacao:
            return False
        
        db.session.delete(organizacao)
        db.session.commit()
        
        return True

    
