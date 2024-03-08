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
var note_schema_model_exports = {};
__export(note_schema_model_exports, {
  default: () => note_schema_model_default
});
module.exports = __toCommonJS(note_schema_model_exports);
var import_mongoose = require("mongoose");
const noteSchema = new import_mongoose.Schema(
  {
    //createdBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    text: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    createDate: { type: Date, required: true }
  },
  { collection: "notes" }
);
const NoteSchemaModel = (0, import_mongoose.model)("Note", noteSchema);
var note_schema_model_default = NoteSchemaModel;
//# sourceMappingURL=note-schema-model.js.map
