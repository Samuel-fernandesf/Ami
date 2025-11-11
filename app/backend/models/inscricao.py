from extensions import db
from .enums import StatusInscricao

class Inscricao(db.Model):
    __tablename__ = 'inscricao'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_oportunidade = db.Column(db.Integer, db.ForeignKey('oportunidade.id'), nullable=False)
    data_inscricao = db.Column(db.DateTime, default=db.func.current_timestamp())
    status_inscricao = db.Column(db.Enum(StatusInscricao), default=StatusInscricao.pendente, nullable=False)
    data_aprovacao_recusa = db.Column(db.DateTime, nullable=True)

    #RELACIONAMENTOS
    voluntario = db.relationship('Usuario', back_populates='inscricoes', lazy='select')
    oportunidade = db.relationship('Oportunidade', back_populates='inscricoes', lazy='select')
    registro_presenca = db.relationship('RegistroPresenca', back_populates='inscricao', uselist=False, lazy='joined', cascade='all, delete-orphan')

    def __init__(self, id_usuario, id_oportunidade, status_inscricao='pendente', data_aprovacao_recusa=None):
        self.id_usuario = id_usuario
        self.id_oportunidade = id_oportunidade
        self.status_inscricao = status_inscricao
        self.data_aprovacao_recusa = data_aprovacao_recusa

    def __repr__(self):
        return f'<Inscricao Usuario {self.id_usuario} - Oportunidade {self.id_oportunidade}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'id_oportunidade': self.id_oportunidade,
            'data_inscricao': self.data_inscricao.isoformat() if self.data_inscricao else None,
            'status_inscricao': self.status_inscricao if self.status_inscricao else StatusInscricao.pendente,
            'data_aprovacao_recusa': self.data_aprovacao_recusa.isoformat() if self.data_aprovacao_recusa else None
        }

    def update_from_dict(self, data):
        for field in ['id_usuario', 'id_oportunidade', 'status_inscricao', 'data_aprovacao_recusa']:
            if field in data:
                setattr(self, field, data[field])


class RegistroPresenca(db.Model):
    __tablename__ = 'registro_presenca'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_inscricao = db.Column(db.Integer, db.ForeignKey('inscricao.id'), unique=True, nullable=False)
    codigo_validacao_pin = db.Column(db.String(100), nullable=False)
    check_in_hora = db.Column(db.DateTime, default=db.func.current_timestamp())
    check_out_hora = db.Column(db.DateTime, nullable=True)

    #RELACIONAMENTOS
    inscricao = db.relationship('Inscricao', back_populates='registro_presenca', lazy='joined')

    def __init__(self, id_inscricao, codigo_validacao_pin, check_out_hora=None):
        self.id_inscricao = id_inscricao
        self.codigo_validacao_pin = codigo_validacao_pin
        self.check_out_hora = check_out_hora

    def __repr__(self):
        return f'<RegistroPresenca Inscricao {self.id_inscricao} - PIN {self.codigo_validacao_pin}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_inscricao': self.id_inscricao,
            'codigo_validacao_pin': self.codigo_validacao_pin,
            'check_in_hora': self.check_in_hora.isoformat() if self.check_in_hora else None,
            'check_out_hora': self.check_out_hora.isoformat() if self.check_out_hora else None
        }
    
    def update_from_dict(self, data):
        for field in ['id_inscricao', 'codigo_validacao_pin', 'check_out_hora']:
            if field in data:
                setattr(self, field, data[field])

