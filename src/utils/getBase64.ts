import { RcFile } from "antd/lib/upload";

export async function getBase64(img: RcFile | undefined) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    return reader.result;
  });
  reader.readAsDataURL(img as Blob);
}
