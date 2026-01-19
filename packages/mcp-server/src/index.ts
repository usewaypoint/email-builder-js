import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { server } from './server.js';

async function main() {
  console.error('[MCP] Starting Email Builder MCP Server...');

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('[MCP] Server connected and ready');
}

main().catch((error) => {
  console.error('[MCP] Fatal error:', error);
  process.exit(1);
});
