"use client";
import { useState, ChangeEvent, useEffect, use } from "react";
import "@radix-ui/themes/styles.css";
import { Theme, Button, Text } from "@radix-ui/themes";
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
  const [updatedJSON, setUpdatedJSON] = useState("");
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
      await axios.post("/api/json", { json: json });
    } else {
      alert("Error: JSON is incorrectly formatted.");
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
  };

  async function handleGetJSON() {
    const response = await axios.get("api/json");
    const data = response.data;

    try {
      const jsonObject = JSON.parse(data[data.length - 1].json);
      const formattedJsonString = JSON.stringify(jsonObject, null, 2);
      setUpdatedJSON(formattedJsonString);
      setGetClicked(true);
    } catch (error) {
      console.log("there was an unexpected error");
    }
  }

  return (
    <div>
      <Theme>
        <div className="text-center">
          <Text className="font-bold text-3xl">Pretty JSON!</Text>
        </div>
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
              Prettify
            </Button>
            <div className="pb-5 pt-5">
              <Button className="hover:bg-blue-700" onClick={handleGetJSON}>
                Get Recent JSON
              </Button>
            </div>
          </div>
          {validJSON === true && (
            <pre className="h-35 pb-5">{formattedJSON}</pre>
          )}
          <hr />
          <div className="pt-5">
            Most Recent JSON:
            {getClicked === true && <pre className="h-64">{updatedJSON}</pre>}
          </div>
        </div>
      </Theme>
    </div>
  );
}
