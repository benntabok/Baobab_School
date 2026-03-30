import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const CoursePage = ({ markdownString }) => {
  const { data, content } = matter(markdownString);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <header className="border-b-2 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>
        <p className="text-sm text-blue-600 font-mono">/courses/{data.slug}</p>
      </header>

      {/* 1. Resources Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Resources</h3>
        <div className="aspect-video mb-4">
          <iframe 
            className="w-full h-full rounded"
            src={`https://www.youtube.com/embed/${data.video_id}`}
            title="Course Video"
            allowFullScreen
          />
        </div>
        <ul className="list-disc pl-5 space-y-2">
          {data.resources.map((res, i) => (
            <li key={i}><a href={res.link} className="text-blue-500 hover:underline">{res.title}</a></li>
          ))}
        </ul>
      </section>

      {/* 2. Objectives */}
      <section className="bg-gray-50 p-4 rounded mb-8">
        <h3 className="font-bold mb-2">Objectives:</h3>
        {data.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
      </section>

      {/* 3. The Content */}
      <article className="prose lg:prose-xl mb-12">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

      {/* Next steps: Quiz and Linter will be injected here */}
    </div>
  );
};