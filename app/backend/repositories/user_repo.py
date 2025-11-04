from extensions import db
from typing import Optional, List
from datetime import datetime
from models.usuario import Usuario as User


class UserRepo:

    @staticmethod
    def create_user(
        nome_completo : str,
        email : str,
        senha : str,
        cidade: str,
        bairro: str,
        telefone: str,
        data_nascimento: str,
        criado_em : datetime = datetime.now(datetime.timezone.utc),
        conta_ativa: bool = True,

        tipo_usuario: str = "regular",

        habilidades: Optional[List[str]] = None,
        foto_perfil_PATH: Optional[str] = None    
    ) -> Optional[User]:
        
        user = User(
            nome_completo=nome_completo,
            email=email,
            senha=senha,
            cidade=cidade,
            bairro=bairro,
            telefone=telefone,
            data_nascimento=data_nascimento,
            criado_em=criado_em,
            conta_ativa=conta_ativa,
            tipo_usuario=tipo_usuario,
            habilidades=habilidades,
            foto_perfil_PATH=foto_perfil_PATH
        )

        #check if user email is already in use
        if UserRepo.get_user_by_email(email):
            return None

        db.session.add(user)
        db.session.commit()
        
        return user
    
    @staticmethod
    def get_user_by_id(user_id) -> Optional[User]:
        return User.query.filter_by(id=user_id).first()
    
    @staticmethod
    def get_user_by_email(email) -> Optional[User]:
        return User.query.filter_by(email=email).first()
    
    @staticmethod
    def get_user_by_telefone(telefone) -> Optional[User]:
        return User.query.filter_by(telefone=telefone).first()
    
    @staticmethod
    def get_all_users() -> List[User]:
        return User.query.all()
    
    @staticmethod
    def get_all_admins() -> List[User]:
        return User.query.filter_by(tipo_usuario="admin").all()
    
    @staticmethod
    def is_user_admin(user_id):
        return User.query.filter_by(id=user_id, tipo_usuario="admin").first() is not None
    
    @staticmethod
    def update_user(user_id, data) -> Optional[User]:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return None

        data.pop("id", None)
        user.update_from_dict(data)
        
        return user
    
    @staticmethod
    def delete_user(user_id) -> bool:
        user = UserRepo.get_user_by_id(user_id)
        if not user:
            return False

        db.session.delete(user)
        db.session.commit()
        return True
