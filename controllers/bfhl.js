exports.bfhlHandler = (req, res) => {
  try {
    const { data } = req.body;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input format. Expected { data: [] }"
      });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]+$/.test(item));

    // Highest lowercase alphabet
    let highestLowercase = [];
    const lowercases = alphabets.filter(ch => /^[a-z]$/.test(ch));
    if (lowercases.length > 0) {
      highestLowercase = [lowercases.sort().reverse()[0]];
    }

    res.json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers,
      alphabets,
      highest_lowercase_alphabet: highestLowercase
    });
  } catch (err) {
    res.status(500).json({
      is_success: false,
      error: err.message
    });
  }
};
