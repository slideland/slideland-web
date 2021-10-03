// @ts-nocheck

import React, { useState } from 'react'
import Axios from 'axios';

export default function SubmitForm() {
    const url = "Yeahh"
    const [data, setData] = useState({
        name: "",
        apiUrl: ""
    })

    function submit(e) {
        e.preventDefault();
        Axios.post(url, {
            name: data.name,
            url: data.apiUrl
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
                <input onChange={(e) => handle(e)} id="name" value={data.name} placeholder="name of model" type="text"></input>
                <input onChange={(e) => handle(e)} id="apiUrl" value={data.apiUrl} placeholder="api url" type="text"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}
