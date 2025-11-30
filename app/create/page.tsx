"use client";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useForm, useFieldArray } from "react-hook-form";
import { createPoll } from "../../store/slices/pollsSlice";
import { useRouter } from "next/navigation";

type FormValues = {
  question: string;
  options: { text: string }[];
};

export default function CreatePollPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: { question: "", options: [{ text: "" }, { text: "" }] },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "options" });

  const onSubmit = async (data: FormValues) => {
    // validation: ensure question and at least 2 non-empty options
    const opts = data.options.map((o) => o.text.trim()).filter(Boolean);
    if (!data.question.trim()) {
      alert("Question is required");
      return;
    }
    if (opts.length < 2) {
      alert("Please provide at least two options");
      return;
    }

    try {
      await dispatch(createPoll({ question: data.question.trim(), options: opts })).unwrap();
      router.push("/"); // or profile
    } catch (err: any) {
      alert("Failed to create poll: " + (err.message || JSON.stringify(err)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-8 flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-white rounded-2xl p-8 shadow">
        <h2 className="text-2xl font-semibold mb-2">Create a New Poll</h2>
        <p className="text-sm text-gray-500 mb-6">Add a question and options to create a new poll</p>

        <label className="text-sm font-medium">Poll question</label>
        <input {...register("question", { required: true })}
          className="w-full mt-2 mb-4 px-4 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Enter your poll question" />

        <label className="text-sm font-medium">Options</label>
        <div className="space-y-3 mt-2">
          {fields.map((f, i) => (
            <div key={f.id} className="flex gap-2">
              <input
                {...register(`options.${i}.text` as const, { required: i < 2 })} // ensure first two required
                className="flex-1 px-4 py-2 rounded-xl bg-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Option ${i + 1}`}
              />
              {fields.length > 2 && (
                <button type="button" onClick={() => remove(i)} className="px-3 py-2 rounded-lg bg-red-100 text-red-600">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 mt-6">
          <button type="button" onClick={() => append({ text: "" })} className="px-6 py-2 rounded-xl bg-blue-600 text-white">
            Add Option
          </button>

          <button type="submit" className="px-8 py-2 rounded-xl bg-green-600 text-white">
            Create Poll
          </button>
        </div>

        {formState.errors && Object.keys(formState.errors).length > 0 && (
          <p className="text-red-600 mt-4 text-sm">Please fix validation errors above.</p>
        )}
      </form>
    </div>
  );
}



