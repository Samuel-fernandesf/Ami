from flask import Blueprint, request, jsonify
from middleware.jwt_util import token_required
from repositories.inscricao_repo import InscricaoRepo
from models.inscricao import Inscricao
from datetime import datetime

inscricao_bp = Blueprint('inscricao_bp', __name__)

# ===================== CREATE INSCRIÇÃO =====================
@inscricao_bp.route('/', methods=['POST'])
@token_required
def create_inscricao():
    data = request.get_json()

    # =========== Getting data ==============
    current_user = request.user

    id_usuario = data.get('id_usuario', current_user.id)  # padrão: o próprio usuário autenticado
    id_oportunidade = data.get('id_oportunidade')

    # =========== Validation ==============

    if not id_oportunidade:
        return jsonify({'error': 'O campo id_oportunidade é obrigatório.'}), 400


    inscricao_existente = InscricaoRepo.get_inscricao_by_usuario_oportunidade(id_usuario, id_oportunidade)
    if inscricao_existente:
        return jsonify({'error': 'Usuário já inscrito nesta oportunidade.'}), 400

    # =========== Creating instance ==============
    inscricao = InscricaoRepo.create_inscricao(
        id_usuario=id_usuario,
        id_oportunidade=id_oportunidade
    )

    return jsonify(inscricao.to_dict()), 201


# ===================== GET ALL INSCRIÇÕES =====================
@inscricao_bp.route('/', methods=['GET'])
@token_required
def get_all_inscricoes():
    current_user = request.user

    # Se for admin, retorna todas as inscrições
    if hasattr(current_user, 'is_admin') and current_user.is_admin:
        inscricoes = InscricaoRepo.get_all_inscricoes()
    else:
        # Um usuário padrão só vê suas próprias inscrições (agradeçam ao chatgpt, eu não ia pensar nisso nem a pau)
        inscricoes = InscricaoRepo.get_inscricoes_by_usuario(current_user.id)

    return jsonify([i.to_dict() for i in inscricoes]), 200


# ===================== GET BY ID =====================
@inscricao_bp.route('/<int:id_inscricao>', methods=['GET'])
@token_required
def get_inscricao_by_id(id_inscricao):
    current_user = request.user
    inscricao = InscricaoRepo.get_inscricao_by_id(id_inscricao)

    if not inscricao:
        return jsonify({'error': 'Inscrição não encontrada.'}), 404

    # ======= Permission Control =======
    if inscricao.id_usuario != current_user.id and not getattr(current_user, 'is_admin', False):
        return jsonify({'error': 'Acesso negado.'}), 403

    return jsonify(inscricao.to_dict()), 200


# ===================== GET BY OPORTUNIDADE =====================
@inscricao_bp.route('/oportunidade/<int:id_oportunidade>', methods=['GET'])
@token_required
def get_inscricoes_by_oportunidade(id_oportunidade):
    current_user = request.user

    # ======= Permission Control =======
    if not getattr(current_user, 'is_admin', False):
        return jsonify({'error': 'Acesso negado.'}), 403

    inscricoes = InscricaoRepo.get_inscricoes_by_oportunidade(id_oportunidade)
    return jsonify([i.to_dict() for i in inscricoes]), 200


# ===================== UPDATE STATUS =====================
@inscricao_bp.route('/<int:id_inscricao>', methods=['PUT'])
@token_required
def update_inscricao(id_inscricao):
    current_user = request.user
    data = request.get_json()

    inscricao = InscricaoRepo.get_inscricao_by_id(id_inscricao)
    if not inscricao:
        return jsonify({'error': 'Inscrição não encontrada.'}), 404

    # ======= Permission Control =======
    if not getattr(current_user, 'is_admin', False):
        if inscricao.id_usuario != current_user.id:
            return jsonify({'error': 'Acesso negado.'}), 403

        if 'status_inscricao' in data:
            return jsonify({'error': 'Apenas administradores podem alterar o status.'}), 403

    if 'status_inscricao' in data and data['status_inscricao'] in ['aprovado', 'rejeitado']:
        data['data_aprovacao_recusa'] = datetime.utcnow()

    inscricao_atualizada = InscricaoRepo.update_inscricao(id_inscricao, data)
    return jsonify(inscricao_atualizada.to_dict()), 200


# ===================== DELETE INSCRIÇÃO =====================
@inscricao_bp.route('/<int:id_inscricao>', methods=['DELETE'])
@token_required
def delete_inscricao(id_inscricao):
    current_user = request.user
    inscricao = InscricaoRepo.get_inscricao_by_id(id_inscricao)

    if not inscricao:
        return jsonify({'error': 'Inscrição não encontrada.'}), 404

    if inscricao.id_usuario != current_user.id and not getattr(current_user, 'is_admin', False):
        return jsonify({'error': 'Acesso negado.'}), 403

    success = InscricaoRepo.delete_inscricao(id_inscricao)
    if not success:
        return jsonify({'error': 'Falha ao deletar inscrição.'}), 500

    return jsonify({'message': 'Inscrição deletada com sucesso.'}), 200
