---
name: go-openaudio
version: 1.0
description: Go implementation of the Open Audio Protocol—run validators, RPC nodes, and local devnet
homepage: https://openaudio.org
metadata: {"repo": "https://github.com/OpenAudio/go-openaudio", "docker": "openaudio/go-openaudio"}
---

# go-openaudio Skill

This file provides agentic context for running and developing with the go-openaudio validator implementation. For high-level protocol context, read [agents.md](https://openaudio.org/agents.md) first.

## Overview

go-openaudio is the Go implementation of the Open Audio Protocol. It runs as a single Docker container combining:
- **Core**: CometBFT-based consensus and sync layer
- **Mediorum**: Content storage (audio files, metadata)
- **ETH Bridge**: Ethereum L1 registry sync (staking, node registration)

Validators earn staking rewards by committing storage and serving traffic. RPC nodes provide data without storage commitments.

## Quickstart

```bash
docker run --rm -it \
  -p 80:80 \
  -p 443:443 \
  -p 26656:26656 \
  -e OPENAUDIO_TLS_SELF_SIGNED=true \
  -e OPENAUDIO_STORAGE_ENABLED=false \
  openaudio/go-openaudio:stable

# In another terminal
open https://localhost/console/overview
```

## Run a Validator

Validators are registered on-chain, earn staking rewards, and must commit file storage. Minimum bond: 200,000 $AUDIO.

### Specs
- 16GB memory, 8 CPU cores, 200GB boot disk
- Datacenter-grade network
- S3-compatible blob storage (recommended over disk)

### Setup

**1. Provision keypair (Ethereum secp256k1):**
```bash
pip install eth-keys
python -c "from eth_keys import keys;import os;p=keys.PrivateKey(os.urandom(32));print('delegateOwnerWallet=',p.public_key.to_checksum_address(),'\ndelegatePrivateKey=',p.to_hex(),sep='')"
```

**2. Create .env:**
```
nodeEndpoint=https://my-node.com
delegateOwnerWallet=0x...
delegatePrivateKey=...
spOwnerWallet=0x...

# Blob storage (example: AWS S3)
OPENAUDIO_STORAGE_DRIVER_URL=s3://my-s3-bucket
AWS_REGION=us-west-2
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

**3. docker-compose.yml:**
```yaml
services:
  my-node:
    image: openaudio/go-openaudio:stable
    container_name: my-node
    env_file: [.env]
    volumes: [/root/openaudio-prod-data:/data]
    ports: [80:80, 443:443, 26656:26656]
  watchtower:
    image: containrrr/watchtower
    volumes: [/var/run/docker.sock:/var/run/docker.sock]
    command: --cleanup my-node
```

**4. Run and monitor:**
```bash
docker compose up -d
curl my-node.com/health-check
# Or visit https://my-node.com/console
```

**5. Register on-chain:** [Audius Protocol Dashboard](https://dashboard.audius.org/#/nodes) → Nodes → Register New Node. Fill `nodeEndpoint`, `delegateOwnerWallet`, stake amount. Sign transactions.

### Blob Storage Providers
Supported via go-cdk: AWS S3, GCP Cloud Storage, Cloudflare R2, Vultr, Digital Ocean Spaces, Backblaze B2. See [docs.openaudio.org/tutorials/run-a-node](https://docs.openaudio.org/tutorials/run-a-node) for config examples.

## Run an RPC Node

RPC nodes do not commit storage. Set `spOwnerWallet` same as `delegateOwnerWallet`. No storage driver required. Use for off-chain products that need read-only protocol data.

## Architecture

| Component | Purpose | Ports |
|-----------|---------|-------|
| Core | Consensus, blocks, transactions | 26656 (P2P), 26657 (RPC), 26659 (API) |
| Mediorum | Blob storage, transcoding | 1991 |
| ETH Bridge | Ethereum registry sync | - |
| API | gRPC/Connect (CoreService, StorageService, etc.) | 50051 |
| Console | Web UI (blocks, nodes, uptime) | /console/ |

Health check: `/health-check` returns JSON with `live`, `ready`, core, storage status.

## Local Development

Prerequisites: Docker, Docker Compose, Go v1.25. Run `make install-deps` for the rest.

**Add hosts:**
```bash
echo "127.0.0.1 node1.oap.devnet node2.oap.devnet node3.oap.devnet node4.oap.devnet" | sudo tee -a /etc/hosts
```

**Optional (green SSL):**
```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain dev/tls/cert.pem
```

**Start devnet:**
```bash
make up
```

**Dev nodes:**
- https://node1.oap.devnet, node2, node3, node4
- Console: `/console`, `/console/nodes`, `/console/uptime`
- Smoke: `curl -s https://node1.oap.devnet/core/nodes | jq`

**Stop:** `make down`

**Peer with prod:**
```bash
docker run --rm -it -p 80:80 -p 443:443 -e NETWORK=prod openaudio/go-openaudio:dev
```

## Configuration (Env Vars)

| Var | Purpose |
|-----|---------|
| nodeEndpoint | Public URL for this node |
| delegateOwnerWallet | Node keypair address |
| delegatePrivateKey | Node keypair private key |
| spOwnerWallet | Staking wallet (validators); same as delegate for RPC |
| OPENAUDIO_STORAGE_DRIVER_URL | file://, s3://, gs:// |
| NETWORK | prod, stage, dev |

## Examples

All examples require devnet (`make up`). Run with `go run ./examples/{example}/main.go`.

| Example | Purpose |
|---------|---------|
| upload | Upload content to the network |
| upload-resumable | Resumable uploads |
| indexer | Index blockchain data |
| block-stream | Stream blocks |
| rewards | Query rewards |
| programmable-distribution | Custom distribution (e.g. geolocation-gated streaming) |

Programmable distribution: `make example/programmable-distribution` or `go run ./examples/programmable-distribution -validator node3.oap.devnet -port 8800`.

## SDK

`pkg/sdk/` provides Go clients: `sdk.go`, `release.go`, `rewards/`, `mediorum/`. Use for building apps against the protocol.

## Build & Test

```bash
make bin/openaudio-native   # Native binary
make docker-dev            # Dev Docker image
make test                  # All tests
make test-unit             # Unit only
make test-integration      # Integration only
make test-mediorum         # Storage tests
make lint
```

## Links

| Resource | URL |
|----------|-----|
| Repository | https://github.com/OpenAudio/go-openaudio |
| Docker Hub | https://hub.docker.com/r/openaudio/go-openaudio/tags |
| Run a Node (full guide) | https://docs.openaudio.org/tutorials/run-a-node |
| Protocol docs | https://docs.openaudio.org |
| llms.txt (AI overview) | https://openaudio.org/llms.txt |
| Dashboard (register nodes) | https://dashboard.audius.org/#/nodes |
