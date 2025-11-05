from extensions import db

class Inscricao(db.Model):
    __tablename__ = 'inscricao'

    id_inscricao = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_oportunidade = db.Column(db.Integer, db.ForeignKey('oportunidade.id_oportunidade'), nullable=False)
    data_inscricao = db.Column(db.DateTime, default=db.func.current_timestamp())
    status_inscricao = db.Column(db.Enum('pendente', 'aprovado', 'rejeitado', name='status_inscricao_enum'), default='pendente', nullable=False)
    data_aprovacao_recusa = db.Column(db.DateTime, nullable=True)

    def __init__(self, id_usuario, id_oportunidade, status_inscricao='pendente', data_aprovacao_recusa=None):
        self.id_usuario = id_usuario,
        self.id_oportunidade = id_oportunidade,
        self.status_inscricao = status_inscricao,
        data_aprovacao_recusa = data_aprovacao_recusa

    def repr__(self):
         return f'<Inscricao Usuario {self.id_usuario} - Oportunidade {self.id_oportunidade}>'
    
    def to_dict(self):
        return {
            'id_inscricao': self.id_inscricao,
            'id_usuario': self.id_usuario,
            'id_oportunidade': self.id_oportunidade,
            'data_inscricao': self.data_inscricao.isoformat(),
            'status_inscricao': self.status_inscricao,
            'data_aprovacao_recusa': self.data_aprovacao_recusa.isoformat() if self.data_aprovacao_recusa else None
        }

    def update_from_dict(self, data):
        for field in ['id_usuario', 'id_oportunidade', 'status_inscricao', 'data_aprovacao_recusa']:
            if field in data:
                setattr(self, field, data[field])