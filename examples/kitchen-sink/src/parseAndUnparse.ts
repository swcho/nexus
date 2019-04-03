import fs from "fs";
import path from "path";
import { parse, print, visit, FieldDefinitionNode } from "graphql";

const schema = fs.readFileSync(
  path.join(__dirname, "../kitchen-sink-schema.graphql"),
  "utf8"
);

const schemaAST = parse(schema);

console.log(
  print(
    visit(schemaAST, {
      enter(node, key, parent, _path, ancestors) {
        if (
          node.kind === "FieldDefinition" &&
          node.name.value === "deprecatedField"
        ) {
          return {
            ...node,
            directives: [
              ...node.directives,
              {
                kind: "Directive",
                name: { kind: "Name", value: "isAuthenticated" },
              },
            ],
          } as FieldDefinitionNode;
        }
      },
      leave(node, key, parent, _path, ancestors) {
        //
      },
    })
  )
);
