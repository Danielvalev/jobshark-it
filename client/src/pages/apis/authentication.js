import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebaseConfig';
import CryproJS from 'crypto-js';

export const LoginUser = async (payload) => {
    try {
        // check if the email already exist
        const qry = query(collection(fireDB, 'users'), where('email', '==', payload.email));
        const querySnapshot = await getDocs(qry);

        if (querySnapshot.empty) {
            return {
                success: false,
                message: "Email not found"
            }
        } else {
            // return all users with that email - must be only one
            const snapshotData = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));

            const user = snapshotData[0];

            // check if password match
            const dencryptedPassword = CryproJS.AES.decrypt(user.password, "jobshark-it").toString(CryproJS.enc.Utf8);

            if (dencryptedPassword === payload.password) {
                return {
                    success: true,
                    message: "Login successful",
                    data: {...user, password: ""}
                }
            } else {
                return {
                    success: false,
                    message: "Incorrect username or password",
                }
            }
        }
    } catch (error) {
        
    }
};

export const RegisterUser = async (payload) => {
    try {

        // check if the email already exist
        const qry = query(collection(fireDB, 'users'), where('email', '==', payload.email));

        // will return 0 if not exist
        const querySnapshot = await getDocs(qry);
        if (querySnapshot.size > 0) {
            return {
                success: false,
                message: "Email already exists",
            }
        }

        // encrypt the password
        const encryptedPassword = CryproJS.AES.encrypt(
            payload.password,
            "jobshark-it"
        ).toString();
        payload.password = encryptedPassword;

        // add the user to db
        const response = await addDoc(collection(fireDB, 'users'), payload);
        return {
            success: true,
            message: "User Registered Successfully",
            data: response
        }
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: null
        }
    }
};