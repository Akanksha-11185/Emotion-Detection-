# Emotion-Detection-

# AI-Based Text Emotion Detection & Mental Health Support System

## 1. Project Overview

This project is an AI-powered text-based emotion detection and anonymous mental health support system designed for early identification of emotional distress. The system analyzes user text messages in real time, predicts emotional states using a fine-tuned transformer model, and activates safety mechanisms when high-risk content is detected.

The application is designed with privacy-first principles, ensuring anonymity while still enabling responsible escalation for critical situations. It combines modern NLP techniques, a secure backend infrastructure, and an admin review workflow to support both users and moderators effectively.

---

## 2. System Architecture

The system follows a modular client–server architecture designed for scalability and safety.

- **Frontend**: A web-based chat interface allows users to submit text messages anonymously. An admin dashboard is provided for reviewing escalated cases.
- **Backend API**: Built using FastAPI, the backend handles request validation, rate limiting, emotion inference, safety checks, and logging.
- **Emotion Detection Module**: A transformer-based NLP model processes user text and predicts emotion probabilities in real time.
- **Safety & Escalation Layer**: High-risk content is automatically flagged and stored for admin review while maintaining user anonymity.
- **Admin Review System**: Authorized admins can view flagged messages and mark them as reviewed via a dedicated dashboard.

This layered architecture ensures separation of concerns, easier debugging, and safer handling of sensitive user data.

---

## 3. Backend Infrastructure

The backend is implemented using FastAPI and is responsible for handling all core application logic. It exposes RESTful endpoints for chat processing, emotion prediction, health checks, and admin operations. The backend is designed to be stateless, lightweight, and easily deployable.

Key responsibilities include request validation, API key verification, rate limiting, invoking the machine learning model for inference, applying safety checks, and logging relevant events for audit and debugging purposes.

---

## 4. Chat Processing Pipeline

The chat processing flow follows a clear and deterministic pipeline:

1. User submits a text message via the frontend chat interface.
2. The backend validates the request and applies rate limiting.
3. Text preprocessing is applied to clean and normalize input.
4. The emotion detection model predicts emotion probabilities.
5. A safety gate evaluates the predicted emotions and message content.
6. If the message is high-risk, it is escalated and logged.
7. A response is generated and returned to the user.

This pipeline ensures consistent behavior, low latency, and safe handling of sensitive inputs.

---

## 5. Emotion Detection Model

The system uses a transformer-based NLP model fine-tuned on the GoEmotions dataset. The model is based on a RoBERTa architecture, chosen for its strong performance on contextual emotion classification tasks.

The model outputs probability scores across multiple emotion classes. These scores are used both for user-facing responses and internal safety decisions. Trained model artifacts are stored locally and loaded at runtime to avoid unnecessary retraining.

---

## 6. Safety Gate & Escalation Flow

A safety gate is applied after emotion prediction to detect potentially harmful or high-risk messages. Messages with strong indicators of distress or self-harm are automatically flagged.

Flagged messages are:
- Hashed to preserve anonymity
- Stored securely for review
- Marked with a severity level
- Exposed only through admin-specific endpoints

This mechanism ensures user safety while respecting privacy constraints.

---

## 7. Rate Limiting & Security

To prevent abuse and ensure system stability, the backend implements rate limiting per client. API key verification is enforced for protected endpoints to restrict unauthorized access.

Security considerations include:
- No storage of personally identifiable information
- Environment-based configuration for secrets
- Controlled admin-only access to escalation data

---

## 8. Logging Pipeline

The system maintains structured logs for critical events such as requests, escalations, errors, and admin actions. Logs are written in a consistent format to support debugging, monitoring, and future analytics.

Logging is designed to balance observability with privacy, ensuring sensitive user content is never stored in raw form.

---

## 9. Environment Variables & Setup

The application relies on environment variables for configuration, including API keys, rate limits, and environment mode settings. A `.env.example` file is provided to document required variables without exposing secrets.

This approach allows safe configuration across development, testing, and deployment environments.

---

## 10. Admin Review Dashboard

An admin review dashboard is implemented to support manual verification of escalated messages. The dashboard displays flagged messages along with timestamps and severity levels and provides an option to mark cases as reviewed.

This human-in-the-loop design ensures responsible handling of critical situations and prevents fully automated decision-making for sensitive cases.

---

## 11. Deployment Readiness

The project is structured for containerized deployment. Docker and Docker Compose configurations are prepared to support running the backend services and supporting components such as Redis for rate limiting.

The modular design allows the system to be deployed locally, on cloud platforms, or within institutional infrastructure with minimal changes.
