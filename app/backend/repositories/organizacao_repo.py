from extensions import db
from typing import Optional, List
from datetime import datetime
from models import Organizacao

class OrganizacaoRepo:
    def create_organizacao(
        id_responsavel: int,
        razao_social: str,
        email_institucional: str,
        senha: str,
        cnpj: str,
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
            cnpj=cnpj,
            descricao=descricao,
            endereco_matriz=endereco_matriz,
            contato=contato,
            documento=documento
        )

        #check if email or cnpj is already in use
        if OrganizacaoRepo.get_organizacao_by_email(email_institucional) or OrganizacaoRepo.get_organizacao_by_cnpj(cnpj):
            return None

        db.session.add(organizacao)
        db.session.commit()
        
        return organizacao
    
    def get_organizacao_by_id(id) -> Optional[Organizacao]:
        return Organizacao.query.filter_by(id=id).first()
    
    def get_organizacao_by_email(email_institucional) -> Optional[Organizacao]:
        return Organizacao.query.filter_by(email_institucional=email_institucional).first()
    
    def get_organizacao_by_cnpj(cnpj) -> Optional[Organizacao]:
        return Organizacao.query.filter_by(cnpj=cnpj).first()

    def get_all_organizacoes() -> List[Organizacao]:
        return Organizacao.query.all()
    
    def update_organizacao(id: Organizacao, data: dict) -> Organizacao:
        organizacao = OrganizacaoRepo.get_organizacao_by_id(id)
        if not organizacao:
            return None
        
        organizacao.update_from_dict(data)
        db.session.commit()
        
        return organizacao
    
    def delete_organizacao(id) -> bool:
        organizacao = OrganizacaoRepo.get_organizacao_by_id(id)
        if not organizacao:
            return False
        
        db.session.delete(organizacao)
        db.session.commit()
        
        return True

    
