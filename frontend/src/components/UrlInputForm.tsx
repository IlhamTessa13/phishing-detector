import { useState } from "react";
import type { FormEvent } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UrlInputFormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const QUICK_EXAMPLES = [
  {
    label: "Phishing",
    url: "http://paypal-verify-account.suspicious-domain.tk",
    className: "bg-red-50 text-red-600 hover:bg-red-100",
  },
  {
    label: "Safe",
    url: "https://www.google.com",
    className: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100",
  },
  {
    label: "Suspicious",
    url: "http://192.168.1.1/login-verify",
    className: "bg-amber-50 text-amber-600 hover:bg-amber-100",
  },
  {
    label: "Short URL",
    url: "http://tinyurl.com/abc123",
    className: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  },
];

export default function UrlInputForm({ onSubmit, loading }: UrlInputFormProps) {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!url.trim()) return;
    onSubmit(url.trim());
  };

  const handleQuickExample = (exampleUrl: string) => {
    setUrl(exampleUrl);
    onSubmit(exampleUrl);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="www.youtube.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="pl-9 h-12 text-base"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-6 text-base font-medium"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Scan URL
            </>
          )}
        </Button>
      </form>

      <div className="flex flex-wrap items-center gap-2 mt-3">
        <span className="text-xs text-muted-foreground">
          Quick test examples:
        </span>
        {QUICK_EXAMPLES.map((example) => (
          <button
            key={example.label}
            type="button"
            disabled={loading}
            onClick={() => handleQuickExample(example.url)}
            className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${example.className}`}
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}
