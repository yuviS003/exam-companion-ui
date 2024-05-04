// import { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // Fake data generator
// const getItems = (count) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k}`,
//     content: `item ${k}`,
//   }));

// // A little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

// const grid = 8;

// const getItemStyle = (isDragging, draggableStyle) => ({
//   // Some basic styles to make the items look a bit nicer
//   userSelect: "none",
//   padding: grid * 2,
//   margin: `0 0 ${grid}px 0`,

//   // Change background color if dragging
//   background: isDragging ? "lightgreen" : "grey",

//   // Styles we need to apply on draggables
//   ...draggableStyle,
// });

// const getListStyle = (isDraggingOver) => ({
//   background: isDraggingOver ? "lightblue" : "lightgrey",
//   padding: grid,
//   width: 250,
// });

// const DragAndDropList = () => {
//   const [items, setItems] = useState(getItems(10));

//   const onDragEnd = (result) => {
//     // Dropped outside the list
//     if (!result.destination) {
//       return;
//     }

//     const newItems = reorder(
//       items,
//       result.source.index,
//       result.destination.index
//     );

//     setItems(newItems);
//   };

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="droppable">
//         {(provided, snapshot) => (
//           <div
//             {...provided.droppableProps}
//             ref={provided.innerRef}
//             style={getListStyle(snapshot.isDraggingOver)}
//           >
//             {items.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided, snapshot) => (
//                   <div
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     style={getItemStyle(
//                       snapshot.isDragging,
//                       provided.draggableProps.style
//                     )}
//                   >
//                     {item.content}
//                   </div>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

// export default DragAndDropList;

// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// // Sample data for the Pie Chart
// const pieData = [
//   { name: "Total Users", value: 1 },
//   { name: "Total Forms", value: 2 },
//   { name: "Total Responses", value: 2 },
//   { name: "Total Feedback", value: 7 },
// ];

// // Sample data for the Bar Chart
// const barData = [
//   { name: "Total Users", value: 1 },
//   { name: "Total Forms", value: 2 },
//   { name: "Total Responses", value: 2 },
//   { name: "Total Feedback", value: 7 },
// ];

// // Colors for the Pie Chart segments
// const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// const Test = () => {
//   return (
//     <div className="container mx-auto p-4">
//       {/* Pie Chart */}
//       <div className="mb-8">
//         <h3 className="text-lg font-bold mb-4">Pie Chart</h3>
//         <PieChart width={400} height={400}>
//           <Pie
//             data={pieData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={150}
//             fill="#8884d8"
//           >
//             {pieData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={colors[index % colors.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </div>

//       {/* Bar Chart */}
//       <div>
//         <h3 className="text-lg font-bold mb-4">Bar Chart</h3>
//         <BarChart width={500} height={300} data={barData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="value" fill="#8884d8" />
//         </BarChart>
//       </div>
//     </div>
//   );
// };

// export default Test;

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { animated, useSpring } from 'react-spring';

// Define colors for the charts
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Define individual chart components
const TotalUsersPieChart = ({ data }) => {
    // Use react-spring for animation
    const style = useSpring({ value: data.value, from: { value: 0 } });

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Total Users</h3>
            <PieChart width={300} height={300}>
                <Pie data={[data]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" animationDuration={1000}>
                    <Cell fill={colors[0]} />
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

const TotalFormsBarChart = ({ data }) => {
    // Use react-spring for animation
    const style = useSpring({ value: data.value, from: { value: 0 } });

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Total Forms</h3>
            <BarChart width={300} height={300} data={[data]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" animationDuration={1000} />
            </BarChart>
        </div>
    );
};

const TotalResponsesLineChart = ({ data }) => {
    // Use react-spring for animation
    const style = useSpring({ value: data.value, from: { value: 0 } });

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Total Responses</h3>
            <LineChart width={300} height={300} data={[data]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} animationDuration={1000} />
            </LineChart>
        </div>
    );
};

const TotalFeedbackPieChart = ({ data }) => {
    // Use react-spring for animation
    const style = useSpring({ value: data.value, from: { value: 0 } });

    return (
        <div className="mb-8">
            <h3 className="text-lg font-bold mb-4">Total Feedback</h3>
            <PieChart width={300} height={300}>
                <Pie data={[data]} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" animationDuration={1000}>
                    <Cell fill={colors[2]} />
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

// Main DataVisualization component
const Test = () => {
    // Data from the user-provided information
    const data = [
        { name: 'Total Users', value: 1 },
        { name: 'Total Forms', value: 2 },
        { name: 'Total Responses', value: 2 },
        { name: 'Total Feedback', value: 7 }
    ];

    return (
        <div className="container mx-auto p-4">
            {/* Individual chart components */}
            <TotalUsersPieChart data={data[0]} />
            <TotalFormsBarChart data={data[1]} />
            <TotalResponsesLineChart data={data[2]} />
            <TotalFeedbackPieChart data={data[3]} />
        </div>
    );
};

export default Test;

