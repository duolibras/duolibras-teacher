import axios from "axios";

export async function uploadFile(url: string, fields: FormData, onProgress?: (progress: number) => void) {
  await axios.post(url, fields, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: ({ total, loaded, }) => {
      const percentage = Math.round((loaded * 100) / (total ?? 1));
      onProgress?.(percentage);
    }
  })
}