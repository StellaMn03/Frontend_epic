import React from "react";
import { useForm } from "react-hook-form";

export const AddTodo = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    onAdd(data.text, data.description);
    reset();
  };

  return (
    <form
      className="flex flex-col items-center space-y-4 p-4 bg-gray-100 rounded-lg shadow-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        {...register("text", { required: "Enter a todo" })}
        type="text"
        placeholder="Enter todo..."
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      {errors.text && (
        <span className="text-red-500">{errors.text.message}</span>
      )}

      <input
        {...register("description", { required: "Enter a description" })}
        type="text"
        placeholder="Enter description..."
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      {errors.description && (
        <span className="text-red-500">{errors.description.message}</span>
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Todo
      </button>
    </form>
  );
};
