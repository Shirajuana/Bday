from flask import Flask, send_from_directory, render_template
import os

# Create Flask app with dist folder as static directory
app = Flask(__name__, static_folder='dist', static_url_path='')

@app.route('/')
def serve_index():
    """Serve the main index.html"""
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_file(filename):
    """Serve any static file from dist folder"""
    return send_from_directory(app.static_folder, filename)

@app.errorhandler(404)
def page_not_found(error):
    """Handle 404 errors by serving index.html for SPA routing"""
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
