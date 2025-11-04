from flask import Flask, jsonify
from flask_cors import CORS
from extensions import Config
from extensions import db
from flask_migrate import Migrate

migrate = Migrate()

def create_app():

    # =============== App Initialization ====================
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    migrate.init_app(app, db)  
    
    CORS(app, supports_credentials=True)


    #=============== Test Route ============================
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({"message": "API is running"}), 200
    
    #=============== Import routers ========================

    from routes.auth_routes import auth_bp
    from routes.user_routes import user_bp


    #=============== Register blueprints ===================

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(user_bp, url_prefix='/users')



    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)