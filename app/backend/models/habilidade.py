from extensions import db

class Habilidade(db.Model):
    __tablename__ = 'habilidade'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), unique=True, nullable=False)

    #RELACIONAMENTOS
    oportunidades = db.relationship('OportunidadeHabilidade', back_populates='habilidade', lazy='dynamic', cascade='all, delete-orphan')
    voluntarios = db.relationship('VoluntarioHabilidade', back_populates='habilidade', lazy='dynamic', cascade='all, delete-orphan')

    def __init__(self, nome):
        self.nome = nome

    def __repr__(self):
        return f''

    def to_dict(self):
        return {
        'id': self.id,
        'nome': self.nome
        }

    def update_from_dict(self, data):
        for field in ['nome']:
            if field in data:
                setattr(self, field, data[field])

class VoluntarioHabilidade(db.Model):
    __tablename__ = 'voluntario_habilidade'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_habilidade = db.Column(db.Integer, db.ForeignKey('habilidade.id'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('id_usuario', 'id_habilidade', name='uq_usuario_habilidade'),
    )
    
    #RELACIONAMENTOS
    voluntario = db.relationship('Usuario', back_populates='habilidades', lazy='select')
    habilidade = db.relationship('Habilidade', back_populates='voluntarios', lazy='select')

    def __init__(self, id_usuario, id_habilidade):
        self.id_usuario = id_usuario
        self.id_habilidade = id_habilidade

    def __repr__(self):
        return f'<VoluntarioHabilidade usuario_id={self.id_usuario}, habilidade_id={self.id_habilidade}>'

    def to_dict(self):
        return {
            'id': self.id,
            'id_usuario': self.id_usuario,
            'id_habilidade': self.id_habilidade
        }

    def update_from_dict(self, data):
        for field in ['id_usuario', 'id_habilidade']:
            if field in data:
                setattr(self, field, data[field])

class OportunidadeHabilidade(db.Model):
    __tablename__ = 'oportunidade_habilidade'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_oportunidade = db.Column(db.Integer, db.ForeignKey('oportunidade.id'), nullable=False)
    id_habilidade = db.Column(db.Integer, db.ForeignKey('habilidade.id'), nullable=False)

    __table_args__ = (
        db.UniqueConstraint('id_oportunidade', 'id_habilidade', name='uq_oportunidade_habilidade'),
    )

    #RELACIONAMENTOS
    oportunidade = db.relationship('Oportunidade', back_populates='habilidades', lazy='select')
    habilidade = db.relationship('Habilidade', back_populates='oportunidades', lazy='select')

    def __init__(self, id_oportunidade, id_habilidade):
        self.id_oportunidade = id_oportunidade
        self.id_habilidade = id_habilidade

    def __repr__(self):
        return f'<OportunidadeHabilidade oportunidade_id={self.id_oportunidade}, habilidade_id={self.id_habilidade}>'

    def to_dict(self):
        return {
            'id': self.id,
            'id_oportunidade': self.id_oportunidade,
            'id_habilidade': self.id_habilidade
        }

    def update_from_dict(self, data):
        for field in ['id_oportunidade', 'id_habilidade']:
            if field in data:
                setattr(self, field, data[field])
