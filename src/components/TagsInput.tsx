import { useState } from "react";
import { Plus, X } from "lucide-react";
import InputField from "@/components/InputField";

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export function TagsInput({
  value,
  onChange,
}: TagsInputProps) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim().toLowerCase();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setInput("");
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1">
          <InputField
            placeholder="Adicionar tags"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
        </div>
        <button
          type="button"
          onClick={addTag}
          className="h-12 px-4 bg-zinc-800/50 hover:bg-zinc-700 rounded-md border border-zinc-700/50"
        >
          <Plus className="w-4 h-4" color="white" />
        </button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {value.map((tag) => (
            <span
              key={tag}
              onClick={() => removeTag(tag)}
              className="inline-flex items-center gap-2 cursor-pointer rounded-md bg-zinc-800 px-3 py-1 text-sm text-zinc-300 hover:bg-zinc-700"
            >
              {tag}
              <X className="w-3 h-3" strokeWidth={3} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}