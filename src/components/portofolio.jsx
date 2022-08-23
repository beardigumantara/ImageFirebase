import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";
import DeletePorto from "./deletePorto";

const Portofolio = () => {
  const [portofolios, setPortofolios] = useState([]);
  useEffect(() => {
    const portofolioRef = collection(db, "Portofolio");
    const q = query(portofolioRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const portofolios = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPortofolios(portofolios);
      console.log(portofolios);
    });
  }, []);

  return (
    <div>
      {portofolios.length === 0 ? (
        <p>No data</p>
      ) : (
        portofolios.map(({ id, title, description, imageUrl, createdAt }) => {
          return (
            <div key={id}>
              <div className="row">
                <div>
                  <img src={imageUrl} alt={`${imageUrl}`} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>{createdAt.toDate().toDateString()}</p>
                  <p>{description}</p>
                  <DeletePorto id={id} imageUrl={imageUrl}/>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Portofolio;
