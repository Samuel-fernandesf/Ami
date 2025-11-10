import enum

class StatusOrganizacao(enum.Enum):
    pendente = 'PENDENTE'
    aprovada = 'APROVADA'
    recusada = 'RECUSADA'

class StatusOportunidades(enum.Enum):
    aberta = 'ABERTA'
    fechada = 'FECHADA'

class StatusInscricao(enum.Enum):
    pendente = 'PENDENTE'
    aprovada = 'APROVADA'
    recusada = 'RECUSADA'


