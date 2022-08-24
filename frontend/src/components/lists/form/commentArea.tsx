import FormError from 'components/formError'
import React from 'react'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  comment: string
  formError?: string
}

const CommentArea = React.memo(({ onChange, comment, formError }: Props) => (
  <>
    <label htmlFor='comment' className='block mb-2 font-medium text-gray-900 w-full border-orange-500 border-l-8 text-sm tracking-wide p-3'>
      コメント
    </label>
    <textarea
      name='comment'
      onChange={onChange}
      value={comment}
      id='comment'
      rows={4}
      className={`${formError ? 'border-red-300' : 'border-gray-300'} block p-2.5 w-full text-gray-900 rounded-lg border focus:ring-sky-400 focus:border-sky-400 duration-150 ease-in-out`}
      placeholder='コメント'
    />
    {formError ? <FormError error={formError} /> : undefined}
  </>
))

CommentArea.displayName = 'CommentArea'

export default CommentArea
