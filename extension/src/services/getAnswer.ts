export async function getQuestionAsnwer(
  question: string,
  options: Map<number, string>
) {
  try {
    const request = await fetch(
      "http://localhost:3000/api/get-quizziz-answer",
      {
        method: "POST",
        body: JSON.stringify({
          question,
          options,
        }),
      }
    );

    if (request.ok) {
      const answer = await request.json();
      return answer;
    }

    return "err";
  } catch (err) {
    console.error(err);
  }
}
