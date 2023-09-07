from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.tokenize import sent_tokenize
import nltk
nltk.download('punkt')


def action_function(str):
    legal_document = str
    # load the legal document
    # with open('sample.txt', 'r') as file:
    #     legal_document = file.read()

    # Tokenize sentences
    sentences = sent_tokenize(legal_document)

    # Create TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(sentences)

    # Calculate cosine similarity between sentence vectors
    cosine_similarities = cosine_similarity(tfidf_matrix)

    # Identify the most important sentence using cosine similarity sum for each sentence
    sentence_scores = cosine_similarities.sum(axis=1)
    print(sentence_scores)
    # Choose the top N sentences as key sentences
    num_key_sentences = 3  # Choose the number of key sentences you want
    key_sentence_indices = sentence_scores.argsort()[-num_key_sentences:][::-1]

    # Retrieve key sentences
    key_sentences = [sentences[i] for i in key_sentence_indices]
    return key_sentences
