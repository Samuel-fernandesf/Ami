from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from middleware.jwt_util import token_required
from repositories import UserRepo
from validate_docbr import CPF
from datetime import datetime
from repositories import HabilidadeRepo
from models import Habilidade

user_bp = Blueprint('user_bp', __name__)


# ================= CREATE USER ===================
@user_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()

    # =========== Getting data ==============
    nome_completo = data.get('nome_completo')
    cpf = data.get('cpf')
    email = data.get('email')
    cidade = data.get('cidade')
    bairro = data.get('bairro')
    telefone = data.get('telefone')
    data_nasc_str = data.get('data_nasc')
    habilidades = data.get('habilidades', []) #  Its a list of NAMES, not IDs
    foto_perfil_PATH = data.get('foto_perfil_PATH')
    senha = data.get('senha')

    # =========== Validation ==============
    if not nome_completo or not email or not senha or not cidade or not bairro or not telefone or not data_nasc_str:
        return jsonify({'error': 'Campos obrigatórios ausentes.'}), 400

    try:
        data_nasc = datetime.strptime(data_nasc_str, "%d-%m-%Y").date()
    except ValueError:
        return jsonify({'error': 'Formato de data inválido. Use DD-MM-YYYY.'}), 400
    
    if len(telefone) > 11:
        return jsonify({'error': 'Telefone inválido. Máximo de 11 caracteres.'}), 400

    cpf_validator = CPF()
    
    if cpf and not cpf_validator.validate(cpf):
        return jsonify({'error': 'CPF inválido.'}), 400
    
    # ============== Getting habilidades IDs from names ==============
    habilidades_ids = []
    for hab_name in habilidades:
        hab : Habilidade = HabilidadeRepo.get_habilidade_by_name(hab_name)
        if hab:
            habilidades_ids.append(hab.id)
        else:
            #creates the habilidade if not exists
            new_hab : Habilidade = HabilidadeRepo.create_habilidade(hab_name)
            habilidades_ids.append(new_hab.id)

    # =========== Hashing password ==============
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
        data_nasc=data_nasc,
        habilidades=habilidades_ids,
        foto_perfil=foto_perfil_PATH
    )


    if not user:
        return jsonify({'error': 'Email ou CPF já está em uso.'}), 400

    user_dict : dict = user.to_dict()
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

# ================ GET HABILIDADES ==================== 
@user_bp.route('/<int:user_id>/habilidades', methods=['GET'])
def get_user_habilidades(user_id):
    user = UserRepo.get_user_by_id(user_id)
    if not user:
        return jsonify({'error': 'Usuário não encontrado.'}), 404

    habilidades = UserRepo.get_user_habilidades(user)
    habilidade_list = [h.to_dict() for h in habilidades]

    return jsonify(habilidade_list), 200

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
        'telefone', 'habilidades', 'data_nasc', 'foto_perfil_PATH', 'conta_ativa'
    }

    # ============== Data Validation ==============
    data_nasc_str = data.get('data_nasc')
    if data_nasc_str:
        try:
            data['data_nasc'] = datetime.strptime(data_nasc_str, "%d-%m-%Y").date()
        except ValueError:
            return jsonify({'error': 'Formato de data inválido. Use DD-MM-YYYY.'}), 400
        
    telefone = data.get('telefone')
    if telefone and len(telefone) > 11:
        return jsonify({'error': 'Telefone inválido. Máximo de 11 caracteres.'}), 400    

    data = {k: v for k, v in data.items() if k in allowed_fields}

    # ============== Getting habilidades IDs from names ==============
    habilidades = data.get('habilidades')
    if habilidades:
        habilidades_ids = []
        
        for hab_name in habilidades:
            hab : Habilidade = HabilidadeRepo.get_habilidade_by_name(hab_name)
            
            if hab:
                habilidades_ids.append(hab.id)
            else:
                #creates the habilidade if not exists
                new_hab : Habilidade = HabilidadeRepo.create_habilidade(hab_name)
                habilidades_ids.append(new_hab.id)

        data['habilidades'] = habilidades_ids

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

