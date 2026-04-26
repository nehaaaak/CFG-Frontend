import { Button } from "./ui/button";
import { Play, PanelLeftClose, PanelLeftOpen } from "lucide-react";

type HomeActionBtnProps = {
  isEditorVisible: boolean;
  code: string;
  toggleEditorVisibility: any;
  handleGenerateCFG: () => void;
  isLoading: boolean;
};

const HomeActionBtn = ({
  isEditorVisible,
  code,
  toggleEditorVisibility,
  handleGenerateCFG,
  isLoading,
}: HomeActionBtnProps) => {
  return (
    <>
      <Button variant="outline" size="lg" onClick={toggleEditorVisibility}>
        {isEditorVisible ? (
          <>
            <PanelLeftClose className="mr-2 h-4 w-4" />
            Hide Code
          </>
        ) : (
          <>
            <PanelLeftOpen className="mr-2 h-4 w-4" />
            Show Code
          </>
        )}
      </Button>

      <Button
        size="lg"
        disabled={!code.trim() || isLoading}
        onClick={handleGenerateCFG}
      >
        <Play className="mr-2 h-4 w-4" />
        Generate CFG
      </Button>
    </>
  );
};

export default HomeActionBtn;
