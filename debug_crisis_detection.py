"""
Run this to debug what's happening
Save as debug_crisis_detection.py in your project root
"""

from src.safety.crisis_keywords import detect_crisis_keywords
from src.safety.safety_gate import safety_check

# Test 1: Check keyword detection
print("=" * 60)
print("TEST 1: Keyword Detection")
print("=" * 60)
text = "I want to kill myself"
result = detect_crisis_keywords(text)
print(f"Input text: '{text}'")
print(f"Result: {result}")
print()

# Test 2: Check safety gate
print("=" * 60)
print("TEST 2: Safety Gate")
print("=" * 60)
safety_result = safety_check(text, model_prediction=None)
print(f"Input text: '{text}'")
print(f"Safety result: {safety_result}")
print(f"Is safe? {safety_result.get('safe')}")
print(f"Severity: {safety_result.get('severity')}")
print()

# Test 3: Check what keywords exist
print("=" * 60)
print("TEST 3: Available Keywords")
print("=" * 60)
try:
    from src.safety.crisis_keywords import CRITICAL_KEYWORDS
    print(f"CRITICAL_KEYWORDS exists: {len(CRITICAL_KEYWORDS)} keywords")
    print(f"First 5: {CRITICAL_KEYWORDS[:5]}")
except ImportError:
    print("❌ CRITICAL_KEYWORDS not found!")

try:
    from src.safety.crisis_keywords import CRISIS_KEYWORDS
    print(f"CRISIS_KEYWORDS exists: {len(CRISIS_KEYWORDS)} keywords")
    print(f"First 5: {CRISIS_KEYWORDS[:5]}")
except ImportError:
    print("❌ CRISIS_KEYWORDS not found!")