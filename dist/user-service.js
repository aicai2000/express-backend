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
var user_service_exports = {};
__export(user_service_exports, {
  create: () => create,
  default: () => user_service_default,
  get: () => get,
  index: () => index,
  loginUser: () => loginUser,
  update: () => update
});
module.exports = __toCommonJS(user_service_exports);
var import_user_schema_model = __toESM(require("./models/mongo/user-schema-model"));
function index() {
  return import_user_schema_model.default.find();
}
function get(username) {
  return import_user_schema_model.default.find({ username }).then((list) => list[0]).catch((err) => {
    throw `${username} Not Found`;
  });
}
function create(user) {
  const p = new import_user_schema_model.default(user);
  return p.save();
}
function update(username, user) {
  return new Promise((resolve, reject) => {
    import_user_schema_model.default.findOneAndUpdate({ username }, user, {
      new: true
    }).then((user2) => {
      if (user2)
        resolve(user2);
      else
        reject("Failed to update user profile");
    });
  });
}
function loginUser(req, res) {
  const { username, pwd } = req.body;
  if (!username || !pwd) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    credentials.verify(username, pwd).then((goodUser) => generateAccessToken(goodUser)).then((token) => res.status(200).send({ token })).catch((error) => res.status(401).send("Unauthorized"));
  }
}
function generateAccessToken(username) {
  console.log("Generating token for", username);
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      process.env.TOKEN_SECRET,
      { expiresIn: "1d" },
      (error, token) => {
        if (error)
          reject(error);
        else
          resolve(token);
      }
    );
  });
}
var user_service_default = { index, get, create, update };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  get,
  index,
  loginUser,
  update
});
