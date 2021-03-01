const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add custom claim(admin)
  return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        console.log(user.uid);
        return admin.auth().setCustomUserClaims(user.uid, {
          admin: true,
        });
      })
      .then(() => {
        return {
          message: `Success ${data.email} has been made admin`,
        };
      })
      .catch((err) => {
        return err;
      });
});

exports.addProfessorRole = functions.https.onCall((data, context) => {
  // get user and add custom claim(admin)
  return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        console.log(user.uid);
        return admin.auth().setCustomUserClaims(user.uid, {
          professor: true,
        });
      })
      .then(() => {
        return {
          message: `Success ${data.email} has been made professor`,
        };
      })
      .catch((err) => {
        return err;
      });
});

exports.addStudentRole = functions.https.onCall((data, context) => {
  // get user and add custom claim(admin)
  return admin
      .auth()
      .getUserByEmail(data.email)
      .then((user) => {
        return admin.auth().setCustomUserClaims(user.uid, {
          student: true,
        });
      })
      .then(() => {
        return {
          message: `Success ${data.email} has been made student`,
        };
      })
      .catch((err) => {
        return err;
      });
});


