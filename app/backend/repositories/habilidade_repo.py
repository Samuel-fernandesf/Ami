from extensions import db
from typing import Optional, List
from datetime import datetime
from models import Habilidade
import json


class HabiliadeRepo:
    @staticmethod
    def create_habilidade(nome:str) -> Habilidade:
        habilidade = Habilidade(nome=nome)

        db.session.add(habilidade)
        db.session.commit()

        return habilidade
    


