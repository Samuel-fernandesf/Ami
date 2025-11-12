from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from middleware.jwt_util import token_required
from repositories import UserRepo
from validate_docbr import CPF
from datetime import datetime
from repositories import HabilidadeRepo
from models import Habilidade
from secrets import token_hex
import base64
import os

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
    foto_perfil = data.get('foto_perfil_PATH') # An entire image, coded in base64
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
    
    if not foto_perfil:
        return jsonify({'error':'A Imagem é obrigatória'}), 400
    
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

    # ======== Decoding and saving image ===============
    nome_foto = f"{token_hex(16)}.png"

    try:
        foto_perfil_PATH = salvar_imagem(foto_perfil,nome_foto)
        
    except Exception as e:
        return jsonify({"error":"Ocorreu um erro ao tentar salvar a imagem"})


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

    # ======== Decoding and saving image ===============
    nome_foto = f"{token_hex(16)}.png"

    try:
        data["foto_perfil_PATH"] = salvar_imagem(data["foto_perfil_PATH"],nome_foto)
        
    except Exception as e:
        return jsonify({"error":"Ocorreu um erro ao tentar salvar a imagem"})


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


def salvar_imagem(imagem_base64, nome_arquivo):
    # Verifica se a base64 começa com "data:image"
    if not imagem_base64.startswith('data:image'):
        raise ValueError("Formato inválido. A imagem não contém dados válidos de imagem.")

    # Extrai o tipo da imagem (ex: png, jpeg, jpg, gif)
    tipo_imagem = imagem_base64.split(';')[0].split('/')[1]

    # Tipos de imagem permitidos
    tipos_permitidos = ['png', 'jpeg', 'jpg', 'gif']

    # Verifica se o tipo da imagem é válido
    if tipo_imagem not in tipos_permitidos:
        raise ValueError(f"Formato de imagem não suportado. Apenas os formatos {', '.join(tipos_permitidos)} são permitidos.")

    # Remove o prefixo "data:image/format;base64,"
    imagem_base64 = imagem_base64.split(',')[1]
    
    # Decodifica a string base64
    imagem_decodificada = base64.b64decode(imagem_base64)

    # Define o caminho para salvar a imagem (aqui estamos salvando no diretório 'uploads')
    # Utiliza o tipo da imagem para garantir que a extensão correta seja usada
    nome_arquivo_com_extensao = f"{nome_arquivo}.{tipo_imagem}"
    caminho = os.path.join('uploads', nome_arquivo_com_extensao)

    # Cria o diretório 'uploads' caso não exista
    os.makedirs(os.path.dirname(caminho), exist_ok=True)

    # Salva o arquivo
    with open(caminho, 'wb') as f:
        f.write(imagem_decodificada)

    return caminho
