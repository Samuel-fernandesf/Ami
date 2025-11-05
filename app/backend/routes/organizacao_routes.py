from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from middleware.jwt_util import token_required
from repositories.organizacao_repo import OrganizacaoRepo
from repositories.user_repo import UserRepo
from models.organizaçao import Organizacao


organizacao_bp = Blueprint('organizacao_bp', __name__)

# ================= CREATE ORGANIZAÇÃO ===================
@organizacao_bp.route('/organizacoes', methods=['POST'])
def create_organizacao():
    data = request.get_json()

    # =========== Getting data ==============
    id_responsavel = data.get('id_responsavel')
    razao_social = data.get('razao_social')
    email_institucional = data.get('email_institucional')
    senha = data.get('senha')
    cnpj_id = data.get('cnpj_id')
    descricao = data.get('descricao')
    endereco_matriz = data.get('endereco_matriz')
    contato = data.get('contato')
    documento = data.get('documento')

    # =========== Validation ==============
    if not id_responsavel or not razao_social or not email_institucional or not senha or not cnpj_id or not descricao or not endereco_matriz or not contato:
        return jsonify({'error': 'Campos obrigatórios ausentes.'}), 400

    # =========== Creating instance ==============
    organizacao = OrganizacaoRepo.create_organizacao(
        id_responsavel=id_responsavel,
        razao_social=razao_social,
        email_institucional=email_institucional,
        senha=senha,
        cnpj_id=cnpj_id,
        descricao=descricao,
        endereco_matriz=endereco_matriz,
        contato=contato,
        documento=documento
    )

    if not organizacao:
        return jsonify({'error': 'Email institucional ou CNPJ já está em uso.'}), 400

    return jsonify(organizacao.to_dict()), 201


# ================= GET ORGANIZAÇÃO BY ID ===================
@organizacao_bp.route('/organizacoes/<int:organizacao_id>', methods=['GET'])
def get_organizacao_by_id(organizacao_id):
    organizacao = OrganizacaoRepo.get_organizacao_by_id(organizacao_id)
    
    if not organizacao:
        return jsonify({'error': 'Organização não encontrada.'}), 404

    return jsonify(organizacao.to_dict()), 200

# ================= GET ORGANIZACAO BY EMAIL ===================
@organizacao_bp.route('/organizacoes/email/<string:email_institucional>', methods=['GET'])
def get_organizacao_by_email(email_institucional):
    organizacao = OrganizacaoRepo.get_organizacao_by_email(email_institucional)

    if not organizacao:
        return jsonify({'error': 'Organização não encontrada.'}), 404

    return jsonify(organizacao.to_dict()), 200

# ================= GET ORGANIZACAO BY CNPJ  ===================
@organizacao_bp.route('/organizacoes/cnpj/<string:cnpj_id>', methods=['GET'])
def get_organizacao_by_cnpj(cnpj_id):
    organizacao = OrganizacaoRepo.get_organizacao_by_cnpj(cnpj_id)

    if not organizacao:
        return jsonify({'error': 'Organização não encontrada.'}), 404

    return jsonify(organizacao.to_dict()), 200

# ================= GET ALL ORGANIZAÇÕES ===================
@organizacao_bp.route('/organizacoes', methods=['GET'])
def get_all_organizacoes():
    organizacoes = OrganizacaoRepo.get_all_organizacoes()
    organizacoes_list = [org.to_dict() for org in organizacoes]
    return jsonify(organizacoes_list), 200

# ================= UPDATE ORGANIZAÇÃO ===================
@organizacao_bp.route('/organizacoes/<int:organizacao_id>', methods=['PUT'])
@token_required
def update_organizacao(organizacao_id):
    data = request.get_json()
    current_user = request.user


    #============= Fetch organização ==============
    organizacao = OrganizacaoRepo.get_organizacao_by_id(organizacao_id)
    if not organizacao:
        return jsonify({'error': 'Organização não encontrada.'}), 404

    #============= Permission Control ==============
    if current_user.id != organizacao.id_responsavel and not UserRepo.is_user_admin(current_user.id):
        return jsonify({'error': 'Permissão negada.'}), 403
    
    #============= Update instance ==============
    organizacao = OrganizacaoRepo.update_organizacao(organizacao_id, data)
    if not organizacao:
        return jsonify({'error': 'Organização não encontrada.'}), 404

    return jsonify(organizacao.to_dict()), 200


# ================= DELETE ORGANIZAÇÃO ===================
@organizacao_bp.route('/organizacoes/<int:organizacao_id>', methods=['DELETE'])
@token_required
def delete_organizacao(organizacao_id):
    current_user = request.user

    #============= Fetch organização ==============
    organizacao = OrganizacaoRepo.get_organizacao_by_id(organizacao_id)
    if not organizacao:
        return jsonify({'error': 'Organização não encontrada.'}), 404

    #============= Permission Control ==============
    if current_user.id != organizacao.id_responsavel and not UserRepo.is_user_admin(current_user.id):
        return jsonify({'error': 'Permissão negada.'}), 403

    #============= Delete instance ==============
    success = OrganizacaoRepo.delete_organizacao(organizacao_id)
    if not success:
        return jsonify({'error': 'Falha ao deletar a organização.'}), 500
    

    return jsonify({'message': 'Organização deletada com sucesso.'}), 200