import { cn } from "@/lib/utils";

interface RichTextContentProps {
  content: string;
  className?: string;
}

export function RichTextContent({ content, className }: RichTextContentProps) {
  if (!content) return null;

  const blocks = content.split(/\n{2,}/);

  const renderInline = (text: string) => {
    const parts = text.split(/(\\*\\*.*?\\*\\*|\\*.*?\\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }

      return <span key={index}>{part}</span>;
    });
  };

  const renderBlock = (block: string, index: number) => {
    const trimmed = block.trim();

    if (trimmed.startsWith("## ")) {
      return (
        <h2 key={index} className="font-serif text-2xl font-bold mt-8 mb-4">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
    }

    if (trimmed.startsWith("### ")) {
      return (
        <h3 key={index} className="font-serif text-xl font-bold mt-6 mb-3">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
    }

    if (trimmed.startsWith("- ")) {
      return (
        <ul key={index} className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          {trimmed.split("\n").map((line, i) => (
            <li key={i}>{renderInline(line.replace(/^- /, ""))}</li>
          ))}
        </ul>
      );
    }

    if (/^\\d+\\.\\s/.test(trimmed)) {
      return (
        <ol key={index} className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
          {trimmed.split("\n").map((line, i) => (
            <li key={i}>{renderInline(line.replace(/^\\d+\\.\\s/, ""))}</li>
          ))}
        </ol>
      );
    }

    return (
      <p key={index} className="text-muted-foreground leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  };

  return <div className={cn("space-y-4", className)}>{blocks.map(renderBlock)}</div>;
}