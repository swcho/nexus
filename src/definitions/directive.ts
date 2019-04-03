import { DirectiveLocationEnum, assertValidName } from "graphql";
import { NexusArgDef } from "./args";
import { withNexusSymbol, NexusTypes } from "./_types";

export interface NexusDirectiveConfig<
  TypeName extends string,
  Args extends Record<string, NexusArgDef<string>>
> {
  /**
   * Name of the directive we're defining
   */
  name: TypeName;
  /**
   * Valid locations the directive may be used
   */
  locations: DirectiveLocationEnum[];
  /**
   * Optional description for the directive
   */
  description?: string;
  /**
   * Definition arguments
   */
  args?: Args;
}

export class NexusDirectiveRef {
  constructor() {}
}

export class NexusDirectiveDef<
  TypeName extends string,
  Args extends Record<string, NexusArgDef<string>>
> {
  constructor(
    readonly name: TypeName,
    protected config: NexusDirectiveConfig<string, Args>
  ) {
    assertValidName(name);
  }
  get value() {
    return this.config;
  }
}

withNexusSymbol(NexusDirectiveDef, NexusTypes.Directive);

export function directive<
  TypeName extends string,
  Args extends Record<string, NexusArgDef<string>>
>(config: NexusDirectiveConfig<TypeName, Args>) {
  return new NexusDirectiveDef(config.name, config);
}
