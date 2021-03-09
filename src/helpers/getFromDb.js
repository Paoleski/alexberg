import { db } from '../firebase';

export const getUnidadesCurricularesFromDb = async () => {
  const ucs = [];
  const snapshot = await db.collection('unidadesCurriculares').get();
  snapshot.docs.map((doc) => {
    return ucs.push({ ...doc.data() });
  });
  return ucs;
};

export const removeUnidadesCurricularesFromDb = async (unidadesCurriculares) => {
  const ucs = await getUnidadesCurricularesFromDb()
  const promises = ucs.map(async (uc) => {
    if (unidadesCurriculares.includes(uc.name)) {
        return await db.collection('unidadesCurriculares').doc(uc.name).delete()
    }
    return
  })
  return Promise.all(promises)
};

export const editUnidadeCurricularFromDb = async (unidadeCurricular, name, year) => {
  await db.collection('unidadesCurriculares').doc(unidadeCurricular[0]).update({
    name:name,
    ano:year,
    id:name,
  })
}


export const getUserFromDb = async (userUID) => {
  const profile = await db.collection('users').doc(userUID).get()
  return profile.data()
}

export const updateProfileOnDb = async (userProfile, userUID) => {
  await db.collection('users').doc(userUID).update({
    firstName:userProfile.firstName,
    lastName:userProfile.lastName,
  })
}
