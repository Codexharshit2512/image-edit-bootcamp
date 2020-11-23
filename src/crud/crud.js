import firebase from "../config/firebaseConfig";
import { store } from "../store";

export const uploadTask = (task) => {
  return new Promise((resolve, reject) => {
    const user = store.getState().auth.user;
    const ref = firebase
      .storage()
      .ref()
      .child(`/taskImages/${task.image.name}`);
    ref
      .put(task.image)
      .then(() => {
        return ref.getDownloadURL();
      })
      .then((url) => {
        const user = store.getState().auth.user;

        const newTask = {
          taskName: task.taskName,
          description: task.details,
          createdAt: new Date(),
          imageUrl: url,
          username: user.name,
          uid: user.uid,
          submissions: [],
        };

        firebase
          .firestore()
          .collection("/tasks")
          .add(newTask)
          .then(() => {
            resolve();
          });
      });
  });
};

export const fetchTasks = () => {
  return new Promise((resolve, reject) => {
    const { user } = store.getState().auth;
    firebase
      .firestore()
      .collection("/tasks")
      .get()
      .then((snapshot) => {
        let arr = [];
        snapshot.docs.forEach((doc) => {
          const task = { ...doc.data(), id: doc.id };
          if (user.status == "Student") {
            task.hasTurnedIn = false;
            doc.data().submissions.forEach((userId) => {
              if (user.uid == userId) task.hasTurnedIn = true;
            });
          }
          arr.push(task);
        });
        resolve(arr);
      })
      .catch((err) => console.log(err));
  });
};

export const fetchSubmissions = (taskId) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .collection("/submissions")
      .where("taskId", "==", taskId)
      .get()
      .then((snapshot) => {
        let arr = [];
        snapshot.docs.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
        });
        resolve(arr);
      })
      .catch((err) => console.log(err));
  });
};

export const gradeSubmission = (id, grade) => {
  return new Promise((resolve, reject) => {
    firebase
      .firestore()
      .doc(`/submissions/${id}`)
      .update({ grade: grade })
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
};

export const turnInAssigment = (taskId, image) => {
  return new Promise((resolve, reject) => {
    const { user } = store.getState().auth;

    const subRef = firebase
      .storage()
      .ref()
      .child(`/submissionImages/${image.name}`);

    subRef
      .put(image)
      .then(() => {
        return subRef.getDownloadURL();
      })
      .then((url) => {
        const newSubmission = {
          uid: user.uid,
          username: user.name,
          taskId,
          createdAt: new Date(),
          grade: null,
          imageUrl: url,
        };

        firebase
          .firestore()
          .collection("/submissions")
          .add(newSubmission)
          .then(() => resolve());

        firebase
          .firestore()
          .doc(`/tasks/${taskId}`)
          .update({
            submissions: firebase.firestore.FieldValue.arrayUnion(user.uid),
          });
      })
      .catch((err) => reject(err));
  });
};
