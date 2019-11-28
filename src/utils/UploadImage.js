import * as firebase from 'firebase';

export const downloadImage = async (storageRef, imageName) => {
    return await storageRef.child(imageName).getDownloadURL()
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        });
};

export const uploadImage = async (uri, imageName, folder) => {
    return await fetch(uri)
        .then(async res => {
            const ref = firebase
                .storage()
                .ref()
                .child(`${folder}/${imageName}`);
            await ref.put(res._bodyBlob);

            return await firebase
                .storage()
                .ref(`${folder}/${imageName}`)
                .getDownloadURL()
                .then(res => {
                    return res;
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        });
};
