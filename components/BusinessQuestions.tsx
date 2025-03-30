interface BusinessQuestions {
  id: string;
  question: string;
  description: string;
}

interface BusinessQuestionsProps {
  questions: BusinessQuestions[];
}

export default function BusinessQuestions({
  questions,
}: BusinessQuestionsProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Business Questions</h3>
      <div className="grid grid-col-1 md:grid-col-2 gap-2">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white p-4 rounded-lg border border-gray-200"
          >
            <div className="font-medium text-gray-900">{q.question}</div>
            <div className="text-sm text-gray-600 mt-1">{q.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
