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
  checkExists: () => checkExists,
  create: () => create,
  createUser: () => createUser,
  default: () => user_service_default,
  generateAccessToken: () => generateAccessToken,
  get: () => get,
  getAllUsers: () => getAllUsers,
  index: () => index,
  loginUser: () => loginUser,
  update: () => update,
  verify: () => verify
});
module.exports = __toCommonJS(user_service_exports);
var import_user_schema_model = __toESM(require("./../models/mongo/user-schema-model"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_bcryptjs = __toESM(require("bcryptjs"));
function index() {
  return import_user_schema_model.default.find();
}
function get(username) {
  return import_user_schema_model.default.find({ username }).then((list) => list[0]).catch((err) => {
    throw `${username} Not Found`;
  });
}
function getAllUsers() {
  return import_user_schema_model.default.find({}).then((list) => list).catch((err) => {
    throw `error get all users - ${err} `;
  });
}
function create(user) {
  const p = new import_user_schema_model.default(user);
  return p.save();
}
function createUser(newUser) {
  return new Promise((resolve, reject) => {
    if (!newUser.username || !newUser.password) {
      reject("must provide username and password");
    }
    import_user_schema_model.default.find({ username: newUser.username }).then((found) => {
      if (found && found.length >= 1)
        reject("username exists");
      else
        return true;
    }).then(
      (usernameUnique) => {
        if (usernameUnique) {
          import_bcryptjs.default.genSalt(10).then((salt) => import_bcryptjs.default.hash(newUser.password, salt)).then((hashedPassword) => {
            var _a;
            const user = new import_user_schema_model.default({
              username: newUser.username,
              password: hashedPassword,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              role: (_a = newUser.role) != null ? _a : "member"
            });
            user.save().then((createdNewUser) => {
              if (createdNewUser)
                resolve(createdNewUser);
            });
          });
        }
      }
    );
  });
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
function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    if (!username || !password) {
      reject("must provide username and password");
    } else {
      verify(username, password).then((goodUser) => generateAccessToken(goodUser)).then((token) => {
        if (token)
          resolve(token);
      }).catch((error) => reject("Unauthorized"));
    }
  });
}
function verify(username, password) {
  return new Promise((resolve, reject) => {
    import_user_schema_model.default.find({ username }).then((found) => {
      console.log(found);
      if (found && found.length >= 1)
        return found[0];
      else
        reject("Invalid username or password");
    }).then((userOnFile) => {
      if (userOnFile) {
        import_bcryptjs.default.compare(password, userOnFile.password, (err, data) => {
          if (err)
            throw err;
          console.log(data);
          if (data) {
            resolve(userOnFile.username);
          } else {
            reject("Invalid username or password");
          }
        });
      } else
        reject("Invalid username or password");
    });
  });
}
function checkExists(username) {
  return new Promise((resolve, reject) => {
    import_user_schema_model.default.find({ username }).then((found) => resolve(found && found.length > 0));
  });
}
function generateAccessToken(username) {
  console.log("Generating token for", username);
  return new Promise((resolve, reject) => {
    import_jsonwebtoken.default.sign(
      { username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, encodedToken) => {
        err ? reject(err) : resolve(encodedToken);
      }
    );
  });
}
;
var user_service_default = { index, get, getAllUsers, create, update, generateAccessToken, createUser, loginUser, verify };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkExists,
  create,
  createUser,
  generateAccessToken,
  get,
  getAllUsers,
  index,
  loginUser,
  update,
  verify
});
//# sourceMappingURL=user-service.js.map
