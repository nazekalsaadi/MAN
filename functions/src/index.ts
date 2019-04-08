import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp(functions.config().firebase)
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const addMessage = functions.https.onCall((data, context) => {
    const Text = data.message
    const id = data.id
    const email = context.auth.token.email || null
    console.log("Success!!!!", Text)


    return admin.firestore().collection(`Chat`).doc(id).collection("Messages").add({ Sender_id: email, Text, Time: new Date() })


})

export const trashLevel = functions.https.onRequest(async (req, res) => {

    const querySnapshot = await admin.firestore().collection("Trash").get()

    // level from 0 to 100
    querySnapshot.forEach(async doc => {
        let Level = doc.data().Level + Math.random() * 10
        if (Level > 100) {
            Level = 100
        }
        // simulate tipping over occasionally
        await admin.firestore().collection("Trash").doc(doc.id).update({ Level })
        if (Level > 61) {
            await admin.firestore().collection("Trash").doc(doc.id).update({ Status: "Full" })
        }
        if (Level > 31 && Level <= 60) {
            await admin.firestore().collection("Trash").doc(doc.id).update({ Status: "Partial" })
        }

        if (Level <= 30) {
            await admin.firestore().collection("Trash").doc(doc.id).update({ Status: "Empty" })
        }
    })



    // simulate random location:
    // - get starting location: lat, long
    // - add or subtract a random amount. e.g. lat + Math.random() - .5
    // might get an impossible situation, must check for this




    res.status(200).send();
})

// export const TrashLocation = functions.https.onRequest(async (req, res) => {

//     const querySnapshot = await admin.firestore().collection("Trash").get()

//     // level from 0 to 100
//     querySnapshot.forEach(async doc => {
//         const Location = doc.data().Location + Math.random() - 0.5
//         await admin.firestore().collection("Trash").doc(doc.id).update({ Location })
//     })



//     // simulate random location:
//     // - get starting location: lat, long
//     // - add or subtract a random amount. e.g. lat + Math.random() - .5
//     // might get an impossible situation, must check for this




//     res.status(200).send();
// })

export const TruckTracking = functions.https.onRequest(async (req, res) => {

    const querySnapshot = await admin.firestore().collection("Truck").get()

    // level from 0 to 100
    querySnapshot.forEach(async doc => {
        let Latitude = doc.data().Latitude + Math.random() + 0.5
        await admin.firestore().collection("Truck").doc(doc.id).update({ Latitude })
        let longitude = doc.data().longitude + Math.random() + 0.5
        await admin.firestore().collection("Truck").doc(doc.id).update({ longitude })
    })



    // simulate random location:
    // - get starting location: lat, long
    // - add or subtract a random amount. e.g. lat + Math.random() - .5
    // might get an impossible situation, must check for this




    res.status(200).send();
})

export const updateMotivation = functions.https.onRequest(async (req, res) => {
    // find all images (users with captions)
    const querySnapshot = await admin.firestore().collection("motivate").where("message", ">", "").get()
    const Messages = new Array()
    querySnapshot.forEach(doc =>
        Messages.push(doc.id)
    )
    console.log("Messages", Messages.length)

    // pick one at random
    const message = Messages[Math.floor(Messages.length * Math.random())]
    console.log("message", message)

    // change user document in image collection
    await admin.firestore().collection("motivate").doc("Thank You For Your Hard Work").update({ message: message })

    res.status(200).send();
})
