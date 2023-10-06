import os
import google.generativeai as palm
import json
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

palm.configure(api_key=os.getenv("PALM_KEY"))
def action_function(legal_document_text):
    defaults = {
        'model': 'models/text-bison-001',
        'temperature': 0.25,
        'candidate_count': 1,
        'top_k': 40,
        'top_p': 0.95,
        'max_output_tokens': 1024,
        'stop_sequences': [],
        'safety_settings': [{"category": "HARM_CATEGORY_DEROGATORY", "threshold": 1},
                            {"category": "HARM_CATEGORY_TOXICITY", "threshold": 1},
                            {"category": "HARM_CATEGORY_VIOLENCE", "threshold": 2},
                            {"category": "HARM_CATEGORY_SEXUAL", "threshold": 2},
                            {"category": "HARM_CATEGORY_MEDICAL", "threshold": 2},
                            {"category": "HARM_CATEGORY_DANGEROUS", "threshold": 2}],
    }
    prompt = f"""Output all the key sentences that are really important in a legal perspective as a proper JSON array like ["sentence1","sentence2"....], say or do nothing else, just output the list without using any newline charcters in the response Document: {legal_document_text}
        """

    response = palm.generate_text(
        **defaults,
        prompt=prompt
    )
    return json.loads(response.result)

# with open('sample.txt', 'r') as file:
#   legal_document = file.read()
#   print(action_function(legal_document))