---
type: Deployment Manifest
title: Kubernetes Pod Configuration
description: Local multi-container Kubernetes Pod configuration exposing separate host ports for the frontend and backend.
resource: /pod.yaml
tags: [k8s, podman, containers, deployment]
timestamp: 2026-06-24
---

# Kubernetes Pod Configuration

Deploys both frontend and backend services inside a single network namespace locally using Podman Play Kube.

## Exposed Ports

* **Host Port 3000**: Exposes the React frontend.
* **Host Port 8000**: Exposes the FastAPI backend.

## In-Pod Networking
Because containers share a single namespace, they share localhost within the Pod. However, since client-side JavaScript executes in the user's browser, requests are routed directly to `http://localhost:8000/api/play` on the host, where the backend exposes port 8000.
