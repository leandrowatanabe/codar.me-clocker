import { firebaseServer } from './../../config/firebase/server'

const db = firebaseServer.firestore()
const agenda = db.collection('agenda')

export default async (req, res) => {
    const docId = `${req.body.docId}`

    agenda.doc(docId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}