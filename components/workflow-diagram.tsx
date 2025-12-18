"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    data: { label: "📋 Strategic Planning" },
    position: { x: 0, y: 125 },
    style: {
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      border: "2px solid hsl(var(--primary))",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  {
    id: "2",
    data: { label: "🎨 Design & Architecture" },
    position: { x: 250, y: 50 },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  {
    id: "3",
    data: { label: "⚡ Clean Code Implementation" },
    position: { x: 250, y: 200 },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  {
    id: "4",
    data: { label: "🧪 Testing & Quality" },
    position: { x: 500, y: 125 },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  {
    id: "5",
    data: { label: "🚀 Deployment" },
    position: { x: 750, y: 50 },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  {
    id: "6",
    data: { label: "🔄 Continuous Improvement" },
    position: { x: 750, y: 200 },
    style: {
      background: "hsl(var(--card))",
      color: "hsl(var(--card-foreground))",
      border: "2px solid hsl(var(--border))",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
  {
    id: "7",
    type: "output",
    data: { label: "✨ Exceptional Results" },
    position: { x: 1000, y: 125 },
    style: {
      background: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      border: "2px solid hsl(var(--primary))",
      borderRadius: "12px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "600",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "e2-4",
    source: "2",
    target: "4",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "e4-6",
    source: "4",
    target: "6",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "e5-7",
    source: "5",
    target: "7",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
  {
    id: "e6-7",
    source: "6",
    target: "7",
    animated: true,
    type: "smoothstep",
    style: { strokeWidth: 3 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 20,
      height: 20,
    },
  },
];

export function WorkflowDiagram() {
  const { theme } = useTheme();
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="h-[400px] w-full rounded-lg border border-border bg-background overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={false}
        defaultEdgeOptions={{
          animated: true,
          style: { strokeWidth: 3, stroke: theme === "dark" ? "#888" : "#666" },
        }}
      >
        <Background color={theme === "dark" ? "#333" : "#ddd"} gap={16} />
      </ReactFlow>
    </div>
  );
}
