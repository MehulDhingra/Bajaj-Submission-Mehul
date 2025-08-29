const express = require("express");
const serverless = require("serverless-http");

const app = express();
app.use(express.json());

const FULL_NAME = "john_doe";
const DOB = "17091999";
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/api/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input. Expected { data: [] }",
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    for (let item of data) {
      if (/^-?\d+$/.test(item)) {
        let num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    }

    let concat_string = "";
    let alphaStr = alphabets.join("");
    let reversed = alphaStr.split("").reverse().join("");
    for (let i = 0; i < reversed.length; i++) {
      concat_string += i % 2 === 0
        ? reversed[i].toUpperCase()
        : reversed[i].toLowerCase();
    }

    return res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});

module.exports = app;
module.exports.handler = serverless(app);
