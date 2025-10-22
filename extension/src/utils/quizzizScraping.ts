export async function quizzizScraping(tab: chrome.tabs.Tab) {
  try {
    if (!tab.id) {
      return console.log("Tab is missing!");
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => {
        const runQuiz = async () => {
          try {
            let codeImage: string | undefined;

            const startButton = document.querySelector(
              'button[data-cy="start-solo-game"]'
            ) as HTMLButtonElement;
            if (startButton) startButton.click();

            const totalQuestionsEl = document.querySelector(
              'span[data-cy="total-question-number"]'
            );
            const totalQuestions = Number(totalQuestionsEl?.textContent || "0");

            for (let i = 0; i < totalQuestions; i++) {
              const questionEl = document.querySelector(
                'div[id="questionText"]'
              );
              const questionText = questionEl?.textContent?.trim() || "";

              const optionDivs = Array.from(
                document.querySelectorAll("div")
              ).filter((div) => div.id.includes("option"));

              const optionsMap = new Map<number, string>();
              optionDivs.forEach((div, idx) =>
                optionsMap.set(idx, div.textContent?.trim() || "")
              );

              const image = Array.from(document.querySelectorAll("img")).find(
                (img) => img.alt.trim() === "Question image"
              );

              if (image) {
                const res = await fetch(image.src, { mode: "cors" });
                const blob = await res.blob();

                codeImage = await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onloadend = () => resolve(reader.result as string);
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
                });
              }

              const res = await fetch(
                "http://localhost:3000/api/get-quizziz-answer",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    question: questionText,
                    options: Object.fromEntries(optionsMap),
                    image: codeImage,
                  }),
                }
              );

              const data = await res.json();
              const answer = data.response;

              const correctOption = optionDivs.find(
                (div) =>
                  div.innerText.trim().toLowerCase() ===
                  answer.trim().toLowerCase()
              ) as HTMLElement | undefined;

              if (correctOption) {
                correctOption.style.backgroundColor = "green";
              }
            }

            console.log("Quiz finalizado!");
          } catch (err) {
            console.error("Erro ao resolver quiz:", err);
          }
        };

        runQuiz();
      },
    });
  } catch (err) {
    console.error(err);
  }
}
