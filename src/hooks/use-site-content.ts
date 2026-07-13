import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function parseKeyValueContent(raw: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = raw.split("\n");
  let currentKey = "";
  let currentValue: string[] = [];

  for (const line of lines) {
    const match = line.match(/^([A-Za-z][A-Za-z0-9\\s]*):\\s*(.*)$/);
    if (match) {
      if (currentKey) {
        result[currentKey.toLowerCase().trim()] = currentValue.join("\n").trim();
      }
      currentKey = match[1];
      currentValue = [match[2]];
    } else if (currentKey) {
      currentValue.push(line);
    }
  }

  if (currentKey) {
    result[currentKey.toLowerCase().trim()] = currentValue.join("\n").trim();
  }

  return result;
}

export function useSiteContent(
  keys: string[],
  defaults: Record<string, string> = {}
) {
  const [contentMap, setContentMap] = useState<Record<string, string>>(defaults);
  const [loading, setLoading] = useState(true);

  const keysSignature = useMemo(() => keys.join(","), [keys]);
  const defaultsSignature = useMemo(
    () => JSON.stringify(defaults),
    [defaults]
  );

  useEffect(() => {
    let isActive = true;

    async function load() {
      if (!keys.length) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("site_content")
          .select("content_key, content_value")
          .in("content_key", keys);

        if (error) throw error;

        const next: Record<string, string> = { ...defaults };
        for (const row of data || []) {
          if (row.content_key) {
            next[row.content_key] = row.content_value || "";
          }
        }

        if (isActive) {
          setContentMap(next);
        }
      } catch (error) {
        console.error("useSiteContent error:", error);
        if (isActive) {
          setContentMap(defaults);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isActive = false;
    };
  }, [keysSignature, defaultsSignature]);

  return { contentMap, loading };
}