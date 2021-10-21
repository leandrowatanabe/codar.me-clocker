import { firebaseServer } from './../../config/firebase/server'

const db = firebaseServer.firestore()
const agenda = db.collection('agenda')

export default async (req, res) => {
    const docId
    const [, token] = req.headers.authorization.split(' ')
    if (!token) {
        return res.status(401)
    }

    try {
        agenda.doc(docId).delete().then(() => {
            console.log("Document successfully deleted!");
        })
    } catch (error) {
        console.log('FB ERROR:', error)
        return res.status(401)
    }
}