# i18n Preparation Guide

> Guide for extending the existing Jugalbandi translations; analysis-language quality requires separate evaluation.

## Current State

- UI uses the existing custom JSON translation hooks with locale files in `messages/`
- Content language preference stored via `LanguageProvider`
- Configured: en, es, zh, ja, pt, fr, ko (pt loads pt-BR.json)

## Translation File Location

```
apps/frontend/messages/
├── en.json
├── es.json
├── zh.json
├── ja.json
├── pt-BR.json
├── fr.json
└── ko.json
```

## Adding New Locale

1. Create `messages/{locale}.json`
2. Add locale to `i18n/config.ts`:
   ```typescript
   export const locales = ['en', 'es', 'zh', 'ja', 'pt', 'fr', 'ko', 'de'] as const;
   ```
3. Register the JSON import in `lib/i18n/messages.ts`; update names/flags and ensure every locale has identical key structure.
4. Inspect backend content-language validation separately; a UI locale is not automatically a new supported analysis language.

## Translation Keys

```json
{
  "dashboard": {
    "title": "Dashboard",
    "masterResume": "Master Resume"
  },
  "builder": {
    "save": "Save",
    "download": "Download PDF"
  }
}
```

## Usage in Components

```tsx
import { useTranslations } from '@/lib/i18n';

export function MyComponent() {
  const { t } = useTranslations();
  return <h1>{t('dashboard.title')}</h1>;
}
```

## Content Language vs UI Language

- **UI Language:** Controlled by the existing JSON hooks and `LanguageProvider`, affects interface text
- **Content Language:** Controlled by `LanguageProvider`, affects LLM-generated content (cover letters, tailored resumes)

## Backend i18n (Future)

Historical expansion ideas below are not current implementation instructions. Existing prompts already receive content-language guidance; inspect `app/prompts/templates.py` before extending them:
1. Create `app/i18n/locales/{lang}.json`
2. Add language parameter to prompt templates
3. Pass `Accept-Language` header from frontend
