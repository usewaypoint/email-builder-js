# @usewaypoint/mcp-server

MCP (Model Context Protocol) server for building email templates with the email-builder library. This server enables LLMs to programmatically create, modify, and export email templates.

## Overview

The server stores JSON templates locally and returns rendered HTML on each operation, allowing the LLM to see immediate visual feedback without transferring the full template JSON on every request. This approach significantly reduces token usage during the exchange.

## Tech Stack

- **TypeScript** - Type-safe implementation
- **@modelcontextprotocol/sdk** - MCP server SDK for tool/resource registration
- **@usewaypoint/email-builder** - Email template rendering
- **React/ReactDOM** - Server-side rendering of email components
- **Zod** - Schema validation for tool inputs
- **Node.js** - Runtime with stdio transport

## Installation

```bash
cd packages/mcp-server
npm install
npm run build
```

## Running the Server

```bash
# Start the server
npm run start

# Or run directly
node bin/mcp-server.js
```

## Adding to Claude Code

```bash
# Add to current project (local scope)
claude mcp add --transport stdio email-builder -- node /path/to/packages/mcp-server/bin/mcp-server.js

# Add to project (shared via .mcp.json)
claude mcp add --transport stdio --scope project email-builder -- node /path/to/packages/mcp-server/bin/mcp-server.js

# Add globally (available in all projects)
claude mcp add --transport stdio --scope user email-builder -- node /path/to/packages/mcp-server/bin/mcp-server.js
```

## Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "email-builder": {
      "command": "node",
      "args": ["/absolute/path/to/packages/mcp-server/bin/mcp-server.js"]
    }
  }
}
```

## Tools

| Tool | Description |
|------|-------------|
| `list_block_types` | List all available block types with their property schemas |
| `create_template` | Create a new empty email template |
| `add_block` | Add a block to a template |
| `remove_block` | Remove a block (and its children) from a template |
| `update_block` | Update a block's properties or styling |
| `move_block` | Move a block up or down within its parent |
| `get_template` | Get the full JSON template for export |
| `list_templates` | List all stored templates |
| `delete_template` | Delete a stored template |

## Resources

| Resource | Description |
|----------|-------------|
| `template://{id}/preview` | HTML preview of a template |

## Available Block Types

| Block | Description | Container |
|-------|-------------|-----------|
| Text | Text content with optional markdown support | No |
| Button | Clickable button with customizable styles | No |
| Image | Image with alt text and optional link | No |
| Heading | Heading (h1-h3) for titles | No |
| Avatar | Profile picture (circle/square/rounded) | No |
| Divider | Horizontal line separator | No |
| Spacer | Vertical spacing | No |
| Html | Raw HTML content | No |
| Container | Wrapper for grouping blocks | Yes |
| ColumnsContainer | Multi-column responsive layout | Yes |

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     MCP Client (Claude)                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼ stdio transport
┌─────────────────────────────────────────────────────────────┐
│                       MCP Server                             │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Tool Handlers                        │ │
│  │  9 tools for template CRUD and block manipulation      │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Template Storage Service                   │ │
│  │  • In-memory cache for fast access                     │ │
│  │  • JSON file persistence to ~/.email-builder-mcp/      │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                 Renderer Service                        │ │
│  │  • Uses @usewaypoint/email-builder                     │ │
│  │  • React server-side rendering to HTML                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── index.ts                 # Entry point with stdio transport
├── server.ts                # MCP server and tool registration
├── tools/
│   ├── index.ts             # Tool exports
│   ├── list-block-types.ts  # List available blocks
│   ├── create-template.ts   # Create new template
│   ├── add-block.ts         # Add block to template
│   ├── remove-block.ts      # Remove block
│   ├── update-block.ts      # Update block properties
│   ├── move-block.ts        # Reorder blocks
│   ├── get-template.ts      # Export template JSON
│   ├── list-templates.ts    # List all templates
│   └── delete-template.ts   # Delete template
├── resources/
│   ├── index.ts             # Resource exports
│   └── template-preview.ts  # HTML preview resource
├── services/
│   ├── template-storage.ts  # File-based persistence
│   └── renderer.ts          # HTML rendering
├── types/
│   └── index.ts             # TypeScript types and Zod schemas
└── utils/
    ├── block-factory.ts     # Block creation with defaults
    └── id-generator.ts      # UUID and block ID generation
```

## Storage

Templates are stored in `~/.email-builder-mcp/templates/` as JSON files:

```json
{
  "metadata": {
    "id": "uuid",
    "name": "Template Name",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "document": {
    "root": {
      "type": "EmailLayout",
      "data": { ... }
    },
    "block-123": {
      "type": "Text",
      "data": { ... }
    }
  }
}
```

## Example Usage

Once connected, an LLM can build emails like this:

1. **Create a template:**
   ```
   create_template({ name: "Welcome Email" })
   → Returns templateId and initial HTML
   ```

2. **Add blocks:**
   ```
   add_block({ templateId, blockType: "Heading", props: { text: "Welcome!" } })
   add_block({ templateId, blockType: "Text", props: { text: "Thanks for signing up." } })
   add_block({ templateId, blockType: "Button", props: { text: "Get Started", url: "https://..." } })
   → Each returns updated HTML
   ```

3. **Export when done:**
   ```
   get_template({ templateId })
   → Returns full JSON template + final HTML
   ```

## Development

```bash
# Build
npm run build

# Watch mode
npm run dev

# Test with MCP Inspector
npx @modelcontextprotocol/inspector node bin/mcp-server.js
```

## License

MIT
