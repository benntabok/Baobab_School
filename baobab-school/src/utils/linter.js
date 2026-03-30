// src/utils/linter.js

const LANGUAGE_RULES = {
  c: {
    required: [/malloc/, /free/, /#include <stdio.h>/],
    forbidden: [/goto/i, /system\("pause"\)/],
    messages: {
      missing_malloc: "Memory Allocation Error: This exercise requires dynamic memory.",
      forbidden_goto: "Bad Practice: 'goto' is not allowed in Baobab systems."
    }
  },
  python: {
    required: [/def\s+\w+\(/, /print\(/],
    forbidden: [/eval\(/, /exec\(/],
    messages: {
      missing_def: "Syntax Error: Python logic must be encapsulated in a function (def).",
      forbidden_eval: "Security Risk: Never use eval() in production-grade Python."
    }
  },
  bash: {
    required: [/^#!\/bin\/bash/, /grep/, /awk/],
    forbidden: [/rm -rf \//],
    messages: {
      missing_shebang: "Script Error: Every Bash script must start with a Shebang (#!)",
      forbidden_danger: "Safety Error: Destructive root commands are blocked."
    }
  }
};

export const runUniversalLinter = (userCode, language) => {
  const rules = LANGUAGE_RULES[language];
  const results = { isValid: true, feedback: [] };

  if (!rules) return { isValid: true, feedback: ["No specific rules for this language."] };

  // Check Required Patterns
  rules.required.forEach(regex => {
    if (!regex.test(userCode)) {
      results.isValid = false;
      results.feedback.push(`Incomplete: Missing ${regex.toString()}`);
    }
  });

  // Check Forbidden Patterns
  rules.forbidden.forEach(regex => {
    if (regex.test(userCode)) {
      results.isValid = false;
      results.feedback.push(`Violation: Remove ${regex.toString()} for better security.`);
    }
  });

  return results;
};