import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@mui/material";
import { GrDrag } from "react-icons/gr";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Navigate, useLocation } from "react-router-dom";

// Fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// A little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // Some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // Change background color if dragging
  background: isDragging ? "lightgreen" : "grey",

  // Styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const DragAndDropList = () => {
  const [items, setItems] = useState(getItems(10));

  const onDragEnd = (result) => {
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems);
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const FormEditor = () => {
  const location = useLocation();
  const [formData, setFormData] = useState(location.state?.formData || []);
  console.log(location.state);
  if (!location.state) {
    return <Navigate to="/dashboard/" />;
  }

  return (
    <div className="flex flex-col gap-5 p-10">
      <p className="text-3xl text-gray-700 font-medium">Form Editor</p>
      <div className="grid grid-cols-2 gap-5">
        <TextField
          placeholder="Form Name"
          sx={{ backgroundColor: "whitesmoke" }}
        />
        <TextField
          placeholder="Due date"
          sx={{ backgroundColor: "whitesmoke" }}
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-5">
        {formData.map((_form, i) => (
          <div
            className="w-full rounded-lg border bg-white flex min-h-[100px] px-5 py-5 gap-5"
            key={i}
          >
            <div className="h-[100px] flex items-center justify-center cursor-grab">
              <GrDrag size={20} />
            </div>
            <div className="flex flex-col w-full gap-5">
              <span className="text-3xl font-bold text-gray-700">
                Q{_form["S.No"]}. {_form["Question Text"]}
              </span>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col flex-grow">
                  Options
                  <div className="text-sm flex gap-x-8 gap-y-1 flex-wrap">
                    {_form.Option.map((_opt, i) => (
                      <p className="flex items-center gap-1 pl-5" key={i}>
                        <li>{_opt}</li>
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col">
                  Type
                  <div className="italic text-lg">{_form.Type}</div>
                </div>
                <div className="flex flex-col flex-grow">
                  Preview
                  <div className="flex gap-x-5 flex-wrap">
                    {_form.Type === "Checkbox" &&
                      _form.Option.map((_opt, i) => (
                        <FormControlLabel
                          key={i}
                          control={<Checkbox />}
                          label={_opt}
                        />
                      ))}
                    {_form.Type === "Radio" &&
                      _form.Option.map((_opt, i) => (
                        <FormControlLabel
                          key={i}
                          label={_opt}
                          control={<Radio />}
                        />
                      ))}
                    {_form.Type === "Dropdown" && (
                      <select
                        className="mt-1 block appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        defaultValue=""
                        // onChange={(e) => {
                        //   // Handle selection change here
                        // }}
                      >
                        <option value="" disabled>
                          Select your option
                        </option>
                        {_form.Option.map((_opt, i) => (
                          <option key={i} value={_opt}>
                            {_opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-end gap-5">
        <Button variant="outlined" color="error" sx={{ width: 300 }}>
          Back
        </Button>
        <Button variant="contained" sx={{ width: 300 }} color="success">
          confirm
        </Button>
      </div>
    </div>
  );
};

export default FormEditor;
