import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { fireDB } from "../../firebaseConfig";
import moment from 'moment';

export const addNewJobPost = async (payload) => {
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        await addDoc(
            collection(fireDB, "jobs"),
            {
                ...payload,
                status: "pending",
                postedByUserId: user.id,
                postedByUserName: user.name,
                postedOn: moment().format("DD-MM-YYYY HH:mm A"),

            }
        );

        return {
            success: true,
            message: "Job successfully posted",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
}

export const getPostedJobsByUserId = async (userId) => {
    
    try {
        const jobs = [];
        const querySnapshot = await getDocs(collection(fireDB, 'jobs'));

        querySnapshot.forEach((doc) => {

            if (doc.data().postedByUserId === userId) {
                jobs.push({ id: doc.id, ...doc.data()});
            }
        });
        return {
            success: true,
            data: jobs,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};

export const getJobById = async (id) => {
    try {
        const docRef = doc(fireDB, "jobs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                success: true,
                data: docSnap.data(),
            };
        } else {
            return {
                success: false,
                message: 'No job found',
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        }
    }
};


export const getAllJobs = async () => {
    try {
        const jobs = [];
        const querySnapshot = await getDocs(collection(fireDB, 'jobs'));
        querySnapshot.forEach((doc) => {
            jobs.push({id: doc.id, ...doc.data()});
        });
        return {
            success: true,
            data: jobs,
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};


export const editJob = async (payload) => {
    
    try {
        await updateDoc(doc(fireDB, 'jobs', payload.id), {
            ...payload,
            updatedOn: moment().format("DD-MM-YYYY HH-mm A"),
        });
        return {
            success: true,
            message: "Job successfully updated",
        }
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};

export const deleteJobById = async (id) => {
    try {
        await deleteDoc(doc(fireDB, 'jobs', id))
        return {
            success: true,
            message: "Job successfully deleted",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        };
    }
};

export const applyJob = async (payload) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const job = payload;

    try {
        await addDoc(collection(fireDB, 'applications'), {
            jobId: job.id,
            jobTitle: job.jobTitle,
            company: job.company,
            userId: user.id,
            userName: user.name,
            email: user.email,
            phoneNumber: user?.phoneNumber || "",
            appliedOn: moment().format("DD-MM-YYYY HH:mm A"),
            status: 'pending',
        });
        return {
            success: true,
            message: "Job successfully applied",
        };
    } catch (error) {
        return {
            success: false,
            message: "Something went wrong",
        }
    };
};

export const getApplicationsByUserId = async (userId) => {
    try {
      const applications = [];
      const qry = query(collection(fireDB, "applications"), where("userId", "==", userId));

      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        data: applications,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
};

export const getApplicationsByJobId = async (jobId) => {
    try {
      const applications = [];
      const qry = query(collection(fireDB, "applications"), where("jobId", "==", jobId));

      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        data: applications,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
};

export const getAllApplications = async () => {
    try {
      const applications = [];
      const qry = query(collection(fireDB, "applications"));

      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        applications.push({ id: doc.id, ...doc.data() });
      });
      return {
        success: true,
        data: applications,
      };
    } catch (error) {
      return {
        success: false,
        message: "Something went wrong",
      };
    }
};