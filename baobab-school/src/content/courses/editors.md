---
title: "Module 1: The Operator's Toolkit"
language: "powershell"
required_patterns:
  - "Get-Service"
  - "Select-Object"
  - "ii" # Invoke-Item
  - ":x"  # Vim's 'save and exit'
---

# The Mission
You have been granted remote access to a "corrupted" workstation in Ngong. 
The GUI is dead. You only have a terminal. 

## Phase 1: PowerShell Recon
PowerShell isn't just about text; it's about **Objects**. 
Use the pipeline to find all services that are currently "Stopped."

**Task:** `Get-Service | Where-Object {$_.Status -eq 'Stopped'}`

## Phase 2: The Nano Hotfix
Now, use Nano to edit the `system.cfg` file and change the `DEBUG_MODE` to `true`.