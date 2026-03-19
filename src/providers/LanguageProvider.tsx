"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  AppLanguage,
  isAuthRoute,
  LANGUAGE_STORAGE_KEY,
} from "@/lib/i18n/language";
import {
  enToPtBrTranslations,
  ptBrToEnTranslations,
} from "@/lib/i18n/translations";

type LanguageContextType = {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  isAuthPage: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translateValue = (value: string, toPtBr: boolean): string => {
  const map = toPtBr ? enToPtBrTranslations : ptBrToEnTranslations;
  const trimmed = value.trim();
  const translated = map[trimmed];

  if (translated) return value.replace(trimmed, translated);

  // Fallback for dynamic content: replace known phrases inside longer strings.
  const sortedEntries = Object.entries(map).sort(
    ([a], [b]) => b.length - a.length,
  );

  let result = value;
  sortedEntries.forEach(([source, target]) => {
    if (!source || source.length < 3) return;
    result = result.split(source).join(target);
  });

  // Handle dynamic guest labels such as "2 Guests" and "1 Guest".
  if (toPtBr) {
    result = result.replace(/\b(\d+)\s+Guests?\b/g, (_, count: string) => {
      return `${count} ${Number(count) === 1 ? "Hospede" : "Hospedes"}`;
    });
  } else {
    result = result.replace(/\b(\d+)\s+Hospedes?\b/g, (_, count: string) => {
      return `${count} ${Number(count) === 1 ? "Guest" : "Guests"}`;
    });
  }

  return result;
};

const walkAndTranslate = (root: Node, toPtBr: boolean) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentElement;
    if (!parent) continue;
    if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) continue;
    if (!node.nodeValue || !node.nodeValue.trim()) continue;
    textNodes.push(node);
  }

  textNodes.forEach((node) => {
    if (!node.nodeValue) return;
    node.nodeValue = translateValue(node.nodeValue, toPtBr);
  });

  const attrSelectors = "[placeholder], [aria-label], [title]";
  const elements = Array.from(document.querySelectorAll<HTMLElement>(attrSelectors));

  elements.forEach((el) => {
    const placeholder = el.getAttribute("placeholder");
    const ariaLabel = el.getAttribute("aria-label");
    const title = el.getAttribute("title");

    if (placeholder) {
      el.setAttribute("placeholder", translateValue(placeholder, toPtBr));
    }
    if (ariaLabel) {
      el.setAttribute("aria-label", translateValue(ariaLabel, toPtBr));
    }
    if (title) {
      el.setAttribute("title", translateValue(title, toPtBr));
    }
  });
};

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [language, setLanguageState] = useState<AppLanguage>("EN");
  const authPage = isAuthRoute(pathname);
  const isApplyingTranslationsRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as
      | AppLanguage
      | null;
    if (savedLanguage === "EN" || savedLanguage === "pt-BR") {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = useCallback((nextLanguage: AppLanguage) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "pt-BR" ? "pt-BR" : "en";
  }, [language]);

  useEffect(() => {
    if (authPage) return;

    const toPtBr = language === "pt-BR";
    const applyTranslations = () => {
      if (isApplyingTranslationsRef.current) return;
      isApplyingTranslationsRef.current = true;
      try {
        walkAndTranslate(document.body, toPtBr);
      } finally {
        isApplyingTranslationsRef.current = false;
      }
    };

    applyTranslations();

    const observer = new MutationObserver(() => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        applyTranslations();
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [language, pathname, authPage]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      isAuthPage: authPage,
    }),
    [language, setLanguage, authPage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
