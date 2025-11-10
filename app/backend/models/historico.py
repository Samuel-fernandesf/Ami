from extensions import db

class HistoricoServico(db.Model):
    __tablename__ = 'historico_servico'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_inscricao = db.Column(db.Integer, db.ForeignKey('inscricao.id'), nullable=False)
    horas_confirmadas = db.Column(db.Float, nullable=False)
    data_validacao = db.Column(db.DateTime, default=db.func.current_timestamp())
    certificado_url = db.Column(db.String(1024), nullable=True)

    def __init__(self, id_inscricao, horas_confirmadas, certificado_url=None):
        self.id_inscricao = id_inscricao
        self.horas_confirmadas = horas_confirmadas
        self.certificado_url = certificado_url

    def __repr__(self):
        return f'<HistoricoServico Inscricao {self.id_inscricao} - Horas {self.horas_confirmadas}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'id_inscricao': self.id_inscricao,
            'horas_confirmadas': self.horas_confirmadas,
            'data_validacao': self.data_validacao.isoformat() if self.data_validacao else None,
            'certificado_url': self.certificado_url
        }
    
    def update_from_dict(self, data):
        for field in ['id_inscricao', 'horas_confirmadas', 'certificado_url']:
            if field in data:
                setattr(self, field, data[field])
