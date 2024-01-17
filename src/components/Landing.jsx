import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";

const Landing = () => {
  const URL = "https://night-manager-backend.onrender.com";
  const date = new Date();
  const [entries, setEntries] = useState([]);
  const [inputActive, setInputActive] = useState(false);
  const [inputText, setInputText] = useState({});

  useEffect(() => {
    getEntry();
  }, []);

  async function getEntry() {
    const response = await axios.get(`${URL}/getEntry`, {
      headers: {
        Accept: "application/json",
      },
    });
    setEntries(response.data);
    console.log(response);
    return response;
  }

  function clickHandler() {
    setInputActive(true);
  }

  function submitHandler() {
    postEntry();
  }

  async function postEntry() {
    try {
      const response = await axios.post(
        `${URL}/postEntry`,
        JSON.stringify(inputText),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        setInputActive(false);
        alert("Entry updated");
        setInputText({});
        getEntry();
      }
    } catch (error) {
      alert(error.response.data);
      alert(response.data);
    }
  }

  function inputHandler(e) {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  }

  function closeText(){
    setInputActive(false);
    setInputText({});
  }

  useEffect(() => {
    console.log(inputText);
  }, [inputText]);

  return (
    <div className="w-full min-h-screen bg-gray-500  text-white p-5">
      <div className="mx-auto max-w-3xl  items-center ">
      <button
        className="px-5 py-1 my-5 rounded font-semibold border-2 hover:bg-yellow-600 "
        onClick={clickHandler}
      >
        New
      </button>{" "}
      {inputActive && (
        <span>
        <button
          className="px-5 py-1 my-5 rounded font-semibold border-2 hover:bg-green-600 "
          onClick={submitHandler}
        >
          Post
        </button>
        <button className="px-5 py-1 my-5 rounded-r-full hover:bg-red-800 font-semibold border-2 "
        onClick={closeText}>x</button>
        </span>
      )}
      {inputActive && (
        <div className="mb-5">
          <textarea
            className="bg-gray-500 border-2 rounded w-full h-20 px-2 py-1"
            name="entry"
            placeholder="Daily Entry"
            onChange={inputHandler}
            value={inputText.entry}
          ></textarea>
          <textarea
            className="bg-gray-500 border-2 rounded h-9 px-2 py-1"
            name="secret"
            placeholder="Secret"
            onChange={inputHandler}
            value={inputText.secret}
          ></textarea>
        </div>
      )}
      <div className="border-2 rounded py-2 px-5">
        Entries : 
        {entries.map(function(entry){
          return <div className="border my-1 px-2 py-1">
          <div>Date: {entry.date + "/" + entry.month + "/" + entry.year}</div>
          <div>{entry.entry}</div>
          </div>

        })}
        
      </div>
      </div>
    </div>
  );
};

export default Landing;
