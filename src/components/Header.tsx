import { Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/i18n/context";
import { useTheme } from "@/hooks/use-theme";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">
            {language === "ar" ? "الترميز الجغرافي للسعودية" : "Saudi Arabia Geocoding"}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                className={language === "en" ? "bg-accent" : ""}
              >
                <span className="mr-2">EN</span>
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("ar")}
                className={language === "ar" ? "bg-accent" : ""}
              >
                <span className="mr-2">AR</span>
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
