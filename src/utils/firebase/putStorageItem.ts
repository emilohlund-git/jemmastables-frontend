import { message } from "antd";
import firebase from "../../firebase/firebase";

export async function putStorageItem(
  item: any,
  folderName: string,
  metadata: any
) {
  // the return value will be a Promise
  return firebase
    .storage()
    .ref(folderName + "/" + item.name)
    .put(item, metadata)
    .then(async (snapshot) => {
      const URL = new Promise<string>(async (res) => {
        res(await snapshot.ref.getDownloadURL());
      });
      const promise = await URL;
      return promise;
    })
    .catch((error) => {
      message.error("Error");
    });
}
