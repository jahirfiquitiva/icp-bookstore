import type { Author, Book } from '@/backend/library_app_backend.did';
import { useNavigate } from '@tanstack/react-router';
import { Field, Form, type FormInstance } from 'houseform';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { useCreateBook, useUpdateBook } from '../hooks/books';
import { availableGenres, type BookData } from '../types';
import { Button } from './button';
import { useAuthor } from '../hooks/authors';

interface BookFormProps {
  authors?: Array<Author>;
  initialData?: Book | null;
  edit?: boolean;
}

export const BookForm = (props: BookFormProps) => {
  const { authors = [] } = props;
  const formRef = useRef<FormInstance<BookData>>(null);
  const [authorNameFieldVisible, setAuthorNameFieldVisible] = useState(
    authors.length <= 0,
  );
  const { createBook, loading: creating } = useCreateBook();
  const { updateBook, loading: updating } = useUpdateBook();
  const navigate = useNavigate();

  const loading = creating || updating;

  return (
    <Form<BookData>
      ref={formRef}
      onSubmit={(values) => {
        if (props.edit) {
          updateBook(
            {
              ...values,
              id: props.initialData?.id!,
            },
            {
              onSuccess() {
                toast.success('Book updated successfully', {
                  id: 'update-book',
                });
                navigate({ to: '/' });
              },
              onError: (e) => {
                toast.error(e.message, { id: 'update-book' });
              },
            },
          );
        } else {
          createBook(values, {
            onSuccess() {
              toast.success('Book created successfully', { id: 'create-book' });
              navigate({ to: '/' });
            },
            onError: (e) => {
              toast.error(e.message, { id: 'create-book' });
            },
          });
        }
      }}>
      {({ isValid, submit }) => (
        <form
          aria-disabled={loading}
          className={'flex flex-col gap-5'}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <Field
            name={'author'}
            onBlurValidate={z.number()}
            initialValue={
              props.initialData
                ? props.initialData.author
                : authorNameFieldVisible
                  ? -1
                  : -2
            }>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'author'}>
                  Author
                </label>
                <select
                  name={'author'}
                  className={
                    'px-3 py-2 rounded-md disabled:opacity-75 disabled:cursor-not-allowed'
                  }
                  disabled={authors.length <= 0 || loading}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setValue(newValue);
                    setAuthorNameFieldVisible(newValue === -1);
                  }}>
                  <option value={-2} selected disabled>
                    Select one…
                  </option>
                  {authors.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                  <option value={-1}>New author</option>
                </select>
                {errors.map((error) => (
                  <small className={'text-red-500 text-sm'} key={error}>
                    {error}
                  </small>
                ))}
              </div>
            )}
          </Field>
          {authorNameFieldVisible ? (
            <Field
              name={'authorName'}
              onBlurValidate={
                authorNameFieldVisible
                  ? z
                      .string()
                      .min(2, 'Author name must be at least 2 characters long')
                  : undefined
              }>
              {({ value, setValue, onBlur, errors }) => (
                <div className={'flex flex-col gap-2'}>
                  <label className={'font-medium'} htmlFor={'authorName'}>
                    Author Name
                  </label>
                  <input
                    name={'authorName'}
                    value={value}
                    onBlur={onBlur}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={'Author Name'}
                    className={'px-3 py-2 rounded-md'}
                    disabled={!authorNameFieldVisible || loading}
                  />
                  {errors.map((error) => (
                    <small className={'text-red-500 text-sm'} key={error}>
                      {error}
                    </small>
                  ))}
                </div>
              )}
            </Field>
          ) : null}
          <Field
            name={'title'}
            initialValue={props.initialData?.title}
            onBlurValidate={z
              .string()
              .min(2, 'Book title must be at least 2 characters long')}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'title'}>
                  Book Title
                </label>
                <input
                  disabled={loading}
                  name={'title'}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={'Book Title'}
                  className={'px-3 py-2 rounded-md'}
                />
                {errors.map((error) => (
                  <small className={'text-red-500 text-sm'} key={error}>
                    {error}
                  </small>
                ))}
              </div>
            )}
          </Field>
          <Field
            name={'synopsis'}
            initialValue={props.initialData?.synopsis}
            onBlurValidate={z
              .string()
              .min(2, 'Book synopsis must be at least 2 characters long')}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'synopsis'}>
                  Book Synopsis
                </label>
                <textarea
                  disabled={loading}
                  name={'synopsis'}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={'Book Synopsis'}
                  className={'px-3 py-2 rounded-md min-h-20 max-h-32 resize-y'}
                />
                {errors.map((error) => (
                  <small className={'text-red-500 text-sm'} key={error}>
                    {error}
                  </small>
                ))}
              </div>
            )}
          </Field>
          <Field
            name={'genre'}
            onBlurValidate={z.string().optional()}
            initialValue={props.initialData?.genre}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'genre'}>
                  Book genre
                </label>
                <select
                  disabled={loading}
                  name={'genre'}
                  className={
                    'px-3 py-2 rounded-md disabled:opacity-75 disabled:cursor-not-allowed'
                  }
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}>
                  <option value={''} selected disabled>
                    Select one…
                  </option>
                  {availableGenres.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.map((error) => (
                  <small className={'text-red-500 text-sm'} key={error}>
                    {error}
                  </small>
                ))}
              </div>
            )}
          </Field>
          <Field
            name={'pages'}
            onBlurValidate={z
              .number()
              .positive()
              .min(2, 'A book must be at least 2 pages long')}
            initialValue={props.initialData?.pages}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'pages'}>
                  Pages count
                </label>
                <input
                  disabled={loading}
                  name={'pages'}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(Number(e.target.value))}
                  placeholder={'Pages count'}
                  className={'px-3 py-2 rounded-md'}
                  type={'number'}
                  min={2}
                />
                {errors.map((error) => (
                  <small className={'text-red-500 text-sm'} key={error}>
                    {error}
                  </small>
                ))}
              </div>
            )}
          </Field>
          <Button
            disabled={!isValid || loading}
            type='submit'
            className={'self-end'}>
            {loading ? 'Loading…' : 'Submit'}
          </Button>
        </form>
      )}
    </Form>
  );
};
