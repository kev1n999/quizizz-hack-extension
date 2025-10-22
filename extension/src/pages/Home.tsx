import { useEffect, useState } from "react";
import Header from "../components/Header";
import Warning from "../components/Warning";
import { currentWindow } from "../utils/currentWindow";
import { isQuizziz } from "../utils/isQuizzis";
import StartButton from "../components/StartButton";
import { quizzizScraping } from "../utils/quizzizScraping";
import Tips from "../components/Tips";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<chrome.tabs.Tab | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const onQuizziz = isQuizziz(currentUrl);

  useEffect(() => {
    (async () => {
      const currentTab = await currentWindow();
      if (currentTab && currentTab.url) {
        setCurrentTab(currentTab);
        setCurrentUrl(currentTab.url);
      }
    })();
  }, []);

  const scraping = async () => {
    if (currentTab != null) {
      await quizzizScraping(currentTab);
    }
  };

  return (
    <div className="h-[290px] bg-neutral-900 w-[350px] flex justify-center flex-col gap-3">
      <Header />
      <Warning isQuizziz={onQuizziz} />
      <Tips />
      <StartButton onClick={scraping} />
    </div>
  );
}
