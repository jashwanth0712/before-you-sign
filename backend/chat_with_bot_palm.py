import os
import google.generativeai as palm
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()

palm.configure(api_key=os.getenv("PALM_KEY"))

def chat_with_palm(lists,init_text):
    defaults = {
        'model': 'models/chat-bison-001',
        'temperature': 0.65,
        'candidate_count': 1,
        'top_k': 40,
        'top_p': 0.95,
    }
    context = "You are a legal chatbot that is designed to help a user understand the nuances of a legal document, read the document attached in this message and answer all the queries of the user clearly, remember to always act like the legal chatbot that you are and start with a welcome message to the user by summarizing the key nuances of the document, Your Response To The Document Should Be The welcome message, Document:"+init_text
    examples = []
    messages = ["Introduce Yourself as The legal Chatbot in the next message"]
    for item in lists:
        messages.append(item[1])
    messages.append("NEXT REQUEST")
    response = palm.chat(
        **defaults,
        context=context,
        examples=examples,
        messages=messages
    )
    return response.last

# Driver Code
# if __name__ == "__main__":
#     # Initial message list
#     messages_list = []
#
#     with open('sample.txt', 'r') as file:
#         legal_document = file.read()
#         while True:
#             # Get assistant's response based on the current message list
#             response = chat_with_palm(messages_list,legal_document)
#
#             # Display the assistant's response
#             print(f"Assistant: {response}")
#
#             # Add assistant's response to the list for context in future interactions
#             messages_list.append([0, response])
#
#             # Get user input
#             user_message = input("You: ")
#
#             # Add user message to the list
#             messages_list.append([1, user_message])
#
#             # Check if user wants to continue
#             continue_chat = input("Continue chatting? (yes/no): ").strip().lower()
#             if continue_chat != "yes":
#                 print("Goodbye!")
#                 break