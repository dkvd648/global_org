# Flask Application

A Flask app with an application factory, config, and blueprints.

## Structure

```
global_org/
├── flask_app/           # Flask package
│   ├── __init__.py      # App factory
│   ├── config.py        # Configuration (dev/prod/test)
│   ├── routes/
│   │   ├── __init__.py
│   │   └── main.py      # Main blueprint
│   ├── templates/
│   │   └── index.html
│   └── static/
│       └── css/
│           └── style.css
├── run.py               # Development server entry point
├── requirements.txt
└── README.md
```

## Setup

1. Create a virtual environment (recommended):

   ```bash
   python -m venv venv
   venv\Scripts\activate   # Windows
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the app:

   ```bash
   python run.py
   ```

4. Open http://127.0.0.1:5000 in your browser.

## Configuration

Set `FLASK_ENV` or pass `config_name` to `create_app()`:

- `development` (default) – debug on
- `production` – for deployment
- `testing` – for tests

Set `SECRET_KEY` in the environment for production.
