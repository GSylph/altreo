import { ExternalLink as ExternalLinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExternalLinkProps {
  link: {
    title: string
    url: string
    description: string
  }
}

export function ExternalLink({ link }: ExternalLinkProps) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h4 className="font-semibold mb-2">{link.title}</h4>
      <p className="text-sm text-muted-foreground mb-4">{link.description}</p>
      <Button variant="outline" asChild>
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
          Visit Resource
          <ExternalLinkIcon className="h-4 w-4" />
        </a>
      </Button>
    </div>
  )
}
