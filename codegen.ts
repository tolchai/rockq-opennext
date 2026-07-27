import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: process.env.GRAPHQL_ENDPOINT as string, // zde zadej URL k tvému GraphQL API
  documents: './**/*.{ts,tsx,graphql}', // prohledá celý projekt mimo node_modules
  generates: {
    './graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-client-helpers',
        'typed-document-node',
      ],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
