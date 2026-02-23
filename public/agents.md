---
name: open-audio-protocol
version: 1.0
description: The global music database—decentralized protocol for storage, streaming, and programmable distribution
homepage: https://openaudio.org
---

# Open Audio Protocol

Read this file to understand the Open Audio Protocol. For validator and go-openaudio operations, read [skill.md](https://openaudio.org/skill.md).

## Purpose

The Open Audio Protocol is the Global Music Database: the largest open, programmable music catalog. It enables storage, streaming, programmable sale, and access control for music. Developers can build applications with their own UI and business model without sourcing catalog data or rebuilding music infrastructure. The protocol is community-run, transparent, and open-source.

## Quick Reference

| Resource              | URL                                             |
| --------------------- | ----------------------------------------------- |
| Docs                  | https://docs.openaudio.org                      |
| Staking               | https://staking.openaudio.org                   |
| Explorer              | https://explorer.openaudio.org                  |
| GitHub Org            | https://github.com/OpenAudio                    |
| go-openaudio          | https://github.com/OpenAudio/go-openaudio       |
| skill.md (validators) | https://openaudio.org/skill.md                  |
| llms.txt (AI/LLM)     | https://openaudio.org/llms.txt                  |
| Run a Node            | https://docs.openaudio.org/tutorials/run-a-node |
| Dashboard (nodes)     | https://dashboard.audius.org                    |
| Audius (API/SDK)      | https://audius.co                               |
| Audius agents.md      | https://audius.co/agents.md                     |
| Audius skill.md       | https://audius.co/skill.md                      |
| Audius llms.txt       | https://audius.co/llms.txt                      |

## OAP vs Audius

| Layer                   | Description                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Open Audio Protocol** | Protocol layer: decentralized storage, streaming, consensus, staking, governance. Use for protocol development, running nodes, direct integration. |
| **Audius**              | Application built on OAP: custom frontend, API, developer toolkits. Use for building music players, apps, or when you want ready-made APIs.        |

When building a music player or frontend, Audius offers a fast path: REST API ([api.audius.co](https://api.audius.co)), [@audius/sdk](https://www.npmjs.com/package/@audius/sdk), and [create-audius-app](https://docs.audius.co/developers/guides/create-audius-app). See [audius.co/agents.md](https://audius.co/agents.md) and [audius.co/skill.md](https://audius.co/skill.md).

**Audius is optional.** You can integrate with OAP entirely on your own: run your own indexer and API servers using go-openaudio, or build directly against the protocol. Audius is a viable, well-documented option—not a requirement.

## Core Concepts

### Wire Protocol

OAP extends [DDEX](https://ddex.net/standards/) with cryptographic primitives (addresses, signing) for permissionless operation. Implemented in protobuf via [ddex-proto](https://github.com/OpenAudio/ddex-proto). Messages flow through node RPC, broadcast via gossip, proposed in blocks by validators, committed after consensus.

- **ERN** (Electronic Release Notification): Parties, resources, releases, deals. Primary message type.
- **MEAD** (Media Enrichment and Description): Mood, genre, lyrics, enrichment metadata.
- **PIE** (Party Identification and Enrichment): Biographical data, social links, cross-platform IDs.

[Full docs](https://docs.openaudio.org/concepts/wire-protocol)

### Validators

Software infrastructure providers that run validator nodes. Minimum bond: 200,000 $AUDIO. Earn a share of the 7% annual reward rate. Run consensus (Core) and storage (Mediorum). Node registration lives on Ethereum mainnet. Implementations: [go-openaudio](https://github.com/OpenAudio/go-openaudio).

[Full docs](https://docs.openaudio.org/concepts/validators)

### Staking

Stake $AUDIO directly (register validator) or delegate to an operator. 7% annual reward rate, claimable weekly. Unstaking: 7-day cooldown. Validators: 200k–15M $AUDIO per node. Slashing via governance for negligence.

[Full docs](https://docs.openaudio.org/concepts/staking)

### Artist Coins

Fan-club tokens on Solana and Meteora. Bonding curve vs $AUDIO, AMM graduation. Used for gated releases, reward pools, fan engagement. 1B supply, 100k $AUDIO initial cap, graduation at 1M $AUDIO. [Audius launchpad](https://audius.co/coins).

[Full docs](https://docs.openaudio.org/concepts/artist-coins)

### Media Storage (Mediorum)

Elastic storage. Per-node commitment: (S × R) / N (S=total storage, R=replication factor, N=number of nodes). Rendezvous hashing for placement. Storage proofs and slashing.

[Full docs](https://docs.openaudio.org/concepts/media-storage)

### Governance

$AUDIO holders vote on onchain proposals. Controls tokenomics, staking params, node software versions. 72h voting, 24h cooldown, 5% quorum, 50% majority. [Dashboard](https://dashboard.audius.org/#/governance), [Etherscan](https://etherscan.io/address/0x4DEcA517D6817B6510798b7328F2314d3003AbAC).

[Full docs](https://docs.openaudio.org/concepts/governance)

### Moderation

Validators specify a moderation party for DMCA and content moderation. Default: Tiki Labs. [Contract](https://etherscan.io/address/0x6f08105c8CEef2BC5653640fcdbBE1e7bb519D39).

[Full docs](https://docs.openaudio.org/concepts/moderation)

### $AUDIO

Governance and security token. Solana: `9LzCMqDgTKYz9Drzqnpgee3SGa89up3a247ypMj2xrqM`. Ethereum: `0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998`. Fixed genesis: 1B.

[Full docs](https://docs.openaudio.org/concepts/audio)

## Tutorials Index

| Tutorial            | URL                                                      |
| ------------------- | -------------------------------------------------------- |
| Run a Node          | https://docs.openaudio.org/tutorials/run-a-node          |
| Launch Artist Coins | https://docs.openaudio.org/tutorials/launch-artist-coins |
| Create Reward Pools | https://docs.openaudio.org/tutorials/create-reward-pools |
| Gate Release Access | https://docs.openaudio.org/tutorials/gate-release-access |

## Reference

### Ethereum Contracts

[github.com/OpenAudio/eth-contracts](https://github.com/OpenAudio/eth-contracts). Key contracts (mainnet):

| Contract               | Address                                    |
| ---------------------- | ------------------------------------------ |
| $AUDIO                 | 0x18aAA7115705e8be94bfFEBDE57Af9BFc265B998 |
| Staking                | 0xe6D97B2099F142513be7A2a068bE040656Ae4591 |
| DelegateManager        | 0x4d7968ebfD390D5E7926Cb3587C39eFf2F9FB225 |
| Governance             | 0x4DEcA517D6817B6510798b7328F2314d3003AbAC |
| ServiceProviderFactory | 0xD17A9bc90c582249e211a4f4b16721e7f65156c8 |
| Registry               | 0xd976d3b4f4e22a238c1A736b6612D22f17b6f64C |

[Full reference](https://docs.openaudio.org/reference/ethereum-contracts)

### Solana Programs

[github.com/OpenAudio/solana-programs](https://github.com/OpenAudio/solana-programs). Claimable Tokens, Payment Router, Reward Manager, Staking Bridge.

[Full reference](https://docs.openaudio.org/reference/solana-programs)

### Audits

All contracts and programs are audited. Zellic, Neodyme, Kudelski, OpenZeppelin. [Audits list](https://docs.openaudio.org/reference/audits), [bug bounty](https://openaudio.org/security).

## Developer Paths

| Goal                                      | Path                                                                                                                                                                                                                                                      |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Music player, app, frontend (fast path)   | Use [Audius API](https://api.audius.co) and [@audius/sdk](https://www.npmjs.com/package/@audius/sdk). Start with [create-audius-app](https://docs.audius.co/developers/guides/create-audius-app). See [audius.co/agents.md](https://audius.co/agents.md). |
| Music player, app (self-hosted)           | Run your own indexer and API via [go-openaudio](https://github.com/OpenAudio/go-openaudio). No Audius dependency. See [skill.md](https://openaudio.org/skill.md).                                                                                         |
| Run a node, validator                     | Read [skill.md](https://openaudio.org/skill.md). Follow [Run a Node](https://docs.openaudio.org/tutorials/run-a-node).                                                                                                                                    |
| Protocol integration, custom distribution | Use go-openaudio SDK, ddex-proto, RPC. See [skill.md](https://openaudio.org/skill.md) examples.                                                                                                                                                           |
| Artist coins, rewards                     | Use Solana programs, [docs.openaudio.org](https://docs.openaudio.org).                                                                                                                                                                                    |

## All Links

| Resource          | URL                                             |
| ----------------- | ----------------------------------------------- |
| Docs              | https://docs.openaudio.org                      |
| Blog              | https://docs.openaudio.org/blog                 |
| Staking           | https://staking.openaudio.org                   |
| Explorer          | https://explorer.openaudio.org                  |
| GitHub Org        | https://github.com/OpenAudio                    |
| go-openaudio      | https://github.com/OpenAudio/go-openaudio       |
| eth-contracts     | https://github.com/OpenAudio/eth-contracts      |
| solana-programs   | https://github.com/OpenAudio/solana-programs    |
| Run a Node        | https://docs.openaudio.org/tutorials/run-a-node |
| skill.md          | https://openaudio.org/skill.md                  |
| llms.txt          | https://openaudio.org/llms.txt                  |
| Audius (app)      | https://audius.co                               |
| Audius agents.md  | https://audius.co/agents.md                     |
| Audius skill.md   | https://audius.co/skill.md                      |
| Audius llms.txt   | https://audius.co/llms.txt                      |
| Audius API        | https://api.audius.co                           |
| Audius Docs       | https://docs.audius.co                          |
| Dashboard (nodes) | https://dashboard.audius.org                    |

## Skill File

For validator setup, go-openaudio, devnet, and examples: [https://openaudio.org/skill.md](https://openaudio.org/skill.md)
