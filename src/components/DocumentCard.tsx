import { ArrowDownToLine, FileText } from 'lucide-react'
import type { CvDocument } from '../data/models'

export function DocumentCard({ document }: { document: CvDocument }) {
  if (document.state === 'available' && !document.downloadLabel.trim()) {
    throw new Error('An available document needs a download label')
  }
  return (
    <article className="document-card">
      <FileText size={32} strokeWidth={1.2} aria-hidden="true" />
      <h2>{document.title}</h2>
      <p>{document.description}</p>
      {document.state === 'preparation' ? (
        <span className="tag">{document.statusLabel}</span>
      ) : (
        <a className="document-download" href={document.pdfUrl} download>
          <ArrowDownToLine size={17} aria-hidden="true" />
          {document.downloadLabel}
          <span className="document-format">{document.format}</span>
        </a>
      )}
    </article>
  )
}
