from extensions import db

class Oportunidade(db.Model):
    __tablename__ = 'oportunidade'

    id_oportunidade = db.Column(db.Integer, primary_key=True, autoincrement=True)
    organizaçao_id = db.Column(db.Integer, db.ForeignKey('organizacao.id_organizacao'), nullable=False)
    titulo = db.Column(db.String(255), nullable=False)
    descricao = db.Column(db.String(2048), nullable=False)
    local_endereco = db.Column(db.String(255), nullable=False)
    comunidade = db.Column(db.String(255), nullable=False)
    data_hora = db.Column(db.DateTime, nullable=False)
    duracao_horas = db.Column(db.Integer, nullable=False)
    num_vagas = db.Column(db.Integer, nullable=False)
    requisitos = db.Column(db.String(1024), nullable=True)
    tags = db.Column(db.String(512), nullable=True)
    status = db.Column(db.enum('aberto', 'fechado', name='status_enum'), default='aberto', nullable=False)
    criado_em = db.Column(db.DateTime, default=db.func.current_timestamp())
    

    def repr__(self):
         return f'<Oportunidade {self.titulo} - {self.organizaçao_id}>'
    
    def __init__(self, organizaçao_id, titulo, descricao, local_endereco, comunidade, data_hora, duracao_horas, num_vagas, requisitos, tags):
        self.organizaçao_id = organizaçao_id
        self.titulo = titulo
        self.descricao = descricao
        self.local_endereco = local_endereco
        self.comunidade = comunidade
        self.data_hora = data_hora
        self.duracao_horas = duracao_horas
        self.num_vagas = num_vagas
        self.requisitos = requisitos
        self.tags = tags

    def to_dict(self):
        return {
            'id_oportunidade': self.id_oportunidade,
            'organizaçao_id': self.organizaçao_id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'local_endereco': self.local_endereco,
            'comunidade': self.comunidade,
            'data_hora': self.data_hora.isoformat(),
            'duracao_horas': self.duracao_horas,
            'num_vagas': self.num_vagas,
            'requisitos': self.requisitos,
            'tags': self.tags,
            'status': self.status,
            'criado_em': self.criado_em.isoformat()
        }
    

    def update_from_dict(self, data):
        for field in ['organizaçao_id', 'titulo', 'descricao', 'local_endereco', 'comunidade', 'data_hora', 'duracao_horas', 'num_vagas', 'requisitos', 'tags', 'status']:
            if field in data:
                setattr(self, field, data[field])