from extensions import db
from typing import Optional, List
from datetime import date
from models import Usuario
from models import VoluntarioHabilidade
from models import Habilidade

class UserRepo:
    def create_user(
        nome_completo: str,
        cpf: str,
        email: str,
        senha: str,
        cidade: str,
        bairro: str,
        telefone: str,
        data_nasc: date,
        habilidades: Optional[List[int]] = None,
        foto_perfil: Optional[str] = None,
        tipo_usuario: str = "regular",
        conta_ativa: bool = True
    ) -> Optional[Usuario]:
        # Verifica duplicatas
        if UserRepo.get_user_by_email(email) or UserRepo.get_user_by_cpf(cpf):
            return None
        
        user = Usuario(
            nome_completo=nome_completo,
            cpf=cpf,
            email=email,
            senha=senha,
            cidade=cidade,
            bairro=bairro,
            telefone=telefone,
            data_nasc=data_nasc,
            foto_perfil=foto_perfil,
            tipo_usuario=tipo_usuario,
            conta_ativa=conta_ativa
        )

        UserRepo.update_habilidades(user.id, habilidades or [])
        db.session.add(user)
        db.session.commit()
        return user

    def get_user_by_id(user_id: int) -> Optional[Usuario]:
        return Usuario.query.filter_by(id=user_id).first()

    def get_user_by_email(email: str) -> Optional[Usuario]:
        return Usuario.query.filter_by(email=email).first()

    def get_user_by_cpf(cpf: str) -> Optional[Usuario]:
        return Usuario.query.filter_by(cpf=cpf).first()

    def get_user_by_telefone(telefone: str) -> Optional[Usuario]:
        return Usuario.query.filter_by(telefone=telefone).first()

    def get_all_users() -> List[Usuario]:
        try:
            return Usuario.query.all()
        except Exception as e:
            return []

    def get_all_admins() -> List[Usuario]:
        return Usuario.query.filter_by(tipo_usuario="admin").all()

    def is_user_admin(user_id: int) -> bool:
        return Usuario.query.filter_by(id=user_id, tipo_usuario="admin").first() is not None

    def update_user(user_id: int, data: dict) -> Optional[Usuario]:
        user : Usuario = UserRepo.get_user_by_id(user_id)
        if not user:
            return 
        
        # safely updates user habilidades        
        UserRepo.update_habilidades(user_id, data.get("habilidades", []))
        data.pop("habilidades", None)

        data.pop("id", None)
        user.update_from_dict(data)
        db.session.commit()
        return user

    def delete_user(user_id: int) -> bool:
        user : Usuario = UserRepo.get_user_by_id(user_id)
        if not user:
            return False

        db.session.delete(user)
        db.session.commit()
        return True
    

    # HABILIDADES RELATED METHODS
    def add_habilidade_to_user(user_id: int, habilidade_id: int) -> bool:
        user = UserRepo.get_user_by_id(user_id)

        if not user:
            return False
        
        existing = VoluntarioHabilidade.query.filter_by(id_usuario=user.id, id_habilidade=habilidade_id).first()
        if existing:
            return False

        vh = VoluntarioHabilidade(id_usuario=user.id, id_habilidade=habilidade_id)
        db.session.add(vh)
        db.session.commit()
        return True
    
    def update_habilidades(user_id: int, habilidade_ids: List[int]) -> bool:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return False

        # Remove habilidades not in the new list
        existing_habilidades : List[VoluntarioHabilidade] = VoluntarioHabilidade.query.filter_by(id_usuario=user.id).all()
        for eh in existing_habilidades:
            if eh.id_habilidade not in habilidade_ids:
                db.session.delete(eh)

        # Add new habilidades
        for hid in habilidade_ids:
            existing : List[VoluntarioHabilidade] = VoluntarioHabilidade.query.filter_by(id_usuario=user.id, id_habilidade=hid).first()
            if not existing:
                vh = VoluntarioHabilidade(id_usuario=user.id, id_habilidade=hid)
                db.session.add(vh)

        db.session.commit()
        return True
    
    def remove_habilidade_from_user(user_id: int, habilidade_id: int) -> bool:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return False
        
        existing = VoluntarioHabilidade.query.filter_by(id_usuario=user.id, id_habilidade=habilidade_id).first()
        if not existing:
            return False

        db.session.delete(existing)
        db.session.commit()
        return True
    
    def get_user_habilidade_by_id(user_id: int, habilidade_id: int) -> Optional[int]:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return None
        
        existing : VoluntarioHabilidade = VoluntarioHabilidade.query.filter_by(id_usuario=user.id, id_habilidade=habilidade_id).first()
        if not existing:
            return None

        return existing.id_habilidade
    
    def get_user_habilidade_by_name(user_id: int, habilidade_name: str) -> Optional[int]:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return None
        
        hab = Habilidade.query.filter_by(nome=habilidade_name).first()
        if not hab:
            return None

        existing : VoluntarioHabilidade = VoluntarioHabilidade.query.filter_by(id_usuario=user.id, id_habilidade=hab.id).first()
        if not existing:
            return None

        return existing.id_habilidade
    
    def get_user_habilidades(user_id: int) -> List[int]:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return []
        
        habilidades : Optional[List[VoluntarioHabilidade]] = VoluntarioHabilidade.query.filter_by(id_usuario=user.id).all()
        return [hab.id_habilidade for hab in habilidades]
    
