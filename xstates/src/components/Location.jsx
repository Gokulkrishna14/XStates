import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Location.module.css";

export default function Location(){
    const[countries, setCountries] = useState([]);
    const[states, setStates] = useState([]);
    const[cities, setCities] = useState([]);
    const[selectedCountry, setSelectedCountry] = useState("");
    const[selectedState, setSelectedState] = useState("");
    const[selectedCity, setSelectedCity] = useState("");

    const endpoint="https://crio-location-selector.onrender.com";


    useEffect(() => {
        const fetchCountry = async() => {
            try{
                const response = await axios.get(`${endpoint}/countries`);
                setCountries(response.data);
                setStates([]);
                setSelectedState("");
            }catch(e){
                console.log(e);
            }
        }
        fetchCountry();

    }, []);

    useEffect(() => {
        if(selectedCountry){
            const fetchState = async() => {
                try{
                    const response = await axios.get(`${endpoint}/country=${selectedCountry}/states`);
                    setStates(response.data);
                    setCities([]);
                    setSelectedCity("");
                }catch(e){
                    console.log(e);
                }
            }
            fetchState();
        }
    }, [selectedCountry]);

    useEffect(() => {
        if(selectedCountry && selectedState){
            const fetchCity = async() => {
                try{
                    const response = await axios.get(`${endpoint}/country=${selectedCountry}/state=${selectedState}/cities`);
                    setCities(response.data);
                }catch(e){
                    console.log(e);
                }
            }
            fetchCity();
        }
    }, [selectedState]);

    



    return(
        <div className={styles.container}> 
            <h1>Select Location</h1>
            <div className={styles.option}>
            <div className={styles.grpselect}>
                <select value={selectedCountry} onChange={(e)=> setSelectedCountry(e.target.value)}>
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.grpselect}>
                <select value={selectedState} onChange={(e)=> setSelectedState(e.target.value)}>
                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state} value={state}>
                            {state}
                        </option>
                    ))}
                </select>
            </div>

            <div className={styles.grpselect}>
                <select value={selectedCity} onChange={(e)=> setSelectedCity(e.target.value)}>
                    <option value="">Select State</option>
                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>

            

            </div>

            {selectedCity && (
        <h2>
          You selected <span className={styles.highlight}>{selectedCountry}</span>,
          <span className={styles.fade}> {selectedState}, {selectedCity}</span>
        </h2>
      )}

        </div>
    );
};