import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "./src/types/common/data.graphql",
    documents: ["./src/types/common/query.graphql"],
    generates: {
        "src/types/graphql.ts": {
            plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
            config: {
                arrayInputCoercion: false,
            }
        },
    }
};

export default config;
