import { getApp } from 'firebase/app';
import { getDatabase, ref, get, onValue } from 'firebase/database';

const db = getDatabase(getApp());
const dataRef = ref(db, 'posts/');
// 一度だけ値を取得する
// // https://firebase.google.com/docs/database/web/read-and-write
export const getPosts = (callback) => {
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

// 値の変更の監視
export const monitoringPosts = (callback) => {
 onValue(dataRef, (snapshot) => {
  if (callback) {
    callback(snapshot.val());
  }
 });
};

