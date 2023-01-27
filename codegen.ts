import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:3333/graphql',
  documents: './apps/frontend/src/app/queries.ts',
  generates: {
    './apps/frontend/src/app/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular']
    }
  }
}
export default config
