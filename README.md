# SMS & URL Spam Detector

A professional-looking, beginner-friendly college project using Flask, HTML/CSS/JavaScript, TF-IDF and Logistic Regression.

## Run on Windows in VS Code
1. Extract the ZIP and open the `SMS_URL_Spam_Detector` folder in VS Code.
2. Open Terminal → New Terminal.
3. Create a virtual environment: `py -m venv .venv`
4. Activate it: ` .\.venv\Scripts\Activate.ps1 `
5. If activation is blocked, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`, then activate again.
6. Install packages: `python -m pip install --upgrade pip` then `pip install -r requirements.txt`
7. Start the app: `python app.py`
8. Open `http://127.0.0.1:5000` in your browser.
9. Stop the server with Ctrl+C in the terminal.

To print model evaluation metrics, run `python train_model.py` while the virtual environment is active.

## Files
- `app.py`: Flask server and API endpoints.
- `detector.py`: SMS machine-learning classifier and URL pattern checks.
- `train_model.py`: train/test evaluation metrics.
- `data/sms_dataset.csv`: included teaching dataset.
- `templates/index.html`: frontend structure.
- `static/styles.css`: dashboard design.
- `static/app.js`: frontend/backend connection.

## Limitations
This is an educational prototype. The included SMS dataset is small and metrics may not represent real-world performance. Confidence is not a guarantee. URL inspection uses simple patterns and does not access live reputation databases or visit websites. Never enter passwords, OTPs or other private information into the demo.
