from extensions import db
from typing import Optional, List
from datetime import date
from models import Usuario
from datetime import datetime
import json

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
        #habilidades: Optional[str] = None,
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
            #habilidades=habilidades,
            foto_perfil=foto_perfil,
            tipo_usuario=tipo_usuario,
            conta_ativa=conta_ativa
        )

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
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return None

        data.pop("id", None)
        user.update_from_dict(data)
        db.session.commit()
        return user

    def delete_user(user_id: int) -> bool:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return False

        db.session.delete(user)
        db.session.commit()
        return True
