# @fohte/blog-publisher-contract

Internal HTTP API contract shared between the `blog-publisher` service and the
`slack-bot` blog plugin. The package exports Zod schemas as the single source
of truth: the service defines routes from them with `@hono/zod-openapi`, and the
plugin derives types with `z.infer` for its typed HTTP client.

## Installation

```sh
pnpm add @fohte/blog-publisher-contract
```

## Usage

```typescript
import { Plan, type Plan as PlanType } from '@fohte/blog-publisher-contract'

const plan: PlanType = Plan.parse(await res.json())
```

## Exported schemas

`Note`, `PlanRequest`, `PlanItem`, `PlanIssue`, `Plan`, `ApplyResult`,
`BlogPrSummary`, `CiStatus` — each exported as both a Zod schema and its inferred
type.
