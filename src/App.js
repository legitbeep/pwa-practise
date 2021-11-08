import React from "react";
import "./App.css";

function App() {
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  const searchHandler = () => {
    setLoading(true);
    if (user != "") {
      fetch(`https://api.github.com/users/${user}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message != "Not Found") setData([{ ...res }]);
          else setData([]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setData(null);
          setLoading(false);
        });
    } else {
      fetch(`https://api.github.com/users`)
        .then((res) => res.json())
        .then((res) => {
          if (res.message != "Not Found") setData(res);
          else setData([]);
          setLoading(false);
        })
        .catch((err) => {
          alert("ERROR OCCURRED", err);
          console.log(err);
          setLoading(false);
        });
    }
  };
  React.useEffect(() => {
    searchHandler();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="search-input">Search</label>
        <input
          onChange={(e) => setUser(e.target.value)}
          value={user}
          id="search-input"
          type="search"
          style={{
            padding: "8px 4px",
            margin: "8px 0px",
            border: "none !important",
          }}
        />
        <button onClick={searchHandler}>Search</button>
        <main style={{ width: "100%" }}>
          {loading && <p>Searching ...</p>}
          {data &&
            data.map((d) => (
              <div
                key={d.login}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  maxHeight: "300px",
                  margin: "40px 0px",
                }}
              >
                <img
                  src={d?.avatar_url}
                  alt="img"
                  style={{
                    padding: "10px",
                    height: "300px",
                  }}
                />
                <div>
                  <h2>{d?.login}</h2>
                  <p style={{ fontSize: "18px" }}>{d?.name}</p>
                  <p style={{ fontSize: "18px" }}>{d?.bio}</p>
                  <a href={d?.html_url} target="_blank">
                    {" "}
                    <button>Visit</button>{" "}
                  </a>
                </div>
              </div>
            ))}
          {!data || (data.length == 0 && <p>Not Found</p>)}
        </main>
      </header>
    </div>
  );
}

export default App;
