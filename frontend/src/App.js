import React, { useState } from "react";
import Form from "./components/Form";
import Summary from "./components/Summary";

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div>
      {submittedData ? (
        <Summary formData={submittedData} />
      ) : (
        <Form onSubmit={handleFormSubmit} />
      )}
    </div>
  );
}

export default App;