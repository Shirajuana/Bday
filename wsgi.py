# PythonAnywhere WSGI Configuration File
# This file is used by PythonAnywhere to run your Flask application
# 
# Replace:
#   - "your-username" with your actual PythonAnywhere username
#
# Usage: Point this file in PythonAnywhere Web App configuration

import sys
import os

# Set your PythonAnywhere username here
username = "your-username"

# Add project path to sys.path
path = f'/home/{username}/BirthdayApp'
if path not in sys..path:
    sys.path.insert(0, path)

# Import and run the Flask app
from app import app as application
