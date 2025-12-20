import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

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
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt},
        ],
        temperature=0.4,
    )

    return response.choices[0].message.content.strip()
