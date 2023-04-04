import { updateDoc, doc, getDoc, getDocs, collection } from 'firebase/firestore';
import { fireDB } from '../firebaseConfig';

export const updateUserProfile = async (payload) => {
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        await updateDoc(
            doc(fireDB, 'users', user.id),
            payload,
        )

        return {
            success: true,
            message: 'Profile updated successfully',
        }
    } catch (error) {
        return {
            success: false,
            message: 'Something went wrong',
        }
    }

};

export const getUserProfile = async (id) => {
    try {
      const docRef = doc(fireDB, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return {
          success: true,
          data: docSnap.data(),
        };
      } else {
        return {
          success: false,
          message: "No such user!",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };


export const getAllUsers = async () => {
    try {
      const users = [];
      const querySnapshot = await getDocs(collection(fireDB, "users"));
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        data: users,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  };
  