"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_mongoConnect = require("./mongoConnect");
var import_user_service = __toESM(require("./services/user-service"));
var import_api = __toESM(require("./routes/api"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json());
(0, import_mongoConnect.connect)("clusteremu");
app.get("/hello", (req, res) => {
  res.send("Hello, World");
});
app.post("/api/signup", (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  if (!newUser.username || !newUser.password) {
    res.status(400).send("Bad request: Invalid input data.");
  } else {
    import_user_service.default.createUser(newUser).then((createdNewUser) => import_user_service.default.generateAccessToken(createdNewUser.username)).then((token) => {
      res.status(201).send({ token });
    }).catch((err) => res.status(500).send(err));
  }
});
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  import_user_service.default.createUser(newUser).then((user) => {
    console.log("Create user successful");
    res.status(201).send(user);
  }).catch((err) => res.status(500).send(err));
});
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  import_user_service.default.loginUser(username, password).then((token) => res.status(200).send({ token })).catch((error) => res.status(401).send("Unauthorized"));
});
app.use("/api", import_api.default);
app.get("/logout", (req, res) => {
});
app.get("/api/users", (req, res) => {
});
app.get("/api/notes/:username", (req, res) => {
});
app.get("/favorite", (req, res) => {
});
app.post("api/note", (req, res) => {
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map
