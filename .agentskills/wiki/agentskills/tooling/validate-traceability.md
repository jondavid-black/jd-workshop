---
type: Script
title: Systems Traceability Auditor (validate_traceability.py)
description: Custom Python script used to audit and map SysML requirements coverage against BDD tests.
tags: [tooling, validation, mbse, python]
timestamp: 2026-06-19T16:35:00Z
---

# Systems Traceability Auditor (validate_traceability.py)

The **`validate_traceability.py`** script parses SysML v2 models and Gherkin reports to compile automated traceability reports.

## 1. Capabilities
- **Baseline Parsing**: Scans `.sysml` files inside `/mbse` for requirements, connection ports, and part decompositions.
- **BDD Mapping**: Scans Gherkin Behave JSON outputs for scenario validation states.
- **Traceability Report**: Combines findings and outputs a comprehensive mapping report under `.agentskills/prd/bdd-sysml-traceability/traceability-report.md`.

## 2. Usage Guide
Exposed under standard validation task:
```bash
task validate-mbse
```
