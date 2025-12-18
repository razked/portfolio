"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Tabs value={theme} onValueChange={setTheme}>
      <TabsList className="h-9">
        <TabsTrigger value="light" className="px-2.5" title="Light mode">
          <Sun className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="dark" className="px-2.5" title="Dark mode">
          <Moon className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger value="system" className="px-2.5" title="System mode">
          <Monitor className="h-4 w-4" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
