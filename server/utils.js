const { GraphQLScalarType } = require("graphql");

const DateTime = new GraphQLScalarType({
  name: "Date",
  description: "ISO 8601 date string",
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});
