# How to Add Pencil MCP to Cursor

Connect Cursor to Pencil (design/prototyping) via the Model Context Protocol so the AI can work with design files and sketch-to-code workflows.

---

## Option 1: Via Cursor Settings (easiest)

1. Open **Cursor Settings**: `Cmd + ,` (Mac) or `Ctrl + ,` (Windows/Linux).
2. Go to **Tools & MCP** (or search for "MCP").
3. Click **Add new MCP server**.
4. Fill in:
   - **Name:** `pencil` (or `open-pencil`)
   - **Command:** `openpencil-mcp` (if you installed OpenPencil’s MCP globally — see below)  
     **or**  
     **Command:** `npx` with **Args:** `["-y", "@open-pencil/mcp"]` (if using npx).
5. Save. **Fully quit and reopen Cursor** so the new server loads.

---

## Option 2: Via config file

### Where the config lives

- **This project only:** `.cursor/mcp.json` in the project root (commit it to share with the team).
- **All projects:** `~/.cursor/mcp.json` in your home directory.

Project and global configs are merged; project wins if the same server name exists in both.

### Install / choose Pencil MCP (pick one)

**Option 1: Pencil desktop app (macOS)** — Use the MCP server bundled with the installed Pencil.app:

```json
"pencil": {
  "command": "/Applications/Pencil.app/Contents/Resources/app.asar.unpacked/out/mcp-server-darwin-arm64",
  "args": ["--app", "desktop"],
  "env": {},
  "description": "Pencil desktop app MCP"
}
```

Requires [Pencil](https://pencil.dev) installed at `/Applications/Pencil.app`. Restart Cursor after adding.

**Option 2: OpenPencil (npm) — design automation, .fig files:**

```bash
# Option A: global install (then use command "openpencil-mcp")
bun add -g @open-pencil/mcp

# Option B: use npx (no global install)
# No install; use npx in config below
```

### Add the server to `.cursor/mcp.json`

Create or edit `.cursor/mcp.json` in this project:

**If you ran `bun add -g @open-pencil/mcp`:**

```json
{
  "mcpServers": {
    "pencil": {
      "command": "openpencil-mcp",
      "description": "Pencil/OpenPencil design canvas – read/edit .fig files, sketch-to-code"
    }
  }
}
```

**If you prefer npx (no global install):**  
Use the **bin name** `openpencil-mcp` so npx knows what to run:

```json
{
  "mcpServers": {
    "pencil": {
      "command": "npx",
      "args": ["-y", "-p", "@open-pencil/mcp", "openpencil-mcp"],
      "description": "Pencil/OpenPencil design canvas – read/edit .fig files, sketch-to-code"
    }
  }
}
```

Save the file, then **fully quit and reopen Cursor**.

---

## Verify

1. Open **Cursor Settings → Tools & MCP**.
2. Confirm **pencil** (or **open-pencil**) appears in the list.
3. Turn it **on** (enabled).
4. Optional: **View → Output**, choose “MCP” in the dropdown to see logs.

---

## Troubleshooting

- **"could not determine executable to run"** — The package exposes the binary `openpencil-mcp`, not the package name. Use `"args": ["-y", "-p", "@open-pencil/mcp", "openpencil-mcp"]` (with the bin name at the end), or install globally and use `"command": "openpencil-mcp"`.
- **Server won’t start** — Try a global install: `bun add -g @open-pencil/mcp` or `npm install -g @open-pencil/mcp`, then set `"command": "openpencil-mcp"` with no `args`.
- **MCP logs** — View → Output → choose "MCP" to see connection errors.

## Notes

- **Restart required:** Cursor only loads MCP config on startup. After changing `mcp.json` or adding a server in Settings, quit and reopen Cursor.
- **Tool count:** Enabling many MCPs uses more context. Enable only what you need; you can disable Pencil when not doing design work.
- **Two products:**  
  - **OpenPencil** (`@open-pencil/mcp`) — MCP server you add as above.  
  - **Pencil app** (pencil.dev) — desktop app that may run its own MCP; see pencil.dev docs for that setup.

---

## Reference

- [Cursor MCP docs](https://cursor.com/help/customization/mcp)
- OpenPencil MCP: [openpencil.dev](https://openpencil.dev) (programmable / MCP server section)
