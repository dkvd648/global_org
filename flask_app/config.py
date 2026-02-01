"""Application configuration."""
import os


class BaseConfig:
    """Base configuration."""
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")
    DEBUG = False
    TESTING = False


class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    ENV = "development"


class ProductionConfig(BaseConfig):
    """Production configuration."""
    ENV = "production"
    SECRET_KEY = os.environ.get("SECRET_KEY")


class TestingConfig(BaseConfig):
    """Testing configuration."""
    TESTING = True
    SECRET_KEY = "test-secret-key"
