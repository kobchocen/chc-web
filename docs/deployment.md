# Deployment Targets

## Primary production target

The application is prepared for container delivery:

- Docker image built from the repository `Dockerfile`
- Next.js production output uses `standalone`
- K3s deployment should use the Helm chart in `deploy/helm/charts/chc-web`

## Docker

Build locally:

```bash
docker build -t chc-web:local .
```

Run locally:

```bash
docker run --rm -p 3000:3000 chc-web:local
```

## Helm / K3s

The chart expects:

- a container image repository and tag
- optional ingress configuration
- secret-backed runtime variables such as `DATABASE_URL`

Example:

```bash
helm upgrade --install chc-web deploy/helm/charts/chc-web \
  --namespace chc-web \
  --create-namespace \
  --set image.repository=ghcr.io/example/chc-web \
  --set image.tag=latest
```

## GitHub Pages

GitHub Pages is reserved for repository documentation from `docs/`.

Reason:

- the live app relies on Next.js routing plus `next-intl` middleware
- that runtime model is suited to Docker or platform hosting, not static Pages hosting

The Pages workflow publishes the documentation portal, not the application runtime.
