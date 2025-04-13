interface CodeBlockProps {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <div className="relative rounded-lg bg-muted p-4">
      <pre className="overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}
  