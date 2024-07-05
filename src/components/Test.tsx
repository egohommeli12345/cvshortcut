"use client";

const Test = () => {
  const handleClick = async () => {
    const request = await fetch("http://localhost:3000/api/pdf"
    )
    request.json().then((data) => {
      console.log(data);
    });
  }
  return (
    <>
      <button onClick={handleClick}>Download PDF</button>
    </>
  )
}

export default Test;