// "use client";

// import { useEffect, useState } from "react";
// import {
//   ReactFlow,
//   Background,
//   type Node,
//   type Edge,
//   Position,
// } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";

// const nodeStyle = {
//   background: "hsl(var(--card))",
//   border: "2px solid hsl(var(--border))",
//   borderRadius: "8px",
//   padding: "12px 24px",
//   fontSize: "14px",
//   color: "hsl(var(--foreground))",
//   fontWeight: "500",
//   width: "auto",
//   minWidth: "150px",
//   textAlign: "center" as const,
// };

// // Horizontal layout for desktop
// const horizontalNodes: Node[] = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Idea & Planning" },
//     position: { x: 0, y: 0 },
//     style: nodeStyle,
//     sourcePosition: Position.Right,
//   },
//   {
//     id: "2",
//     data: { label: "Design" },
//     position: { x: 200, y: 0 },
//     style: nodeStyle,
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: "3",
//     data: { label: "Development" },
//     position: { x: 400, y: 0 },
//     style: nodeStyle,
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: "4",
//     data: { label: "Testing" },
//     position: { x: 600, y: 0 },
//     style: nodeStyle,
//     sourcePosition: Position.Right,
//     targetPosition: Position.Left,
//   },
//   {
//     id: "5",
//     type: "output",
//     data: { label: "Production" },
//     position: { x: 800, y: 0 },
//     style: nodeStyle,
//     targetPosition: Position.Left,
//   },
// ];

// // Vertical layout for mobile
// const verticalNodes: Node[] = [
//   {
//     id: "1",
//     type: "input",
//     data: { label: "Idea & Planning" },
//     position: { x: 50, y: 0 },
//     style: nodeStyle,
//     sourcePosition: Position.Bottom,
//   },
//   {
//     id: "2",
//     data: { label: "Design" },
//     position: { x: 50, y: 100 },
//     style: nodeStyle,
//     sourcePosition: Position.Bottom,
//     targetPosition: Position.Top,
//   },
//   {
//     id: "3",
//     data: { label: "Development" },
//     position: { x: 50, y: 200 },
//     style: nodeStyle,
//     sourcePosition: Position.Bottom,
//     targetPosition: Position.Top,
//   },
//   {
//     id: "4",
//     data: { label: "Testing" },
//     position: { x: 50, y: 300 },
//     style: nodeStyle,
//     sourcePosition: Position.Bottom,
//     targetPosition: Position.Top,
//   },
//   {
//     id: "5",
//     type: "output",
//     data: { label: "Production" },
//     position: { x: 50, y: 400 },
//     style: nodeStyle,
//     targetPosition: Position.Top,
//   },
// ];

// const edges: Edge[] = [
//   {
//     id: "e1-2",
//     source: "1",
//     target: "2",
//     animated: true,
//   },
//   {
//     id: "e2-3",
//     source: "2",
//     target: "3",
//     animated: true,
//   },
//   {
//     id: "e3-4",
//     source: "3",
//     target: "4",
//     animated: true,
//   },
//   {
//     id: "e4-5",
//     source: "4",
//     target: "5",
//     animated: true,
//   },
// ];

// export function WorkflowDiagram() {
//   const [isMounted, setIsMounted] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   if (!isMounted) {
//     return <div className="h-[500px] md:h-[200px] w-full" />;
//   }

//   return (
//     <div className="h-[500px] md:h-[200px] w-full workflow-diagram">
//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//           .workflow-diagram .react-flow__node {
//             border: 2px solid #888 !important;
//             border-radius: 8px !important;
//             padding: 0 !important;
//           }
//           .workflow-diagram .react-flow__node-default,
//           .workflow-diagram .react-flow__node-input,
//           .workflow-diagram .react-flow__node-output {
//             border: 2px solid #888 !important;
//             padding: 0 !important;
//           }
//         `,
//         }}
//       />
//       <ReactFlow
//         nodes={isMobile ? verticalNodes : horizontalNodes}
//         edges={edges}
//         fitView
//         fitViewOptions={{
//           padding: 0.2,
//           includeHiddenNodes: false,
//         }}
//         nodesDraggable={false}
//         nodesConnectable={false}
//         elementsSelectable={false}
//         zoomOnScroll={false}
//         zoomOnPinch={false}
//         panOnDrag={false}
//         preventScrolling={false}
//         panOnScroll={false}
//         proOptions={{ hideAttribution: true }}
//       >
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// }
