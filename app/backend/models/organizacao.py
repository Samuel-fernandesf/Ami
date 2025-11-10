from extensions import db
from . import StatusOrganizacao

class Organizacao(db.Model):
    __tablename__ = 'organizacao'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_responsavel = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    razao_social = db.Column(db.String(1024), nullable=False)
    email_institucional = db.Column(db.String(120), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    cnpj = db.Column(db.String(14), unique=True, nullable=False)
    descricao = db.Column(db.String(2048), nullable=True)
    endereco_matriz = db.Column(db.String(255), nullable=False)
    contato = db.Column(db.String(11), nullable=False)
    documento = db.Column(db.String(255), nullable=True)
    criado_em = db.Column(db.DateTime, default=db.func.current_timestamp())
    aprovada = db.Column(db.Enum(StatusOrganizacao), default=StatusOrganizacao.pendente, nullable=False)

    #RELACIONAMENTOS
    responsavel = db.relationship('Usuario', back_populates='organizacoes_responsaveis', lazy='select')
    oportunidades = db.relationship('Oportunidade', back_populates='organizacao', lazy='dynamic', cascade='all, delete-orphan')

    def __init__(self, id_responsavel, razao_social, email_institucional, senha, cnpj, descricao, endereco_matriz, contato, documento=None, aprovada=StatusOrganizacao.pendente):
        self.id_responsavel = id_responsavel
        self.razao_social = razao_social
        self.email_institucional = email_institucional
        self.senha = senha
        self.cnpj = cnpj
        self.descricao = descricao
        self.endereco_matriz = endereco_matriz
        self.contato = contato
        self.documento = documento
        self.aprovada = aprovada

    def __repr__(self):
        return f'<Organizacao {self.razao_social} - {self.email_institucional}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_responsavel': self.id_responsavel,
            'razao_social': self.razao_social,
            'email_institucional': self.email_institucional,
            'cnpj': self.cnpj,
            'descricao': self.descricao,
            'endereco_matriz': self.endereco_matriz,
            'contato': self.contato,
            'documento': self.documento if self.documento else None,
            'criado_em': self.criado_em.isoformat() if self.criado_em else None,
            'aprovada': self.aprovada if self.aprovada else StatusOrganizacao.pendente
        }
    
    def update_from_dict(self, data):
        for field in ['id_responsavel', 'razao_social', 'email_institucional', 'senha', 'cnpj', 'descricao', 'endereco_matriz', 'contato', 'documento', 'aprovada']:
            if field in data:
                setattr(self, field, data[field])
