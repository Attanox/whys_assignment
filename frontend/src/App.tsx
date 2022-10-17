function App() {
  const onClick = async () => {
    // GET:
    // fetch("http://localhost:8000/api/post/")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // POST:
    // fetch("http://localhost:8000/api/post/", {
    //   body: JSON.stringify({
    //     title: "title",
    //     text: "text",
    //   }),
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // PATCH:
    // fetch(`http://localhost:8000/api/post/${109}/`, {
    //   body: JSON.stringify({
    //     title: "title2",
    //   }),
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
    // DELETE:
    // fetch(`http://localhost:8000/api/post/${109}/`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };

  return (
    <div>
      <h1>Whys Assignment</h1>
      <button onClick={onClick}>Click me!</button>
    </div>
  );
}

export default App;
