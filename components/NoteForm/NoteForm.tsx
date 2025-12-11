'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, fetchNotes, type CreateNotePayload } from '@/lib/api';
import { type NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TAGS: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: (payload: CreateNotePayload) => createNote(payload),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['notes'] });
      // window.location.href = '/notes/filter/all';
      router.push('/notes/filter/all');
      router.refresh();
    },
  });

  async function handleAction(formData: FormData) {
    const payload: CreateNotePayload = {
      title: formData.get('title') as string,
      content: (formData.get('content') as string) || '',
      tag: formData.get('tag') as NoteTag,
    };

    setIsPending(true);
    await mutation.mutateAsync(payload);
    setIsPending(false);
  }

  return (
    <form action={handleAction} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          minLength={3}
          maxLength={50}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" className={css.select} required>
          {TAGS.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <Link href="/notes/filter/all" className={css.cancelButton}>
          Cancel
        </Link>

        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
