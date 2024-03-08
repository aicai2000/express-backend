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
var note_route_exports = {};
__export(note_route_exports, {
  default: () => note_route_default
});
module.exports = __toCommonJS(note_route_exports);
var import_express = __toESM(require("express"));
var import_note_service = __toESM(require("../services/note-service"));
const router = import_express.default.Router();
router.post("/", (req, res) => {
  const newNote = req.body;
  if (!newNote.username) {
    res.status(400).send("Bad request: username is required.");
  } else if (!newNote.text || newNote.text.length <= 0) {
    res.status(400).send("Bad request: note text is required.");
  } else {
    newNote.createDate = Date();
    import_note_service.default.create(newNote).then((note) => {
      console.log("Create note successful");
      res.status(201).send(note);
    }).catch((err) => res.status(500).send(err));
  }
});
router.delete("/:id", (req, res) => {
  console.log(req.params.id);
  import_note_service.default.deleteNoteById(req.params.id).then((deleteCount) => {
    if (deleteCount > 0) {
      res.status(200).send("note delete successful");
    } else
      res.status(404).send("can't find note to delete");
  }).catch((err) => res.status(500).send(err));
});
var note_route_default = router;
//# sourceMappingURL=note-route.js.map
