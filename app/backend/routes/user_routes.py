from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from middleware.jwt_util import token_required
from repositories import UserRepo
from models.usuario import Usuario as User

user_bp = Blueprint('user_bp', __name__)


# ================= CREATE USER ===================
@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    # =========== Getting data ==============
    nome_completo = data.get('nome_completo')
    cpf = data.get('cpf')
    email = data.get('email')
    cidade = data.get('cidade')
    bairro = data.get('bairro')
    telefone = data.get('telefone')
    data_nascimento = data.get('data_nascimento')
    habilidades = data.get('habilidades', [])
    foto_perfil_PATH = data.get('foto_perfil_PATH')
    senha = data.get('senha')

    # =========== Validation ==============
    if not nome_completo or not email or not senha or not cidade or not bairro or not telefone or not data_nascimento:
        return jsonify({'error': 'Campos obrigatórios ausentes.'}), 400

    senha_hash = generate_password_hash(senha)

    # =========== Creating instance ==============
    user = UserRepo.create_user(
        nome_completo=nome_completo,
        cpf=cpf,
        email=email,
        senha=senha_hash,
        cidade=cidade,
        bairro=bairro,
        telefone=telefone,
        data_nascimento=data_nascimento,
        habilidades=habilidades,
        foto_perfil_PATH=foto_perfil_PATH
    )

    if not user:
        return jsonify({'error': 'Email ou CPF já está em uso.'}), 400

    user_dict = user.to_dict()
    user_dict.pop('senha', None)

    return jsonify(user_dict), 201


# ================= GET BY ID ===================
@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = UserRepo.get_user_by_id(user_id)
    if not user:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    return jsonify(user.to_dict()), 200


# ================= GET BY EMAIL ===================
@user_bp.route('/email/<string:email>', methods=['GET'])
def get_user_by_email(email):
    user = UserRepo.get_user_by_email(email)
    if not user:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    return jsonify(user.to_dict()), 200


# ================= GET BY TELEFONE ===================
@user_bp.route('/telefone/<string:telefone>', methods=['GET'])
def get_user_by_telefone(telefone):
    user = UserRepo.get_user_by_telefone(telefone)
    if not user:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    return jsonify(user.to_dict()), 200


# ================= GET ALL ===================
@user_bp.route('/', methods=['GET'])
def get_all_users():
    users = UserRepo.get_all_users()
    return jsonify([u.to_dict() for u in users]), 200


# ================= GET ALL ADMINS ===================
@user_bp.route('/admins', methods=['GET'])
def get_all_admins():
    admins = UserRepo.get_all_admins()
    return jsonify([admin.to_dict() for admin in admins]), 200


# ================= UPDATE USER ===================
@user_bp.route('/<int:user_id>', methods=['PUT'])
@token_required
def update_user(user_id):
    current_user = request.user
    data = request.get_json()

    # ============== Permission Control ==============
    if current_user.id != user_id and not UserRepo.is_user_admin(current_user.id):
        return jsonify({'error': 'Acesso negado.'}), 403

    # ============== Allowed Fields ==============
    allowed_fields = {
        'nome_completo', 'email', 'senha', 'cidade', 'bairro',
        'telefone', 'habilidades', 'data_nascimento', 'foto_perfil_PATH', 'conta_ativa'
    }

    data = {k: v for k, v in data.items() if k in allowed_fields}

    # ============== Hash password if changed ==============
    if 'senha' in data:
        data['senha'] = generate_password_hash(data['senha'])

    # ============== Update User ==============
    user = UserRepo.update_user(user_id, data)
    if not user:
        return jsonify({'error': 'Usuário não encontrado.'}), 404

    user_dict = user.to_dict()
    user_dict.pop('senha', None)

    return jsonify(user_dict), 200


# ================= DELETE USER ===================
@user_bp.route('/<int:user_id>', methods=['DELETE'])
@token_required
def delete_user(user_id):
    current_user = request.user

    if current_user.id != user_id and not UserRepo.is_user_admin(current_user.id):
        return jsonify({'error': 'Acesso negado.'}), 403

    success = UserRepo.delete_user(user_id)
    if not success:
        return jsonify({'error': 'Usuário não encontrado.'}), 404

    return jsonify({'message': 'Usuário deletado com sucesso.'}), 200
