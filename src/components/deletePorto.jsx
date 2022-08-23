import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React from "react";
import { db, storage } from "../firebase/config";

const DeletePorto = ({id, imageUrl}) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Portofolio", id));
      alert("deleted sucssess!");
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    } catch (error) {
      alert("error");
    }
  };
  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeletePorto;
