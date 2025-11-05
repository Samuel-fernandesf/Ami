from extensions import db

class Habilidade(db.Model):
    __tablename__ = 'habilidade'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)

    # Relacionamentos
    voluntarios = db.relationship('VoluntarioHabilidade', backref='habilidade', lazy='dynamic')
    oportunidades = db.relationship('OportunidadeHabilidade', backref='habilidade', lazy='dynamic')

    def __init__(self, nome):
        self.nome = nome
        
    def repr(self):
        return f'<Habilidade {self.nome}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome
        }
    
    def update_from_dict(self, data):
        for field in ['nome']:
            if field in data:
                setattr(self, field, data[field])

