import { db } from '../firebase';

export const getDocsFromDb = async (option) => {
  const ucs = [];
  const snapshot = await db.collection(option).get();
  snapshot.docs.map((doc) => {
    return ucs.push({ id: doc.id, ...doc.data() });
  });
  return ucs;
};

export const removeFromDb = async (
  selection, option
) => {
  const docs = await getDocsFromDb(option);
  const promises = docs.map(async (doc) => {
    if (selection.includes(doc.id)) {
      return await db.collection(option).doc(doc.id).delete();
    }
    return;
  });
  return Promise.all(promises);
};

export const editOnDb = async (id, name, year, option) => {
  try {
    await db.collection(option).doc(id[0]).update({
      name: name,
      ano: year,
    });
  } catch (err) {
    console.log(err);
  }
};


export const getUserProfileFromDb = async (userUID) => {
  const profile = await db.collection('users').doc(userUID).get();
  return profile.data();
};

export const updateProfileOnDb = async (userProfile, userUID) => {
  await db.collection('users').doc(userUID).update({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
  });
};
