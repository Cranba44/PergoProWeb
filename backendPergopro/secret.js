const crypto = require("crypto");

const secretPassword = "Curro123";
const secretPasswordRefresh = "Curro12334";

const hash = crypto
  .createHmac("sha256", secretPassword)
  .update(secretPasswordRefresh)
  .digest("hex");

console.log(hash);