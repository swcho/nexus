import { SchemaConfig, SchemaBuilder, buildTypes } from "./builder";
import { TypegenMetadata } from "./typegenMetadata";
import { GraphQLSchema, isObjectType } from "graphql";
import { objValues } from "./utils";

/**
 * Defines the GraphQL schema, by combining the GraphQL types defined
 * by the GraphQL Nexus layer or any manually defined GraphQLType objects.
 *
 * Requires at least one type be named "Query", which will be used as the
 * root query type.
 */
export function makeSchema(options: SchemaConfig): GraphQLSchema {
  const { schema } = makeSchemaInternal(options);

  // Only in development envs do we want to worry about regenerating the
  // schema definition and/or generated types.
  const {
    shouldGenerateArtifacts = Boolean(
      !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ),
  } = options;

  if (shouldGenerateArtifacts) {
    // Generating in the next tick allows us to use the schema
    // in the optional thunk for the typegen config
    new TypegenMetadata(options).generateArtifacts(schema).catch((e) => {
      console.error(e);
    });
  }

  return schema;
}

/**
 * Builds the schema, we may return more than just the schema
 * from this one day.
 */
export function makeSchemaInternal(
  options: SchemaConfig,
  schemaBuilder?: SchemaBuilder
): { schema: GraphQLSchema } {
  const { typeMap: typeMap } = buildTypes(
    options.types,
    options,
    schemaBuilder
  );
  let { Query, Mutation, Subscription } = typeMap;

  if (!isObjectType(Query)) {
    throw new Error(
      `Expected Query to be a objectType, saw ${Query.constructor.name}`
    );
  }
  if (Mutation && !isObjectType(Mutation)) {
    throw new Error(
      `Expected Mutation to be a objectType, saw ${Mutation.constructor.name}`
    );
  }
  if (Subscription && !isObjectType(Subscription)) {
    throw new Error(
      `Expected Subscription to be a objectType, saw ${
        Subscription.constructor.name
      }`
    );
  }

  const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation,
    subscription: Subscription,
    types: objValues(typeMap),
  });

  return { schema };
}
