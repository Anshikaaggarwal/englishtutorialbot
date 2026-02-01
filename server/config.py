import os
from dotenv import load_dotenv

load_dotenv()  # loads server/.env

GOOGLE_CLOUD_API_KEY = os.getenv("GOOGLE_CLOUD_API_KEY")

if not GOOGLE_CLOUD_API_KEY:
    raise RuntimeError(
        "GOOGLE_CLOUD_API_KEY is missing. "
        "Add it to server/.env"
    )
