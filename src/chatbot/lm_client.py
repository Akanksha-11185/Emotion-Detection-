import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI
from groq import Groq

def load_env():
    current = Path(__file__).resolve()
    for parent in current.parents:
        env_file = parent / ".env"
        if env_file.exists():
            load_dotenv(env_file)
            return env_file
    raise RuntimeError("Could not find .env file in any parent directory")

ENV_PATH = load_env()

api_key = os.getenv("GROQ_API_KEY")

if not api_key:
    raise RuntimeError(f"GROQ_API_KEY not set even after loading {ENV_PATH}")

client = Groq(api_key=api_key)

SYSTEM_PROMPT = """
You are a supportive, empathetic assistant in an anonymous emotional support app.

Rules:
- Do NOT give medical advice or diagnosis
- Do NOT mention being an AI
- Be calm, supportive, and non-judgmental
- Ask at most ONE gentle follow-up question
- Keep responses concise (2–4 sentences)
"""

def generate_llm_response(user_text, emotion_context):
    prompt = f"""
User emotion context: {emotion_context}

User message:
{user_text}

Respond empathetically.
"""

    response = client.chat.completions.create(
        model="llama-3.1-70b-versatile",

        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        temperature=0.4,
    )

    return response.choices[0].message.content.strip()
