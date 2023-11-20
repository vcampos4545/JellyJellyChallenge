import Markdown from 'react-markdown'

const Jelly = ({ imgSrc, title, summary }) => {
  return (
    <div className="max-w-xxl rounded overflow-hidden shadow-lg mt-10">
      <div class="flex justify-center items-center">
        <img className="w-1/2 rounded" src={imgSrc} alt={title} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <Markdown className="text-gray-700 text-base">{summary}</Markdown>
      </div>
    </div>
  )
}

export default Jelly