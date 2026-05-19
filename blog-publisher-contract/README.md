# @fohte/blog-publisher-contract

Internal HTTP API contract shared between the `blog-publisher` service and the
`slack-bot` blog plugin. The package exports Zod schemas as the single source
of truth: the service defines routes from them with `@hono/zod-openapi`, and the
plugin derives types with `z.infer` for its typed HTTP client.

## Installation

The package is published to GitHub Packages under the `@fohte` scope. Copy
[`.npmrc.example`](./.npmrc.example) to the consumer repository root as `.npmrc`
and provide `NODE_AUTH_TOKEN` (a GitHub token with the `read:packages` scope):

```
@fohte:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then install:

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
