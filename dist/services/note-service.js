"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var note_service_exports = {};
__export(note_service_exports, {
  create: () => create,
  default: () => note_service_default,
  deleteNoteById: () => deleteNoteById,
  get: () => get,
  getAllNotes: () => getAllNotes
});
module.exports = __toCommonJS(note_service_exports);
var import_note_schema_model = __toESM(require("./../models/mongo/note-schema-model"));
function get(username) {
  return import_note_schema_model.default.find({ username }).then((list) => list).catch((err) => {
    throw `${username} Not Found`;
  });
}
function getAllNotes() {
  return import_note_schema_model.default.find({}).then((list) => list).catch((err) => {
    throw `error get all notes - ${err} `;
  });
}
function create(note) {
  const newNote = new import_note_schema_model.default(note);
  return newNote.save();
}
function deleteNoteById(id) {
  var mongodb = require("mongodb");
  return new Promise((resolve, reject) => {
    try {
      import_note_schema_model.default.deleteOne({ "_id": new mongodb.ObjectId(id) }).then((deleteResult) => {
        console.log(deleteResult);
        resolve(deleteResult.deletedCount);
      });
    } catch (err) {
      throw `error delete note - ${err} `;
    }
  });
}
var note_service_default = { get, getAllNotes, create, deleteNoteById };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  deleteNoteById,
  get,
  getAllNotes
});
//# sourceMappingURL=note-service.js.map
