import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [textFilter, setTextFilter] = useState("");
  const [locations, setLocstions] = useState([]);

  useEffect(() => {
    getData();
  }, [textFilter]);

  const getData = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${textFilter}`
      );
      setLocstions(result.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(locations)

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="app">
      <div className="topic">เที่ยวไหนดี</div>
      <div className="searching">
        <div className="label">ค้นหาที่เที่ยว</div>
        <form>
          <input
            id="input-text-filter"
            type="text"
            placeholder="หาที่เที่ยวแล้วไปกับ..."
            value={textFilter}
            onChange={(event) => setTextFilter(event.target.value)}
          />
        </form>
      </div>
      <div className="recommendedLocations">
        {locations.map((item) => (
          <div className="location" key={item.eid}>
            <img src={item.photos[0]}/>
            <div className="content-box">
              <div className="title">{item.title}</div>
              <p>
              {item.description.length > 100 && !item.expanded
                ? `${item.description.slice(0, 100)}... `
                : item.description}
              {item.description.length > 100 && (
                <a href={item.url}>อ่านต่อ</a>
              )}
              </p>
              <div className="tags-list">
                <div>หมวด</div>
                {item.tags.map((tag,idex) => (
                  <div className="tag" key={idex}>{tag}</div>
                ))}
              </div>
              <div className="more-photo">
                <img src={item.photos[1]}/>
                <img src={item.photos[2]}/>
                <img src={item.photos[3]}/>
              </div>
              <svg onClick={() => copyToClipboard(item.url)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M10 1.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-1Zm-5 0A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1Zm-2 0h1v1A2.5 2.5 0 0 0 6.5 5h3A2.5 2.5 0 0 0 12 2.5v-1h1a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3.5a2 2 0 0 1 2-2Z"/>
              </svg>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default App;
