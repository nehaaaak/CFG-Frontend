import { Handle, Position } from "reactflow";

type EndNodeProps = {
  data: {
    label: string;
  };
};

export default function EndNode({ data }: EndNodeProps) {
  return (
    <div className="px-5 py-2 rounded-full border bg-background text-xs font-semibold shadow-sm">
      {data?.label ?? "--"}

      {/* incoming only */}
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
