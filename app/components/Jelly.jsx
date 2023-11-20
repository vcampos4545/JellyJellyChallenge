import Markdown from 'react-markdown'

const Jelly = ({ imgSrc, title, summary }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imgSrc} alt={title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <Markdown className="text-gray-700 text-base">{summary}</Markdown>
      </div>
    </div>
  )
}

export default Jelly