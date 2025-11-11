from flask import Blueprint, request, jsonify
from repositories import HabilidadeRepo

habilidade_bp = Blueprint('habilidade_bp', __name__)

# ================= CREATE HABILIDADE ===================
@habilidade_bp.route('/', methods=['POST'])
def create_habilidade():
    data = request.get_json()
    nome = data.get('nome')

    if not nome:
        return jsonify({'error': 'Nome da habilidade é obrigatório.'}), 400
    
    if HabilidadeRepo.get_habilidade_by_name(nome):
        return jsonify({'error': 'Habilidade já existe.'}), 400
    
    if nome.length > 100:
        return jsonify({'error': 'Nome da habilidade excede o limite de 100 caracteres.'}), 400

    habilidade = HabilidadeRepo.create_habilidade(nome=nome)
    return jsonify(habilidade.to_dict()), 201

# ================= GET ALL HABILIDADES ===================
@habilidade_bp.route('/', methods=['GET'])
def get_all_habilidades():
    habilidades = HabilidadeRepo.get_all_habilidades()
    habilidade_list = [h.to_dict() for h in habilidades]
    return jsonify(habilidade_list), 200

# ================= GET HABILIDADE BY ID ===================
@habilidade_bp.route('/<int:habilidade_id>', methods=['GET'])
def get_habilidade_by_id(habilidade_id):
    habilidade = HabilidadeRepo.get_habilidade_by_id(habilidade_id)
    if not habilidade:
        return jsonify({'error': 'Habilidade não encontrada.'}), 404
    return jsonify(habilidade.to_dict()), 200

# =============== GET HABILIDADE BY NAME ==================
@habilidade_bp.route('/nome/<string:nome>', methods=['GET'])
def get_habilidade_by_name(nome):
    habilidade = HabilidadeRepo.get_habilidade_by_name(nome)
    if not habilidade:
        return jsonify({'error': 'Habilidade não encontrada.'}), 404
    return jsonify(habilidade.to_dict()), 200


# ================= UPDATE HABILIDADE ===================
@habilidade_bp.route('/<int:habilidade_id>', methods=['PUT'])
def update_habilidade(habilidade_id):
    data = request.get_json()
    nome = data.get('nome')

    if not nome:
        return jsonify({'error': 'Nome da habilidade é obrigatório.'}), 400
    
    if nome.length > 100:
        return jsonify({'error': 'Nome da habilidade excede o limite de 100 caracteres.'}), 400

    habilidade = HabilidadeRepo.update_habilidade(habilidade_id, data)
    if not habilidade:
        return jsonify({'error': 'Habilidade não encontrada.'}), 404

    return jsonify(habilidade.to_dict()), 200

# ================= DELETE HABILIDADE ===================
@habilidade_bp.route('/<int:habilidade_id>', methods=['DELETE'])
def delete_habilidade(habilidade_id):
    success = HabilidadeRepo.delete_habilidade(habilidade_id)
    if not success:
        return jsonify({'error': 'Habilidade não encontrada.'}), 404
    return jsonify({'message': 'Habilidade deletada com sucesso.'}), 200

# ================= GET HABILIDADES BY USUARIO ===================
@habilidade_bp.route('/usuario/<int:user_id>', methods=['GET'])
def get_habilidades_by_user(user_id):
    habilidades = HabilidadeRepo.get_habilidades_by_user(user_id)
    habilidade_list = [h.to_dict() for h in habilidades]
    return jsonify(habilidade_list), 200

# ================= GET HABILIDADES BY OPORTUNIDADE ===================
@habilidade_bp.route('/oportunidade/<int:oportunidade_id>', methods=['GET'])
def get_habilidades_by_oportunidade(oportunidade_id):
    habilidades = HabilidadeRepo.get_habilidades_by_oportunidade(oportunidade_id)
    habilidade_list = [h.to_dict() for h in habilidades]
    return jsonify(habilidade_list), 200

# ================ HABILIDADE EXISTS ==========================
@habilidade_bp.route('/exists/<string:nome>', methods=['GET'])
def habilidade_exists(nome):
    exists = HabilidadeRepo.habilidade_exists(nome)
    return jsonify({'exists': exists}), 200

