import { Handle, Position } from "reactflow";

export default function StartNode({ data }: any) {
  return (
    <div className="px-4 py-2 rounded-full border bg-background text-xs font-medium">
      {data?.label ?? "--"}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
