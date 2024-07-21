"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Myinput() {
  return (
    <div>
      <input type='text'></input>
      <button>add</button>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState(null);
  const todoApiEndpoint = "https://tsgo2tt5n4hcvsbgmmzfvtxem40pdpmb.lambda-url.eu-west-3.on.aws";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${todoApiEndpoint}/list_tasks/hamza`);
        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
        setData(null);
      }
    };

    fetchData();
  }, []);
  const listItems = data && data.tasks ? data.tasks.map(x =>
    <li key={x.task_id}>
      {x.description}
    </li>
  ) : null;

  return (
  <>
  <Myinput />
  <ul>
    {listItems}
  </ul>
  <p>data found: {data ? JSON.stringify(data.tasks) : 'Loading...'}</p>;
  <p>hello</p>
  </>
)
}