"use client"
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";

export default function UploadImages() {
  const [urls, setUrls] = useState([]);
  const { uploadToS3,files } = useS3Upload();

  const handleFilesChange = async ({ target }) => {
    const files = Array.from(target.files);

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const { url } = await uploadToS3(file);

      setUrls(current => [...current, url]);
    }
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        multiple={true}
        onChange={handleFilesChange}
      />

      <div>
        {urls.map((url, index) => (
          <div key={url}>
            File {index}: ${url}
          </div>
        ))}
      </div>
      <div className="pt-8">
        {files.map((file, index) => (
          <div key={index}>
            File #{index} progress: {file.progress}%
          </div>
        ))}
      </div>
    </div>
  );
}

// import { useS3Upload } from "next-s3-upload";
// import { useState } from "react";

// export default function UploadPage() {
//   let { uploadToS3, files } = useS3Upload();

//   let handleFileChange = async event => {
//     let file = event.target.files[0];
//     await uploadToS3(file);
//   };

//   return (
//     <div>
//       <input onChange={handleFileChange} type="file" />

//       <div className="pt-8">
//         {files.map((file, index) => (
//           <div key={index}>
//             File #{index} progress: {file.progress}%
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }