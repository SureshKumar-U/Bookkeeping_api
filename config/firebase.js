

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bookkeppingservice.appspot.com" 
});

const bucket = admin.storage().bucket(); // Get a reference to the storage bucket
module.exports = { bucket };

