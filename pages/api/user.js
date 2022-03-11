import { firebaseServer } from './../../config/firebase/server'

const db = firebaseServer.firestore()
const profile = db.collection('profiles')

export default async (req, res) => {
    const [, token] = req.headers.authorization.split(' ')

    if (!token) {
        return res.status(401)
    }

    try {

        const snapshot = await profile
            .where('userId', '==', req.query.userId)
            .get()

        const docs = snapshot.docs.map(doc => doc.data())
        
        return res.status(200).json(docs)
    } catch (error) {
        console.log('FB ERROR:', error)
        return res.status(401)
    }
}