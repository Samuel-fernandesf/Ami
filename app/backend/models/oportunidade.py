from extensions import db
from .enums import StatusOportunidades

class Oportunidade(db.Model):
    __tablename__ = 'oportunidade'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_organizacao = db.Column(db.Integer, db.ForeignKey('organizacao.id'), nullable=False)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.String(2048), nullable=False)
    local_endereco = db.Column(db.String(255), nullable=False)
    comunidade = db.Column(db.String(255), nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False)
    duracao_horas = db.Column(db.Integer, nullable=False)
    num_vagas = db.Column(db.Integer, nullable=False)
    requisitos = db.Column(db.String(1024), nullable=True)

    #OPÇÃO CORRETA SERIA RETIRAR ESSE COLUNA E COLOCA-LA COMO TABELA SEPARADA
    tags = db.Column(db.String(512), nullable=True)
    status = db.Column(db.Enum(StatusOportunidades), default=StatusOportunidades.aberta, nullable=False)
    criado_em = db.Column(db.DateTime, default=db.func.current_timestamp())

    #RELACIONAMENTOS
    organizacao = db.relationship('Organizacao', back_populates='organizacao', lazy='select')
    requisitos = db.relationship('OportunidadeHabilidade', back_populates='oportunidade', lazy='dynamic', cascade='all, delete-orphan')
    inscricoes = db.relationship('Inscricao', back_populates='oportunidade', lazy='dynamic', cascade='all, delete-orphan')


    def __init__(self, id_organizacao, titulo, descricao, local_endereco, comunidade, data_hora, duracao_horas, num_vagas, requisitos=None, tags=None):
        self.id_organizacao = id_organizacao
        self.titulo = titulo
        self.descricao = descricao
        self.local_endereco = local_endereco
        self.comunidade = comunidade
        self.data_hora = data_hora
        self.duracao_horas = duracao_horas
        self.num_vagas = num_vagas
        self.requisitos = requisitos
        self.tags = tags

    def __repr__(self):
        return f'<Oportunidade {self.titulo} - Org {self.id_organizacao}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_organizacao': self.id_organizacao,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'local_endereco': self.local_endereco,
            'comunidade': self.comunidade,
            'data_hora': self.data_hora.isoformat() if self.data_hora else None,
            'duracao_horas': self.duracao_horas,
            'num_vagas': self.num_vagas,
            'requisitos': self.requisitos,
            'tags': self.tags,
            'status': self.status,
            'criado_em': self.criado_em.isoformat() if self.criado_em else None
        }

    def update_from_dict(self, data):
        for field in ['id_organizacao', 'titulo', 'descricao', 'local_endereco', 'comunidade', 'data_hora', 'duracao_horas', 'num_vagas', 'requisitos', 'tags', 'status']:
            if field in data:
                setattr(self, field, data[field])
