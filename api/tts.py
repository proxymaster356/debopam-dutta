import json
from http.server import BaseHTTPRequestHandler
import io
import traceback
import sys

# Try to import KittenTTS
try:
    from kittentts import KittenTTS
    import soundfile as sf
    # Initialize the model globally so it stays warm between requests
    tts_model = KittenTTS("KittenML/kitten-tts-nano-0.8-int8")
except Exception as e:
    tts_model = None
    init_error = str(e)

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            text = data.get("text", "No text provided")
            
            if not tts_model:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": f"Failed to initialize TTS model: {init_error}"}).encode('utf-8'))
                return

            # Generate audio buffer
            audio = tts_model.generate(text, voice="Jasper")
            
            # Write audio to an in-memory bytes buffer as a WAV file
            wav_io = io.BytesIO()
            sf.write(wav_io, audio, 24000, format='WAV')
            wav_io.seek(0)
            
            self.send_response(200)
            self.send_header('Content-type', 'audio/wav')
            self.end_headers()
            self.wfile.write(wav_io.read())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_details = traceback.format_exc()
            print("TTS Error:", error_details, file=sys.stderr)
            self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
