const express = require("express");
const router = express.Router();

var admin = require("firebase-admin");

var serviceAccount = require("../pfechaima-a6b38-firebase-adminsdk-uic0o-fec00ada10.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

router.post("/notification", (req, res) => {
  if (req.body.action === "send_notification") {
    const registrationToken =
      "dUc6xgkzTEa6tpiAQ2dTe9:APA91bFYzmv8YP67HnZNYp7mo2h-59-ez83L3n1xKchNGOs5mtYjwq7wBSCof0z2AxgBCwl_jyPQRm5mR3Eps1KHkJmC6Ol41sOCgfgOAgymC_xYWqT6nekwAM_6HP7TZuDCDSFDwAsW";
    const message = {
      notification: {
        title: "⚕️ Medical App",
        body: "You forget to take your medicine ⏱️",
      },
    };

    admin
      .messaging()
      .sendToDevice(registrationToken, message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        res.sendStatus(200);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;

// const router = express.Router();

// var admin = require("firebase-admin");

// var serviceAccount = require("../pfechaima-a6b38-firebase-adminsdk-uic0o-fec00ada10.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const registrationToken =
//   "dUc6xgkzTEa6tpiAQ2dTe9:APA91bFYzmv8YP67HnZNYp7mo2h-59-ez83L3n1xKchNGOs5mtYjwq7wBSCof0z2AxgBCwl_jyPQRm5mR3Eps1KHkJmC6Ol41sOCgfgOAgymC_xYWqT6nekwAM_6HP7TZuDCDSFDwAsW";
// const message = {
//   notification: {
//     title: "⚕️ Medical App",
//     body: "You forget to take your medicine ⏱️",
//   },
// };
// admin
//   .messaging()
//   .sendToDevice(registrationToken, message)
//   .then((response) => {
//     console.log("Successfully sent message:", response);
//   })
//   .catch((error) => {
//     console.error("Error sending message:", error);
//   });

// module.exports = router;
