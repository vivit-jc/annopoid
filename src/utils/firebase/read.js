import { getApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

// 一度だけ値を取得する
// // https://firebase.google.com/docs/database/web/read-and-write
export const getPosts = (callback) => {
  const db = getDatabase(getApp());
  const dataRef = ref(db, 'posts/');

  get(dataRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        if (callback) {
          callback(snapshot.val());
        }
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
