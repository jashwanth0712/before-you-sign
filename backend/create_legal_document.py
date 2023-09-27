import os
import openai
from dotenv import load_dotenv

load_dotenv()

openai.api_key = os.getenv("OPENAI_KEY")

def create_legal_document(prompt_text):
    output = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages=[{"role": "system","content": "Create a comprehensive legal document in markdown and return the document in markdown code based on the requirements given below"},
                  {"role": "user", "content": prompt_text}],
        temperature=0.5
    )
    return output["choices"][0]["message"]["content"]

# # Driver Code
# if __name__ == "__main__":
#     print(create_legal_document(input("Enter the prompt text: ")))
