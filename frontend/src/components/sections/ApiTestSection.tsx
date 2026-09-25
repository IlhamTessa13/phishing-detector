import { useState } from "react";
import { Play, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkUrl } from "../../services/api";
import type { PredictionResponse } from "../../types/prediction";

export default function ApiTestSection() {
  const [testUrl, setTestUrl] = useState("https://www.google.com");
  const [response, setResponse] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTryIt = async () => {
    setLoading(true);
    try {
      const data = await checkUrl(testUrl);
      setResponse(data);
    } catch {
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

const curlCommand = `curl -X POST https://web-phishing-datmin-production.up.railway.app/predict \\\n  -H "Content-Type: application/json" \\\n  -d '{"url": "${testUrl}"}'`;

  const handleCopy = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section
      id="api-test"
      className="min-h-[70vh] flex items-center justify-center px-4 py-20 bg-slate-50"
    >
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">API Test</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Coba endpoint API secara langsung 
          </p>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              ENDPOINT
            </p>
            <code className="block text-sm bg-slate-900 text-emerald-400 rounded-lg px-3 py-2 font-mono">
              POST /predict
            </code>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1.5">
              TEST URL
            </p>
            <div className="flex gap-2">
              <Input
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="font-mono text-sm"
              />
              <Button onClick={handleTryIt} disabled={loading}>
                <Play className="h-4 w-4 mr-1.5" />
                {loading ? "..." : "Try it"}
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                CURL EXAMPLE
              </p>
              <button
                onClick={handleCopy}
                className="text-xs flex items-center gap-1 text-primary hover:underline"
              >
                {copied ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="text-xs bg-slate-900 text-slate-100 rounded-lg px-3 py-3 overflow-x-auto font-mono">
              {curlCommand}
            </pre>
          </div>

          {response && (
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1.5">
                RESPONSE
              </p>
              <pre className="text-xs bg-slate-900 text-emerald-400 rounded-lg px-3 py-3 overflow-x-auto font-mono">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
