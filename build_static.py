"""
Build static HTML from Flask templates for deployment to Render Static Site.
Run from project root: python build_static.py
Output goes to ./build/
"""
import os
import shutil
from pathlib import Path

# Add project root to path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))

from flask_app import create_app

BUILD_DIR = Path(__file__).parent / "build"
FLASK_APP_DIR = Path(__file__).parent / "flask_app"
STATIC_SRC = FLASK_APP_DIR / "static"


def build():
    app = create_app(config_name="production")

    # Clean and create build directory
    if BUILD_DIR.exists():
        shutil.rmtree(BUILD_DIR)
    BUILD_DIR.mkdir(parents=True)

    with app.test_client() as client:
        # Routes to render: (route_path, output_path)
        routes = [
            ("/", BUILD_DIR / "index.html"),
            ("/coming-soon", BUILD_DIR / "coming-soon" / "index.html"),
        ]

        for route_path, output_path in routes:
            response = client.get(route_path)
            if response.status_code != 200:
                raise RuntimeError(f"Failed to render {route_path}: {response.status_code}")

            output_path.parent.mkdir(parents=True, exist_ok=True)
            output_path.write_text(response.data.decode("utf-8"), encoding="utf-8")
            print(f"Built: {output_path.relative_to(BUILD_DIR.parent)}")

    # Copy static assets
    static_dest = BUILD_DIR / "static"
    shutil.copytree(STATIC_SRC, static_dest)
    print(f"Copied static files to {static_dest.relative_to(BUILD_DIR.parent)}")

    print(f"\nDone! Static site built in: {BUILD_DIR}")


if __name__ == "__main__":
    build()
