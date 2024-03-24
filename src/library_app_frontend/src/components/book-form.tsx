import type { Author, Book } from '@/backend/library_app_backend.did';
import { Field, Form, type FormInstance } from 'houseform';
import { useRef, useState } from 'react';
import { z } from 'zod';
import { Button } from './button';

const availableGenres = ['comedy', 'drama', 'science-fiction', 'productivity', 'academic'] as const;

type Genre = (typeof availableGenres)[number];

type BookData = Exclude<Book, 'id' | 'author' | 'genre'> & {
  author?: Book['author'];
  authorName?: string;
  genre?: Genre;
};

interface BookFormProps {
  authors?: Array<Author>;
}

export const BookForm = (props: BookFormProps) => {
  const { authors = [] } = props;
  const formRef = useRef<FormInstance<BookData>>(null);
  const [authorNameFieldVisible, setAuthorNameFieldVisible] = useState(authors.length <= 0);

  return (
    <Form<BookData> ref={formRef} onSubmit={(values) => alert(JSON.stringify(values))}>
      {({ isValid, submit }) => (
        <form
          className={'flex flex-col gap-5'}
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <Field
            name='author'
            onBlurValidate={z.number()}
            initialValue={authorNameFieldVisible ? -1 : -2}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'author'}>
                  Author
                </label>
                <select
                  name={'author'}
                  className={
                    'px-3 py-2 border rounded-md bg-slate-100 dark:bg-slate-900 disabled:opacity-75 disabled:cursor-not-allowed'
                  }
                  defaultValue={authorNameFieldVisible ? -1 : -2}
                  disabled={authors.length <= 0}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const newValue = Number(e.target.value);
                    setValue(newValue);
                    if (newValue === -1) {
                      setAuthorNameFieldVisible(true);
                    }
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
              name='authorName'
              onBlurValidate={
                authorNameFieldVisible
                  ? z.string().min(2, 'Author name must be at least 2 characters long')
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
                    className={'px-3 py-2 border rounded-md'}
                    disabled={!authorNameFieldVisible}
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
            name='title'
            onBlurValidate={z.string().min(2, 'Book title must be at least 2 characters long')}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'title'}>
                  Book Title
                </label>
                <input
                  name={'title'}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={'Book Title'}
                  className={'px-3 py-2 border rounded-md'}
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
            name='synopsis'
            onBlurValidate={z.string().min(2, 'Book synopsis must be at least 2 characters long')}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'synopsis'}>
                  Book Synopsis
                </label>
                <input
                  name={'synopsis'}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={'Book Synopsis'}
                  className={'px-3 py-2 border rounded-md'}
                />
                {errors.map((error) => (
                  <small className={'text-red-500 text-sm'} key={error}>
                    {error}
                  </small>
                ))}
              </div>
            )}
          </Field>
          <Field name='genre' onBlurValidate={z.string().optional()}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'genre'}>
                  Book genre
                </label>
                <select
                  name={'genre'}
                  className={
                    'px-3 py-2 border rounded-md bg-slate-100 dark:bg-slate-900 disabled:opacity-75 disabled:cursor-not-allowed'
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
            name='pages'
            onBlurValidate={z.number().positive().min(2, 'A book must be at least 2 pages long')}>
            {({ value, setValue, onBlur, errors }) => (
              <div className={'flex flex-col gap-2'}>
                <label className={'font-medium'} htmlFor={'pages'}>
                  Pages count
                </label>
                <input
                  name={'pages'}
                  value={value}
                  onBlur={onBlur}
                  onChange={(e) => setValue(Number(e.target.value))}
                  placeholder={'Pages count'}
                  className={'px-3 py-2 border rounded-md'}
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
          <Button disabled={!isValid} type='submit' className={'self-end'}>
            Submit
          </Button>
        </form>
      )}
    </Form>
  );
};
