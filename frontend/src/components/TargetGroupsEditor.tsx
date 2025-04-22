"use client";

import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { TargetGroupEditor } from "./TargetGroupEditor";

export function TargetGroupsEditor() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "target_groups",
  });

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-lg">Target Groups</h3>

      {fields.map((field, groupIndex) => (
        <TargetGroupEditor key={field.id} groupIndex={groupIndex} onRemove={() => remove(groupIndex)} />
      ))}

      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ group: "", targets: [] })}
      >
        Add New Target Group
      </Button>
    </div>
  );
}
