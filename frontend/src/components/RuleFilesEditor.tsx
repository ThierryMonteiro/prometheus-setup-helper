
import React from 'react';
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

export function RuleFilesEditor() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rule_files"
  });
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rule Files</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <Input
              {...form.register(`rule_files.${index}`)}
              placeholder="rules/*.yaml"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => remove(index)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        <Button
          type="button"
          variant="outline"
          onClick={() => append("rules/*.yaml")}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Rule File
        </Button>
      </CardContent>
    </Card>
  );
}
