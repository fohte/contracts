# Adding a new contract package

This repo publishes packages to public npm using [trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) via `release-please.yml`. npm requires the package to exist before trusted publishing can be configured, so the first publish is a one-time manual step.

## 1. Create the package directory

Add the new package as a workspace member (see `pnpm-workspace.yaml`), with a `package.json` containing at least:

```json
{
  "name": "@fohte/<package-name>",
  "version": "0.0.0",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  }
}
```

Register the package in `release-please-config.json` and `.release-please-manifest.json`.

## 2. Publish a placeholder to claim the name on npm

```sh
npx setup-npm-trusted-publish @fohte/<package-name>
```

This publishes a minimal placeholder (the README explicitly says "NOT functional, for OIDC setup only"). See [`azu/setup-npm-trusted-publish`](https://github.com/azu/setup-npm-trusted-publish) for details.

If `npm login` is not set up locally, the tool also accepts `NPM_TOKEN` (a short-lived Granular Access Token with write access to the `@fohte` scope, set to expire in 7 days).

## 3. Configure the trusted publisher on npmjs.com

Open the package's access page:

```
https://www.npmjs.com/package/@fohte/<package-name>/access
```

In the **Trusted Publisher** section, click **Add trusted publisher** and enter:

| Field                  | Value                  |
| ---------------------- | ---------------------- |
| Publisher              | GitHub Actions         |
| Organization or user   | `fohte`                |
| Repository             | `contracts`            |
| Workflow filename      | `release-please.yml`   |
| Environment name       | (leave empty)          |

Save.

The CLI equivalent `npm trust github ...` exists but currently returns an opaque `400 Bad Request` with no error message ([npm/cli#9377](https://github.com/npm/cli/issues/9377)) even when account-level 2FA and session login are in place. Use the web UI.

## 4. (Recommended) Disallow token-based publishing

On the same access page, switch publishing access to **Require two-factor authentication and disallow tokens**. Subsequent publishes can then only come from the configured trusted publisher.

## 5. Let release-please ship the real version

Merge the PR that adds the package. `release-please.yml` will open a release PR; merging that PR triggers the `publish` job, which uses OIDC to publish the real version with a provenance attestation.
