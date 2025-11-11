from flask import Blueprint, request, jsonify
from datetime import datetime
from middleware.jwt_util import token_required
from repositories import OportunidadeRepo
from models.oportunidade import Oportunidade
from models.usuario import Usuario as User

oportunidade_bp = Blueprint('oportunidade_bp', __name__)


#================== CREATE OPORTUNIDADE ==================
@oportunidade_bp.route('/', methods=['POST'])
@token_required
def create_oportunidade():
    current_user : User = request.user
    data = request.get_json()

    #=========== permission control ==============
    if current_user.tipo_usuario != 'organizacao' and not current_user.tipo_usuario == 'admin':
        return jsonify({'error': 'Apenas organizações ou administradores podem criar oportunidades.'}), 403

    #=========== getting data ==============
    titulo = data.get('titulo')
    descricao = data.get('descricao')
    local_endereco = data.get('local_endereco')
    comunidade = data.get('comunidade')
    data_hora = data.get('data_hora')
    duracao_horas = data.get('duracao_horas')
    num_vagas = data.get('num_vagas')
    requisitos = data.get('requisitos')
    tags = data.get('tags')
    habilidades = data.get('habilidades', [])

    #=========== validation ==============
    if not all([titulo, descricao, local_endereco, comunidade, data_hora, duracao_horas, num_vagas]):
        return jsonify({'error': 'Todos os campos obrigatórios devem ser preenchidos.'}), 400

    #=========== creating instance ==============
    oportunidade : Oportunidade = OportunidadeRepo.create_oportunidade(
        id_organizacao=current_user.id,
        titulo=titulo,
        descricao=descricao,
        local_endereco=local_endereco,
        comunidade=comunidade,
        data_hora=datetime.fromisoformat(data_hora),
        duracao_horas=duracao_horas,
        num_vagas=num_vagas,
        requisitos=requisitos,
        habilidades=habilidades,
        tags=tags
    )

    #=========== preparing response ==============
    return jsonify(oportunidade.to_dict()), 201


#================== GET ALL OPORTUNIDADES ==================
@oportunidade_bp.route('/', methods=['GET'])
def get_all_oportunidades():
    oportunidades = OportunidadeRepo.get_all_oportunidades()
    return jsonify([o.to_dict() for o in oportunidades]), 200


#================== GET OPORTUNIDADE BY ID ==================
@oportunidade_bp.route('/<int:id_oportunidade>', methods=['GET'])
def get_oportunidade_by_id(id_oportunidade):
    oportunidade : Oportunidade = OportunidadeRepo.get_oportunidade_by_id(id_oportunidade)
    
    if not oportunidade:
        return jsonify({'error': 'Oportunidade não encontrada.'}), 404
    
    return jsonify(oportunidade.to_dict()), 200


#================== GET OPORTUNIDADES BY ORGANIZACAO ==================
@oportunidade_bp.route('/organizacao/<int:id_organizacao>', methods=['GET'])
def get_oportunidades_by_organizacao(id_organizacao):
    oportunidades = OportunidadeRepo.get_oportunidades_by_organizacao(id_organizacao)
    return jsonify([o.to_dict() for o in oportunidades]), 200


#================== UPDATE OPORTUNIDADE ==================
@oportunidade_bp.route('/<int:id_oportunidade>', methods=['PUT'])
@token_required
def update_oportunidade(id_oportunidade):
    current_user : User = request.user
    data = request.get_json()

    oportunidade : Oportunidade = OportunidadeRepo.get_oportunidade_by_id(id_oportunidade)
    if not oportunidade:
        return jsonify({'error': 'Oportunidade não encontrada.'}), 404

    #=========== permission control ==============
    if oportunidade.organizaçao_id != current_user.id and current_user.tipo_usuario != 'admin':
        return jsonify({'error': 'Acesso negado.'}), 403

    #=========== allowed fields ==============
    allowed_fields = {
        'titulo', 'descricao', 'local_endereco', 'comunidade', 'data_hora',
        'duracao_horas', 'num_vagas', 'requisitos', 'tags', 'habilidades'
    }

    data = {k: v for k, v in data.items() if k in allowed_fields}

    #=========== update oportunidade ==============
    if 'data_hora' in data:
        try:
            data['data_hora'] = datetime.fromisoformat(data['data_hora'])
        except:
            return jsonify({'error': 'Formato de data inválido. Use ISO8601.'}), 400

    oportunidade = OportunidadeRepo.update_oportunidade(id_oportunidade, data)

    return jsonify(oportunidade.to_dict()), 200


#================== DELETE OPORTUNIDADE ==================
@oportunidade_bp.route('/<int:id_oportunidade>', methods=['DELETE'])
@token_required
def delete_oportunidade(id_oportunidade):
    current_user : User = request.user

    oportunidade : Oportunidade = OportunidadeRepo.get_oportunidade_by_id(id_oportunidade)
    if not oportunidade:
        return jsonify({'error': 'Oportunidade não encontrada.'}), 404

    #=========== permission control ==============
    if oportunidade.organizaçao_id != current_user.id and current_user.tipo_usuario != 'admin':
        return jsonify({'error': 'Acesso negado.'}), 403

    success = OportunidadeRepo.delete_oportunidade(id_oportunidade)
    if not success:
        return jsonify({'error': 'Falha ao deletar oportunidade.'}), 500
    
    return jsonify({'message': 'Oportunidade deletada com sucesso.'}), 200
