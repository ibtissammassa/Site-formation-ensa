import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/extension/button";

const AddChapElementForm = ({ elements, setElements }) => {
  const [title, setTitle] = useState("");
  const [currentElements, setCurrentElements] = useState(elements);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the elements state by adding the new element
    setElements([...elements, title]);
    setCurrentElements([...elements, title]);
    // Reset the title input value
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {elements.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
      <div className="flex flex-row gap-4">
        <Input type="text" value={title} onChange={handleChange} />
        <Button type="submit">Add Element</Button>
      </div>
    </form>
  );
};

export default AddChapElementForm;
