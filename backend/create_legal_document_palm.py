import os
import google.generativeai as palm
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

palm.configure(api_key=os.getenv("PALM_KEY"))

def create_legal_document(prompt_text):
    defaults = {
      'model': 'models/text-bison-001',
      'temperature': 0.25,
      'candidate_count': 1,
      'top_k': 40,
      'top_p': 0.95,
      'max_output_tokens': 1024,
      'stop_sequences': [],
      'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":1},{"category":"HARM_CATEGORY_TOXICITY","threshold":1},{"category":"HARM_CATEGORY_VIOLENCE","threshold":2},{"category":"HARM_CATEGORY_SEXUAL","threshold":2},{"category":"HARM_CATEGORY_MEDICAL","threshold":2},{"category":"HARM_CATEGORY_DANGEROUS","threshold":2}],
    }
    prompt = f"""Create a comprehensive legal document in markdown and return the document in markdown code based on the requirement: {prompt_text}
    """

    response = palm.generate_text(
      **defaults,
      prompt=prompt
    )
    return response.result


# # Driver Code
# if __name__ == "__main__":
#     print(create_legal_document(input("Enter the prompt text: ")))