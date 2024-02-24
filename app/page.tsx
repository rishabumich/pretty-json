"use client";
import { userInfo } from "os";
import { useState, ChangeEvent, useEffect, use } from "react";
import "@radix-ui/themes/styles.css";
import { Theme, Button } from "@radix-ui/themes";
import axios, { AxiosResponse } from "axios";

interface JSONObject {
  createdAt: Date;
  id: number;
  json: string;
}

export default function Home() {
  const [json, setJson] = useState("");
  const [validJSON, setValidJSON] = useState<boolean>(false);
  const [formattedJSON, setFormattedJSON] = useState("");
  const [updatedJSON, setUpdatedJSON] = useState([]);
  const [getClicked, setGetClicked] = useState(false);

  // const invalidJSON: string = "this is not valid";
  // const validJSON: string = '{"key": "value", "nested": {"foo": "bar"}}';

  function isValidJSON(input: string) {
    try {
      JSON.parse(input);
    } catch (error) {
      return false;
    }
    return true;
  }

  async function handleSubmit() {
    const userInput = json;
    if (isValidJSON(userInput) === true) {
      setValidJSON(true);
      formatJSON(json);
      console.log(formattedJSON);
      await axios.post("/api/json", { json: json });
    } else {
      alert("Invalid JSON.");
      setValidJSON(false);
    }
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setJson(event.target.value);
  }

  const formatJSON = (input: string) => {
    const jsonObject = JSON.parse(input);
    const formattedJsonString = JSON.stringify(jsonObject, null, 2);
    setFormattedJSON(formattedJsonString);
    console.log(formattedJsonString);
  };

  let counter = 0;

  async function handleGetJSON() {
    const response = await axios.get("api/json");
    const data = response.data;
    data.map((entry: JSONObject) => {
      formatJSON(entry.json);
      counter++;
    });
    setUpdatedJSON(data);
    setGetClicked(true);
  }

  return (
    <div>
      <Theme>
        <div className="pl-20 pt-20">
          <input
            type="text"
            value={json}
            onChange={handleOnChange}
            placeholder="Enter JSON..."
            className="border border-gray-500 rounded-md p-2 w-1/2 aspect-w-1 aspect-h-1 h-20"
          ></input>
          <div className="pb-5 pt-5">
            <Button className="hover:bg-blue-700" onClick={handleSubmit}>
              Submit
            </Button>
            <div className="pb-5 pt-5">
              <Button className="hover:bg-blue-700" onClick={handleGetJSON}>
                Get recent JSON
              </Button>
            </div>
          </div>
          {validJSON === true && <pre className="h-64">{formattedJSON}</pre>}
        </div>
        <div>
          {getClicked === true && <pre>{updatedJSON[counter - 1]}</pre>}
        </div>
      </Theme>
    </div>
  );
}
