
from flask import Flask, render_template, request, jsonify
from detector import SpamDetector, analyze_url

app = Flask(__name__)

# Initialize the SMS spam detector
try:
    detector = SpamDetector()
except Exception as error:
    detector = None
    print(f"Error loading spam detection model: {error}")


@app.route("/")
def index():
    """Display the main website."""
    return render_template("index.html")


@app.get("/api/health")
def health():
    """Check whether the application is running."""
    return jsonify({
        "status": "online",
        "service": "SMS and URL Security Scanner"
    })


@app.post("/api/sms")
def sms():
    """Analyze an SMS message for potential spam."""
    if detector is None:
        return jsonify({
            "error": "The spam detector could not be initialized. Please check the dataset."
        }), 500

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "Invalid request. Please send a JSON object."
        }), 400

    message = str(data.get("message", "")).strip()

    if not message:
        return jsonify({
            "error": "Please enter an SMS message first."
        }), 400

    try:
        result = detector.predict_sms(message)
        return jsonify(result), 200

    except Exception:
        app.logger.exception("SMS analysis failed")
        return jsonify({
            "error": "Unable to analyze this message. Please try again."
        }), 500


@app.post("/api/url")
def url():
    """Check a URL for common suspicious patterns."""
    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "Invalid request. Please send a JSON object."
        }), 400

    value = str(data.get("url", "")).strip()

    if not value:
        return jsonify({
            "error": "Please enter a URL first."
        }), 400

    try:
        result = analyze_url(value)
        return jsonify(result), 200

    except Exception:
        app.logger.exception("URL analysis failed")
        return jsonify({
            "error": "Unable to analyze this URL. Please try again."
        }), 500


@app.errorhandler(404)
def not_found(error):
    """Handle requests to unknown routes."""
    return jsonify({
        "error": "The requested endpoint was not found."
    }), 404


if __name__ == "__main__":
    app.run(debug=True)
