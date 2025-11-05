from extensions import db
from datetime import date

class Usuario(db.Model):
    __tablename__ = 'usuario'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome_completo = db.Column(db.String(100), nullable=False)
    cpf = db.Column(db.String(11), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    cidade = db.Column(db.String(100), nullable=False)
    bairro = db.Column(db.String(255), nullable=False)
    telefone = db.Column(db.String(11), nullable=False)
    habilidades = db.Column(db.String(1024), nullable=True)
    data_nasc = db.Column(db.Date, nullable=False)
    foto_perfil = db.Column(db.String(255), nullable=True)
    tipo_usuario = db.Column(db.String(50), nullable=False, default="regular")
    criado_em = db.Column(db.DateTime, default=db.func.current_timestamp())
    conta_ativa = db.Column(db.Boolean, default=True)

    def __repr__(self):
        return f'<Usuario {self.nome_completo} - {self.email}>'

    def __init__(
        self,
        nome_completo,
        cpf,
        email,
        senha,
        cidade,
        bairro,
        telefone,
        data_nasc,
        habilidades=None,
        foto_perfil=None,
        tipo_usuario="regular",
        conta_ativa=True
    ):
        self.nome_completo = nome_completo
        self.cpf = cpf
        self.email = email
        self.senha = senha
        self.cidade = cidade
        self.bairro = bairro
        self.telefone = telefone
        self.habilidades = habilidades
        self.data_nasc = data_nasc
        self.foto_perfil = foto_perfil
        self.tipo_usuario = tipo_usuario
        self.conta_ativa = conta_ativa

    def to_dict(self):
        return {
            'id': self.id,
            'nome_completo': self.nome_completo,
            'cpf': self.cpf,
            'email': self.email,
            'cidade': self.cidade,
            'bairro': self.bairro,
            'telefone': self.telefone,
            'habilidades': self.habilidades,
            'data_nasc': self.data_nasc.isoformat(),
            'foto_perfil': self.foto_perfil,
            'tipo_usuario': self.tipo_usuario,
            'criado_em': self.criado_em.isoformat(),
            'conta_ativa': self.conta_ativa
        }

    def update_from_dict(self, data):
        for field in [
            'nome_completo', 'cpf', 'email', 'senha', 'cidade', 'bairro', 'telefone',
            'habilidades', 'data_nasc', 'foto_perfil', 'tipo_usuario', 'conta_ativa'
        ]:
            if field in data:
                setattr(self, field, data[field])
