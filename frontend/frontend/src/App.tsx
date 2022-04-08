import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";

type City = {
  name: string;
  country?: string;
  subcountry?: string;
  geonameid?: Number;
};

export const App = () => {
  const [cities, setCities] = useState<City[] | null>(null);


  const mafonction = () => {
    fetch("http://localhost:3001/api/cities")
      .then((response) => response.json())
      .then(setCities);
  }

  const cityFilter = (country: string) => {
    fetch("http://localhost:3001/api/cities?country=" + country)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setCities(res)
      });
  }

  const geoName = (geonameid: Number | undefined) => {
    window.open("https://www.geonames.org/" + geonameid);
  }

  return (
    <div className="App">
      <Sidebar func={cityFilter} />
      <div id="cities-table-wrapper">
        <table>
          <thead>
            <tr>
              <th id="City"><u> City</u></th>
            </tr>
          </thead>
          <tbody>
            <button id="buttonCities" onClick={mafonction} >all cities</button>
            {cities?.map((city, index) => (
              <tr key={index}>
                <td id="buttonGeo" onClick={() => geoName(city.geonameid)}><b>{city.name}</b> [{city.country}] ({city.subcountry})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
