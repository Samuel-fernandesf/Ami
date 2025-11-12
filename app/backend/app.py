from flask import Flask, jsonify
from flask import Flask, send_from_directory
from flask_cors import CORS
from extensions import Config
from extensions import db
from flask_migrate import Migrate
import os

migrate = Migrate()

def create_app():

    # =============== App Initialization ====================
    app = Flask(__name__)

    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)  
    
    CORS(app, supports_credentials=True)

    #=============== Test Route =================
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({"message": "API is running"}), 200
    
    #=============== Import routers ========================
    from routes.auth_routes import auth_bp
    from routes.inscricao_routes import inscricao_bp
    from routes.oportunidade_routes import oportunidade_bp
    from routes.organizacao_routes import organizacao_bp
    from routes.user_routes import user_bp
    from routes.habilidade_routes import habilidade_bp


    #=============== Register blueprints ===================
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(inscricao_bp, url_prefix='/inscricao')
    app.register_blueprint(oportunidade_bp, url_prefix='/oportunidade')
    app.register_blueprint(organizacao_bp, url_prefix='/organizacao')
    app.register_blueprint(user_bp, url_prefix='/user')
    app.register_blueprint(habilidade_bp, url_prefix='/habilidade')


    #============ Special route to serve files ================
    @app.route('/uploads/<path:filename>')
    def uploaded_file(filename):
        uploads_dir = os.path.join(app.root_path, 'uploads')
        return send_from_directory(uploads_dir, filename)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)