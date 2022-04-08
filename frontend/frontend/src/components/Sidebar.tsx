import { useEffect } from "react";
import "./Sidebar.css";
import {useState} from "react";

type Country ={
  name :string;
  country? : string;
  subcountry? : string;
  geonameid: Number;
  count: Number;
}


export const Sidebar = (props : any) => {
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() =>{
    fetch("http://localhost:3001/api/countries")
    .then((response) => response.json())
    .then(setCountries);
  }, [])


  return (
    <div id="countries-table-wrapper">
      <table>
        <thead>
          <tr>
            <th id="Countries"><u> Countries</u></th>
          </tr>
        </thead>
        <tbody>
          {countries?.map((country, item) =>(
            <tr key={item}>
              <td id='selected' onClick={() => { props.func(country.name)}}>{country.name} ({country.count})</td>  
          </tr>
          ))}
        </tbody>

      </table>
     
    </div>
  );
};
