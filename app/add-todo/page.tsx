'use client';
import AuthenticatedRoute from '@/components/security/AuthenticatedRoute';
import { todoApi } from '@/redux/api';
import { useAppSelector } from '@/redux/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import moment from 'moment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
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

export default function AddTodoPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: { targetDate: moment().format('YYYY-MM-DD') },
  });
  const [addOneTodoForUsername] = todoApi.useAddOneTodoForUsernameMutation();

  const username = useAppSelector((state) => state.auth.username);

  const onAdd = useCallback(
    async (formData: FormFields) => {
      const addData = { username, ...formData };
      try {
        await addOneTodoForUsername(addData).unwrap();
        router.push('/todos');
      } catch (error) {
        setError('root', {
          message: 'Failed to add the todo.',
        });
      }
    },
    [addOneTodoForUsername, username, router, setError]
  );

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await onAdd(data);
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
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          {errors.description && (
            <div className="text-red-500">{errors.description.message}</div>
          )}
          <input
            type="date"
            {...register('targetDate')}
            className="input input-bordered input-secondary w-full max-w-xs"
          />
          {errors.targetDate && (
            <div className="text-red-500">{errors.targetDate.message}</div>
          )}
          <label className="cursor-pointer label">
            <span className="label-text">done</span>
            <input
              type="checkbox"
              {...register('done')}
              className="checkbox checkbox-secondary"
            />
          </label>
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-secondary"
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
