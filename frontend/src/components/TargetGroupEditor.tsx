import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";


interface TargetGroupEditorProps {
    groupIndex: number;
    onRemove: () => void;
  }
  
  export function TargetGroupEditor({ groupIndex, onRemove }: TargetGroupEditorProps) {
    const { control, register } = useFormContext();
    const { fields: targetFields, append: appendTarget, remove: removeTarget } = useFieldArray({
      control,
      name: `target_groups.${groupIndex}.targets`,
    });
  
    return (
      <div className="border p-6 rounded-lg bg-muted space-y-4">
        <div>
          <label className="block text-sm font-medium">Group Label</label>
          <input
            {...register(`target_groups.${groupIndex}.group`)}
            placeholder="e.g., frontend"
            className="input"
          />
        </div>
  
        <div className="space-y-2">
          <h4 className="font-medium text-md">Targets</h4>
  
          {targetFields.map((target, targetIndex) => (
            <div key={target.id} className="flex items-center space-x-2">
              <input
                {...register(`target_groups.${groupIndex}.targets.${targetIndex}.address`)}
                placeholder="e.g., 192.168.0.1:9100"
                className="input flex-1"
              />
              <Button type="button" variant="destructive" onClick={() => removeTarget(targetIndex)}>
                Remove
              </Button>
            </div>
          ))}
  
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => appendTarget({ address: "" })}
          >
            Add Target
          </Button>
        </div>
  
        <Button type="button" variant="destructive" onClick={onRemove}>
          Remove Group
        </Button>
      </div>
    );
  } export default TargetGroupEditor;
  