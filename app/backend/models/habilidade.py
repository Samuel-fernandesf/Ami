from extensions import db

class Habilidade(db.Model):
    __tablename__ = 'habilidade'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)

    # Relacionamentos (muitos-para-muitos)
    voluntarios = db.relationship('VoluntarioHabilidade', backref='habilidade', lazy='dynamic')
    oportunidades = db.relationship('OportunidadeHabilidade', backref='habilidade', lazy='dynamic')

    def __init__(self, nome):
        self.nome = nome

    def __repr__(self):
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


class OportunidadeHabilidade(db.Model):
    __tablename__ = 'oportunidade_habilidade'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_oportunidade = db.Column(db.Integer, db.ForeignKey('oportunidade.id'), nullable=False)
    id_habilidade = db.Column(db.Integer, db.ForeignKey('habilidade.id'), nullable=False)

    # Relacionamentos
    oportunidade = db.relationship('Oportunidade', backref='habilidades', lazy='joined')
    habilidade = db.relationship('Habilidade', backref='oportunidades', lazy='joined')

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


class VoluntarioHabilidade(db.Model):
    __tablename__ = 'voluntario_habilidade'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    id_habilidade = db.Column(db.Integer, db.ForeignKey('habilidade.id'), nullable=False)

    # Relacionamentos
    usuario = db.relationship('Usuario', backref='habilidades', lazy='joined')
    habilidade = db.relationship('Habilidade', backref='voluntarios', lazy='joined')

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
