'use client';
import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';
import { todoApi } from '@/redux/api';
import { useAppSelector } from '@/redux/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import moment from 'moment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const schema = z.object({
  description: z
    .string()
    .min(1, 'Description is required')
    .min(5, 'Description must be at least 5 characters'),
  done: z.boolean(),
  targetDate: z
    .string()
    .min(1, 'Date is required')
    .refine(
      (value) => moment(value, 'YYYY-MM-DD').isAfter(moment()),
      'Date must be in the future'
    ),
});

type FormFields = z.infer<typeof schema>;

export default function TodoComponent({ params }: { params: { id: number } }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const [updateOneTodoForUsername] =
    todoApi.useUpdateOneTodoForUsernameMutation();

  const { id } = params;
  const username = useAppSelector((state) => state.auth.username);
  const { data: todo } = todoApi.useRetrieveOneTodoForUsernameQuery({
    username,
    id,
  });

  useEffect(() => {
    if (todo) {
      reset({
        description: todo.description,
        done: todo.done,
        targetDate: todo.targetDate,
      });
    }
  }, [todo, reset]);

  const onUpdate = useCallback(
    async (formData: FormFields) => {
      const updateData = { id, username, ...formData };
      try {
        await updateOneTodoForUsername(updateData).unwrap();
        router.push('/todos');
      } catch (error) {
        setError('root', {
          message: 'Failed to update the todo.',
        });
      }
    },
    [updateOneTodoForUsername, id, username, setError]
  );

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await onUpdate(data);
    } catch (error) {
      setError('root', {
        message: 'An error occured while submitting the form.',
      });
    }
  };

  return (
    <AuthenticatedRoute>
      <div className="centered">
        <h1>Enter ToDo Details</h1>
        <form
          className="form-control gap-2 overflow-x-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="description"
            {...register('description')}
            className="input input-bordered input-success w-full max-w-xs"
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
          <input
            type="date"
            {...register('targetDate')}
            className="input input-bordered input-success w-full max-w-xs"
          />
          {errors.targetDate && (
            <div className="text-red-500">{errors.targetDate.message}</div>
          )}
          <label className="cursor-pointer label">
            <span className="label-text">done</span>
            <input
              type="checkbox"
              {...register('done')}
              className="checkbox checkbox-success"
            />
          </label>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-success"
          >
            {isSubmitting ? 'loading...' : 'submit'}
          </button>
          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}
        </form>
      </div>
    </AuthenticatedRoute>
  );
}
