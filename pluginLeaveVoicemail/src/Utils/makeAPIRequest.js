const makeAPIRequest = async (url, method, body) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return response.json();
  } catch (error) {
    console.error("Error making API request", error);
  }
};

export default makeAPIRequest;
