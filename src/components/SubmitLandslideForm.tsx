// @ts-nocheck

import React, { useState } from 'react'
import Axios from 'axios';

export default function SubmitLandslideForm() {
    const url = "Yeahh"
    const [data, setData] = useState({
        numLandslides:  "",
        lat: "",
        long: "",
        date: ""
    })

    function submit(e) {
        e.preventDefault();
        Axios.post(url, {
            numLandslides: data.numLandslides,
            lat: data.lat,
            long: data.long,
            date: data.date
        })
            .then(res => {
                console.log(res.data)
            })
    }

    function handle(e) {
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }

    return (
        <div>
            <form onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handle(e)} id="numLandslides" value={data.numLandslides} placeholder="Number of Landslides" type="number"></input>
                <input onChange={(e) => handle(e)} id="lat" value={data.lat} placeholder="Latitude" type="number"></input>
                <input onChange={(e) => handle(e)} id="long" value={data.long} placeholder="Longitute" type="number"></input>
                <input onChange={(e) => handle(e)} id="date" value={data.date} placeholder="date" type="date"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}
