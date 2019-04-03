import {
  visit,
  print,
  parse,
  GraphQLSchema,
  ASTNode,
  GraphQLDirective,
} from "graphql";

export class DirectiveBuilder {
  constructor(
    protected schema: GraphQLSchema,
    protected sdl: string,
    protected directives: GraphQLDirective[]
  ) {}

  /**
   * Adds the directives to the schema
   *
   * @memberof DirectiveBuilder
   */
  addDirectivesToSchema() {
    //
  }

  /**
   * Adds Nexus defined directives to the SDL so we can
   * re-print the schema with the directives added.
   *
   * @memberof DirectiveBuilder
   */
  addDirectivesToSDL() {
    visit(parse(this.sdl), {
      SchemaDefinition(node) {
        //
      },
      ScalarTypeDefinition(node) {
        //
      },
      ObjectTypeDefinition(node) {
        //
      },
      FieldDefinition(node) {
        //
      },
      EnumValueDefinition(node) {
        //
      },
      EnumTypeDefinition(node) {
        //
      },
      UnionTypeDefinition(node) {
        //
      },
      InputObjectTypeDefinition(node) {
        //
      },
      InputValueDefinition(node) {
        //
      },
      InterfaceTypeDefinition(node) {
        //
      },
    });
  }
}
