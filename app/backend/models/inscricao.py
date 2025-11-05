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



class RegistroPresenca(db.Model):
    __tablename__ = 'registro_presenca'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_inscricao = db.Column(db.Integer, db.ForeignKey('inscricao.id_inscricao'), nullable=False)
    codigo_validacao_pin = db.Column(db.String(100), nullable=False)
    check_in_hora = db.Column(db.DateTime, default=db.func.current_timestamp())
    check_out_hora = db.Column(db.DateTime, nullable=True)

    def __init__(self, id_inscricao, codigo_validacao_pin, check_out_hora=None):
        self.id_inscricao = id_inscricao
        self.codigo_validacao_pin = codigo_validacao_pin
        self.check_out_hora = check_out_hora

    def repr__(self):
            return f'<RegistroPresenca Inscricao {self.id_inscricao} - PIN {self.codigo_validacao_pin}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_inscricao': self.id_inscricao,
            'codigo_validacao_pin': self.codigo_validacao_pin,
            'check_in_hora': self.check_in_hora.isoformat(),
            'check_out_hora': self.check_out_hora.isoformat() if self.check_out_hora else None
        }
    
    def update_from_dict(self, data):
        for field in ['id_inscricao', 'codigo_validacao_pin', 'check_out_hora']:
            if field in data:
                setattr(self, field, data[field])


class HistoricoServico(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_inscricao = db.Column(db.Integer, db.ForeignKey('inscricao.id_inscricao'), nullable=False)
    horas_confirmadas = db.Column(db.Float, nullable=False)
    data_validacao = db.Column(db.DateTime, default=db.func.current_timestamp())
    certificado_url = db.Column(db.String(1024), nullable=True)


    def __init__(self, id_inscricao, horas_confirmadas, certificado_url=None):
        self.id_inscricao = id_inscricao
        self.horas_confirmadas = horas_confirmadas
        self.certificado_url = certificado_url

    def repr__(self):
        return f'<HistoricoServico Inscricao {self.id_inscricao} - Horas {self.horas_confirmadas}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_inscricao': self.id_inscricao,
            'horas_confirmadas': self.horas_confirmadas,
            'data_validacao': self.data_validacao.isoformat(),
            'certificado_url': self.certificado_url
        }
    
    def update_from_dict(self, data):
        for field in ['id_inscricao', 'horas_confirmadas', 'certificado_url']:
            if field in data:
                setattr(self, field, data[field])

    
