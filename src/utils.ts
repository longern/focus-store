// @ts-ignore
import md5 from "md5";

export async function uploadImage(imageInput: HTMLInputElement) {
  const file = imageInput.files?.[0];
  if (!file) return;

  const md5Hash = md5(new Uint8Array(await file.arrayBuffer()));
  const response = await fetch(`/api/assets/${md5Hash}`, {
    method: "PUT",
    body: file,
  });

  imageInput.files = null;
  return response.url;
}
