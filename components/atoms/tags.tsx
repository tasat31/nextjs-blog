export default function Tags(props: {tags: string[]}) {

  return (
    <div className='flex flex-row'>
      {
        props.tags?.map((tag) => (
          <div className='bg-indigo-100 text-indigo-800 text-md font-large mr-2 px-2.5 py-0.5 rounded-2xl dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400'>{tag}</div>
        ))
      }
    </div>
  )
}
