import { useEffect, useState } from "react";

export default function Names() {
  const [names, setNames] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:3000/lists")
    .then(res.json())
    .then((data) =>  setNames(data));
    })();
  }, []);

  console.log(names)
  return (
    <>
      <div>
        {names.map((ele) => (
          <div key={ele}>{ele}</div>
        ))}
      </div>
    </>
  );
}
