"""
Script de construction de la base de connaissances vectorielle (RAG)
à partir du livret de formation PDF.
Utilise des embeddings locaux via sentence-transformers (multilingual).
"""

import os
import sys
from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

PDF_PATH = "/home/ubuntu/livret_formation.pdf"
VECTOR_STORE_PATH = "/home/ubuntu/telegram_coach_bot/vector_store"
EMBEDDING_MODEL = "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2"


def build_knowledge_base():
    print("=== Construction de la base de connaissances ===")
    print(f"Chargement du PDF : {PDF_PATH}")

    # Charger le PDF
    loader = PyPDFLoader(PDF_PATH)
    documents = loader.load()
    print(f"  -> {len(documents)} pages chargées")

    # Découper en chunks
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        separators=["\n\n", "\n", ".", "!", "?", ",", " ", ""],
    )
    chunks = text_splitter.split_documents(documents)
    print(f"  -> {len(chunks)} chunks créés")

    # Créer les embeddings locaux (multilingues, fonctionne bien en français)
    print(f"Chargement du modèle d'embeddings : {EMBEDDING_MODEL}")
    embeddings = HuggingFaceEmbeddings(
        model_name=EMBEDDING_MODEL,
        model_kwargs={"device": "cpu"},
        encode_kwargs={"normalize_embeddings": True},
    )

    print("Construction de l'index FAISS...")
    vector_store = FAISS.from_documents(chunks, embeddings)

    # Sauvegarder
    os.makedirs(VECTOR_STORE_PATH, exist_ok=True)
    vector_store.save_local(VECTOR_STORE_PATH)
    print(f"  -> Base de connaissances sauvegardée dans : {VECTOR_STORE_PATH}")
    print("=== Construction terminée avec succès ! ===")


if __name__ == "__main__":
    build_knowledge_base()
