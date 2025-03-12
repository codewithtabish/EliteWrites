'use client'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SingleBlogContent = ({ content }: { content: string }) => {
  return (
    <div className='md:py-16 py-8'>
      <div className="prose prose-lg max-w-full">{renderBlogContent(content)}</div>
    </div>
  );
};

export default SingleBlogContent;

const renderBlogContent = (content: string) => {
  if (!content) return null;

  // Ensure all images have a valid src
  content = content.replace(/<img([^>]*?)>/g, (match, attributes) => {
    if (!/src=["'].*?["']/.test(attributes)) {
      return ''; // Remove invalid images
    }
    return `<img ${attributes} class="w-full h-auto rounded-lg my-4"/>`;
  });

  // Splitting content based on <pre><code> blocks
  const blocks = content.split(/(<pre><code.*?>|<\/code><\/pre>)/);

  return blocks.map((block, index) => {
    if (block.startsWith('<pre><code')) {
      const nextBlock = blocks[index + 1] || ''; // The actual code content

      if (!nextBlock.trim()) return null; // **Skip empty code blocks**

      const languageMatch = block.match(/class="language-(.*?)"/);
      const language = languageMatch ? languageMatch[1] : 'javascript';

      return (
        <SyntaxHighlighter
          key={index}
          language={language}
          style={materialDark}
          className="rounded-lg p-4 my-4"
        >
          {decodeHTMLEntities(nextBlock)}
        </SyntaxHighlighter>
      );
    }

    return (
      <div
        key={index}
        className="space-y-4"
        dangerouslySetInnerHTML={{
          __html: block
            .replace(/<p>/g, `<p class="mb-4 leading-relaxed">`)
            .replace(/<ul>/g, `<ul class="list-disc pl-6 mb-4">`)
            .replace(/<ol>/g, `<ol class="list-decimal pl-6 mb-4">`)
            .replace(/<h1>/g, `<h1 class="text-4xl font-bold mb-4">`)
            .replace(/<h2>/g, `<h2 class="text-3xl font-semibold mb-4">`)
            .replace(/<h3>/g, `<h3 class="text-2xl font-medium mb-4">`)
        }}
      />
    );
  });
};

const decodeHTMLEntities = (text: string) => {
  return text?.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
};
