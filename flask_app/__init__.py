"""Flask application factory."""
from flask import Flask


def create_app(config_name="development"):
    """Create and configure the Flask application."""
    app = Flask(__name__, template_folder="templates", static_folder="static")

    # Load config (DevelopmentConfig, ProductionConfig, TestingConfig)
    from flask_app import config
    config_class = getattr(config, f"{config_name.capitalize()}Config", config.DevelopmentConfig)
    app.config.from_object(config_class)

    # Register blueprints
    from flask_app.routes import main_bp
    app.register_blueprint(main_bp)

    return app
