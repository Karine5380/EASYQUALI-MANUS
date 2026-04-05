"""
Script de construction de la base de connaissances vectorielle (RAG)
Utilise les embeddings OpenAI (text-embedding-3-small) - léger, pas de PyTorch
"""

import os
import sys
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

PDF_PATH = os.environ.get("PDF_PATH", "/home/ubuntu/livret_formation.txt")
VECTOR_STORE_PATH = os.environ.get("VECTOR_STORE_PATH", "./vector_store")


def build_knowledge_base():
    from langchain_community.vectorstores import FAISS
    from langchain_openai import OpenAIEmbeddings
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_core.documents import Document

    logger.info("Lecture du fichier texte...")

    if not os.path.exists(PDF_PATH):
        logger.error(f"Fichier non trouvé: {PDF_PATH}")
        sys.exit(1)

    with open(PDF_PATH, "r", encoding="utf-8") as f:
        text = f.read()

    logger.info(f"Texte lu: {len(text)} caractères")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100,
        separators=["\n\n", "\n", ".", " "]
    )
    chunks = splitter.split_text(text)
    documents = [Document(page_content=chunk) for chunk in chunks]
    logger.info(f"Nombre de chunks: {len(documents)}")

    logger.info("Création des embeddings OpenAI (text-embedding-3-small)...")
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")

    logger.info("Construction du vector store FAISS...")
    vector_store = FAISS.from_documents(documents, embeddings)

    os.makedirs(VECTOR_STORE_PATH, exist_ok=True)
    vector_store.save_local(VECTOR_STORE_PATH)
    logger.info(f"Vector store sauvegardé dans: {VECTOR_STORE_PATH}")
    logger.info("Base de connaissances construite avec succès !")


if __name__ == "__main__":
    build_knowledge_base()
