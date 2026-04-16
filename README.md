# Invoices Management MVP (Licenciamento, Invoices, Rateio)

Sistema fullstack focado em processamento de invoices recorrentes de tecnologia com ingestão de e-mails, parsing documental, OCR/IA assistiva, classificação, rateio e revisão humana.

## Stack
- **Backend:** NestJS + TypeScript + Prisma + PostgreSQL + Redis + BullMQ + Zod + Jest
- **Frontend:** Next.js App Router + TypeScript + Tailwind + React Hook Form + Zod + TanStack Query
- **Infra:** Docker Compose (`frontend`, `backend`, `worker`, `postgres`, `redis`)

## Subir com Docker
```bash
cp .env.example .env
docker compose up --build
```

Serviços:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/docs

## Credenciais de teste
- **email:** `admin@local.test`
- **senha:** `admin123`

## Banco / Migrations / Seed
Dentro do container backend:
```bash
npm run prisma:migrate
npm run prisma:seed
```

## Variáveis de ambiente
Veja `.env.example`.

Principais:
- `AI_MODE=mock|openai`
- `OCR_PROVIDER=mock|tesseract`
- `EMAIL_MODE=mock` para testar ingestão sem IMAP real
- `CONFIDENCE_THRESHOLD`

## Fluxo do MVP
1. `POST /email-ingestion/scan` lê e persiste e-mail/attachments
2. Cria invoice com status `received`
3. `POST /invoices/:id/process` roda parser + IA + sugestão de rateio
4. Baixa confiança/sem centro de custo => `review_required` + `ReviewTask`
5. Fila de revisão em `GET /review/queue`

## Limitações do MVP
- IMAP em modo stub/mocked por padrão (`EMAIL_MODE=mock`)
- OCR tesseract deixado com fallback mock para ambiente local previsível
- Provider OpenAI preparado por interface/configuração, mantendo default mock
- Conciliação implementada no modelo de dados; fluxo avançado pode ser evoluído

## Próximos passos
- Adicionar autenticação JWT protegendo rotas críticas
- Worker consumindo fila BullMQ para processamento assíncrono real
- Conector Gmail API e parser de PDF/OCR completo em produção
- CRUDs no frontend com formulários para regras e centros de custo
