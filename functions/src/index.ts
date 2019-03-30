import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const addMessage = functions.https.onCall(async (data, context) => {
    const message = data.message
    const email = context.auth.token.email || null
    console.log("Success!!!!", message)


    return await admin.firestore().collection("messages").add({ username: email, message, time: new Date() })


})
