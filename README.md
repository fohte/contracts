# contracts

@fohte's personal monorepo of shared HTTP API contract packages.

Each package defines the request/response shape of an HTTP API as Zod schemas, so the server and its clients can derive both runtime validators and TypeScript types from a single source of truth.

## Packages

| Package                                                       | Description                                                                    |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [`@fohte/blog-publisher-contract`](./blog-publisher-contract) | Contract between the `blog-publisher` service and the `slack-bot` blog plugin. |

All packages are published to public npm under the `@fohte` scope.

## Development

The repo is a pnpm workspace. Tool versions are pinned with [mise](https://mise.jdx.dev/).

```sh
mise install        # install Node and pnpm
pnpm install        # install workspace dependencies
pnpm test           # run tests across all packages
pnpm format         # run eslint --fix and prettier --write
```

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). `feat`, `fix`, `perf`, `deps`, and `revert` drive releases; `chore`, `docs`, `style`, `refactor`, `test`, `build`, and `ci` are hidden from changelogs.

## Releases

Releases are automated by [release-please](https://github.com/googleapis/release-please) in manifest mode (`release-please-config.json`, `.release-please-manifest.json`):

1. Merging conventional commits to `main` updates the release PR opened by `release-please.yml`.
2. Merging the release PR tags the new version and triggers the `publish` job.
3. `publish` runs `pnpm -r publish --provenance` using npm [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC). No long-lived `NPM_TOKEN` is stored.

The `release-please` job authenticates to GitHub via [octo-sts](https://github.com/octo-sts/app) (`octo-sts.fohte.net`) instead of a personal access token.

## Docs

- [Adding a new package](./docs/adding-a-new-package.md) — one-time manual steps to register a new package's trusted publisher on npmjs.com before release-please can publish it.
