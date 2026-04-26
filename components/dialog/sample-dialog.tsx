import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { SAMPLE_CODES } from "@/data/sample-code";

type SampleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (code: string) => void;
};

const SampleDialog = ({ open, onOpenChange, onSelect }: SampleDialogProps) => {
  const easy = SAMPLE_CODES.filter((s) => s.difficulty === "easy");
  const hard = SAMPLE_CODES.filter((s) => s.difficulty === "hard");

  const renderSample = (sample: (typeof SAMPLE_CODES)[number]) => (
    <button
      key={sample.id}
      onClick={() => {
        onSelect(sample.code);
        onOpenChange(false);
      }}
      className="w-full rounded-md border p-3 text-left hover:bg-slate-50 dark:hover:bg-white/5 transition"
    >
      <div className="font-medium">{sample.title}</div>
      <div className="text-sm text-muted-foreground">{sample.description}</div>
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg flex flex-col max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Sample Code</DialogTitle>
          <DialogDescription>
            Choose a Python example to generate its control flow graph.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 pr-1 space-y-6 mt-4">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-emerald-500">
              Easy Examples
            </h4>
            <div className="space-y-2">{easy.map(renderSample)}</div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-amber-500">
              Medium Examples
            </h4>
            <div className="space-y-2">{hard.map(renderSample)}</div>
          </div>
        </div>
      </DialogContent>
      {/* <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Sample Code</DialogTitle>
          <DialogDescription>
            Choose a Python example to generate its control flow graph.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="mb-2 text-sm font-semibold text-emerald-500">
            Easy Examples
          </h4>
          <div className="space-y-2">{easy.map(renderSample)}</div>
        </div>

        <div className="mt-6">
          <h4 className="mb-2 text-sm font-semibold text-amber-500">
            Medium Examples
          </h4>
          <div className="space-y-2">{hard.map(renderSample)}</div>
        </div>
      </DialogContent> */}
    </Dialog>
  );
};

export default SampleDialog;
