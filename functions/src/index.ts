import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
admin.initializeApp(functions.config().firebase)


export const addMessage = functions.https.onCall(async (data, context) => {
    const message = data.message
    const UserName = context.auth.token.UserName || null
    console.log("Success!!!!", message)
    return await admin.firestore().collection("Chat").add({ UserName: UserName, message, time: new Date() })


})