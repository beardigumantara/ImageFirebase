import { addDoc, collection, Timestamp } from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebase/config";

const FormAdd = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please Fill all fields");
      return;
    }
    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );
    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const portofolioRef = collection(db, "Portofolio");
          addDoc(portofolioRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              alert("success!");
              setProgress(0);
            })
            .catch((err) => {
              alert("error!");
            });
        });
      }
    );
  };
  return (
    <div>
      <h3>Create Data</h3>
      <label htmlFor="">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="">Description</label>
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={(e) => handleChange(e)}
      />
      <label htmlFor="">Image</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={(e) => handleImageChange(e)}
      />
      {progress === 0 ? null : (
        <div style={{ width: `${progress}` }}>
          <div>{`uploading ${progress}%`}</div>
        </div>
      )}
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default FormAdd;
