import { useEffect, useId, useRef, useState } from 'react'
import { Maximize2, Minus, Plus, RotateCcw, X } from 'lucide-react'
import type { ResearchFigureData } from '../data/models'

export function ResearchFigure({ figure }: { figure: ResearchFigureData }) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const titleId = useId()
  const trigger = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const pointer = useRef<{
    x: number
    y: number
    left: number
    top: number
  } | null>(null)

  useEffect(() => {
    if (!open) return
    const modal = dialog.current
    if (!modal) return
    const priorOverflow = document.body.style.overflow
    modal.showModal()
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    return () => {
      if (modal.open) modal.close()
      document.body.style.overflow = priorOverflow
      trigger.current?.focus({ preventScroll: true })
    }
  }, [open])

  const changeZoom = (direction: number) => {
    setZoom((current) => Math.min(4, Math.max(1, current + direction * 0.5)))
  }

  return (
    <>
      <figure className="research-figure">
        {figure.heading && <h3>{figure.heading}</h3>}
        <button
          ref={trigger}
          type="button"
          className="research-figure-trigger"
          aria-label={`View full figure: ${figure.heading ?? figure.alt}`}
          onClick={() => {
            setZoom(1)
            setOpen(true)
          }}
        >
          <img
            src={figure.src}
            alt={figure.alt}
            loading="lazy"
            decoding="async"
          />
          <span className="research-figure-action">
            <Maximize2 size={16} aria-hidden="true" /> View full figure
          </span>
        </button>
        <figcaption>{figure.caption}</figcaption>
        {figure.note && <p className="research-figure-note">{figure.note}</p>}
      </figure>
      <dialog
        ref={dialog}
        className="research-viewer"
        aria-labelledby={titleId}
        onCancel={(event) => {
          event.preventDefault()
          setOpen(false)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault()
            setOpen(false)
          } else if (event.key === '+' || event.key === '=') {
            event.preventDefault()
            changeZoom(1)
          } else if (event.key === '-') {
            event.preventDefault()
            changeZoom(-1)
          } else if (event.key === '0') {
            event.preventDefault()
            setZoom(1)
            stage.current?.scrollTo(0, 0)
          } else if (event.key.startsWith('Arrow')) {
            const offsets: Record<string, [number, number]> = {
              ArrowLeft: [-120, 0],
              ArrowRight: [120, 0],
              ArrowUp: [0, -120],
              ArrowDown: [0, 120],
            }
            const offset = offsets[event.key]
            if (offset) {
              event.preventDefault()
              stage.current?.scrollBy(offset[0], offset[1])
            }
          }
        }}
      >
        <div className="research-viewer-shell">
          <div className="research-viewer-toolbar">
            <div>
              <p className="eyebrow">Research figure</p>
              <h2 id={titleId}>{figure.heading ?? 'Full-size figure'}</h2>
            </div>
            <div className="research-viewer-controls">
              <button
                type="button"
                aria-label="Zoom out"
                disabled={zoom === 1}
                onClick={() => changeZoom(-1)}
              >
                <Minus size={19} aria-hidden="true" />
              </button>
              <span aria-live="polite">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                aria-label="Zoom in"
                disabled={zoom === 4}
                onClick={() => changeZoom(1)}
              >
                <Plus size={19} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Reset zoom"
                onClick={() => {
                  setZoom(1)
                  stage.current?.scrollTo(0, 0)
                }}
              >
                <RotateCcw size={18} aria-hidden="true" />
              </button>
              <button
                ref={closeButton}
                type="button"
                aria-label="Close full-size figure"
                onClick={() => setOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            ref={stage}
            className="research-viewer-stage"
            tabIndex={0}
            aria-label="Figure image. Use arrow keys or scroll to pan; plus and minus keys to zoom."
            onPointerDown={(event) => {
              if (zoom === 1 || event.pointerType !== 'mouse') return
              pointer.current = {
                x: event.clientX,
                y: event.clientY,
                left: event.currentTarget.scrollLeft,
                top: event.currentTarget.scrollTop,
              }
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={(event) => {
              if (!pointer.current) return
              event.currentTarget.scrollLeft =
                pointer.current.left - (event.clientX - pointer.current.x)
              event.currentTarget.scrollTop =
                pointer.current.top - (event.clientY - pointer.current.y)
            }}
            onPointerUp={() => {
              pointer.current = null
            }}
            onPointerCancel={() => {
              pointer.current = null
            }}
          >
            <img
              src={figure.src}
              alt={figure.alt}
              draggable={false}
              style={{ width: `${zoom * 100}%` }}
            />
          </div>
          <p className="research-viewer-caption">{figure.caption}</p>
          <p className="research-viewer-hint">
            Zoom with +, −, or the controls. Pan with arrow keys, scroll, touch,
            or drag after zooming. Press Escape to close.
          </p>
        </div>
      </dialog>
    </>
  )
}
