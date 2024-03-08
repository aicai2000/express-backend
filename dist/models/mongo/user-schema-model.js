"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var user_schema_model_exports = {};
__export(user_schema_model_exports, {
  default: () => user_schema_model_default
});
module.exports = __toCommonJS(user_schema_model_exports);
var import_mongoose = require("mongoose");
const userSchema = new import_mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true }
  },
  { collection: "users" }
);
const UserSchemaModel = (0, import_mongoose.model)("User", userSchema);
var user_schema_model_default = UserSchemaModel;
//# sourceMappingURL=user-schema-model.js.map
