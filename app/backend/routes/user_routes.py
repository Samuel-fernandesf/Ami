from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from middleware.jwt_util import token_required
from repositories import UserRepo
from models.usuario import Usuario as User


user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['POST'])
def create_user():
    data = request.json()

    #=========== getting data ==============

    nome_completo = data.get('nome_completo')
    email = data.get('email')
    cidade = data.get('cidade')
    bairro = data.get('bairro')
    telefone = data.get('telefone')
    data_nascimento = data.get('data_nascimento')
    habilidades = data.get('habilidades', [])
    foto_perfil_PATH = data.get('foto_perfil_PATH', None)

    senha = generate_password_hash(str(data.get('senha'))) 

    #=========== validation ==============
    if not nome_completo or not email or not senha or not cidade or not bairro or not telefone or not data_nascimento:
        return jsonify({'message': 'Nome completo, email e senha são obrigatórios.'}), 400
    
    #========== creating instance ==============

    user : User = UserRepo.create_user(
        nome_completo=nome_completo,
        email=email,
        senha=senha,
        cidade=cidade,
        bairro=bairro,
        telefone=telefone,
        data_nascimento=data_nascimento,
        habilidades=habilidades,
        foto_perfil_PATH=foto_perfil_PATH
    )


    if not user:
        return jsonify({'message': 'Email já está em uso.'}), 400
    
    #========== preparing response ==============
    user_dict = user.to_dict()
    user_dict.pop('senha', None) 

    return jsonify(user_dict), 201


@user_bp.route('/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
	user : User = UserRepo.get_user_by_id(user_id)
	
	if not user:
		return jsonify({'error': 'Usuário não encontrado.'}), 404
	
	return jsonify(user.to_dict())

@user_bp.route('/email/<string:email>', methods=['GET'])
def get_user_by_email(email):
    user : User = UserRepo.get_user_by_email(email)
    
    if not user:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    
    return jsonify(user.to_dict())

@user_bp.route('/telefone/<string:telefone>', methods=['GET'])
def get_user_by_telefone(telefone):
    user : User = UserRepo.get_user_by_telefone(telefone)
    
    if not user:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    
    return jsonify(user.to_dict())


@user_bp.route('/', methods=['GET'])
def get_all_users():
	users = UserRepo.get_all_users() 
	return jsonify([u.to_dict() for u in users])


@user_bp.route('/admins', methods=['GET'])
def get_all_admins():
    admins = UserRepo.get_all_admins()
    return jsonify([admin.to_dict() for admin in admins])

@user_bp.route('/<int:user_id>', methods=['PUT'])
@token_required
def update_user(user_id):
	current_user : User = request.user
	data = request.json
	
    #================== Permission Control ==============
	if current_user.id != user_id and not UserRepo.is_user_admin(current_user.id):
		return jsonify({'error': 'Acesso Negado'}), 403
	
    #================== Allowed Fields ==============
	allowed_fields = {
        'nome_completo', 'email', 'senha', 'cidade', 'bairro', 'telefone', 'habilidades', 'data_nasc', 'foto_perfil', 'conta_ativa'
    }
      
	data = {k: v for k, v in data.items() if k in allowed_fields}

    #=================== Hash senha ========================
	if 'senha' in data:
		data['senha'] = generate_password_hash(data['senha'])

    #=================== Update User ==================
	user : User = UserRepo.update_user(user_id, data)
	if not user:
		return jsonify({'error': 'Usuário não encontrado.'}), 404
    
	user_dict = user.to_dict()
	user_dict.pop('senha', None)
	return jsonify(user_dict), 201


@user_bp.route('/<int:user_id>', methods=['DELETE'])
@token_required
def delete_user(user_id):
    current_user : User = request.user
	
    #============== Permission Control ===================
    if current_user.id != user_id and not UserRepo.is_user_admin(current_user.id):
        return jsonify({'error': 'Acesso Negado'}), 403

    #=============== Remove User ================
    success = UserRepo.delete_user(user_id)
    if not success:
        return jsonify({'error': 'Usuário não encontrado.'}), 404
    
    return jsonify({'message': 'Usuário deletado com sucesso.'})