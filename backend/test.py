from dropbox import send_signature_request
from dropbox_sign import  models
from dotenv import load_dotenv
import os
load_dotenv()

api_key = os.getenv("DROPBOX_KEY")
signers = [
    models.SubSignatureRequestSigner(
        email_address="cs20b1007@iiitdm.ac.in",
        name="Jash",
        order=0,
    ),
    models.SubSignatureRequestSigner(
        email_address="jashwanth0712@gmail.com",
        name="Jill",
        order=1,
    ),
]
cc_email_addresses = [
    "lawyer1@dropboxsign.com",
    "lawyer2@dropboxsign.com",
]
files = [open("jashwanthleave_13sep.pdf", "rb")]
metadata = {
    "custom_id": 1234,
    "custom_text": "NDA #9",
}
test_mode = True

# Define title, subject, and message
title = "NDA with Acme Co."
subject = "The NDA we talked about"
message = "jashwanth"

# Call the reusable function with title, subject, and message
send_signature_request(api_key, signers, cc_email_addresses, files, metadata, test_mode, title, subject, message)
