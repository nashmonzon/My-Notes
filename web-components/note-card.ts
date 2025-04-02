import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("note-card")
export class NoteCard extends LitElement {
  @property({ type: String }) declare title: string;
  @property({ type: String }) declare content: string;
  @property({ type: String }) declare updatedat: string;
  @property({ type: String }) declare onEdit: () => void;
  @property({ type: String }) declare onDelete: () => void;

  static styles = css`
    :host {
      display: block;
      width: 100%;
      // height: 240px; /* Altura fija para todas las tarjetas */
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(12px);
      border-radius: 24px;
      box-shadow: 0 4px 24px rgba(0, 0, 139, 0.08),
        0 1px 2px rgba(0, 0, 139, 0.02);
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    :host::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      z-index: 1;
    }

    :host:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(0, 0, 139, 0.12),
        0 2px 4px rgba(0, 0, 139, 0.05);
    }

    .card-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 1.5rem;
    }

    h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.5rem 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.01em;
      flex-shrink: 0;
    }

    .content-wrapper {
      position: relative;
      flex: 1;
      overflow: hidden;
      margin-bottom: 0.5rem;
    }

    p {
      color: #4b5563;
      line-height: 1.5;
      margin: 0;
      font-size: 0.875rem;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      position: relative;
    }

    p::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 1.5em;
      pointer-events: none;
    }

    .footer {
      flex-shrink: 0;
      margin-top: auto;
    }

    .metadata {
      color: #6b7280;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.5rem;
    }

    button {
      padding: 0.5rem 1rem;
      border-radius: 12px;
      cursor: pointer;
      font-size: 0.75rem;
      border: none;
      font-weight: 600;
      transition: all 0.2s ease;
    }

    button.edit {
      background: rgba(79, 70, 229, 0.08);
      color: #4f46e5;
    }

    button.delete {
      background: #4f46e5;
      color: white;
    }

    button:hover {
      transform: translateY(-2px);
    }

    button.edit:hover {
      background: rgba(79, 70, 229, 0.12);
    }

    button.delete:hover {
      background: #4338ca;
    }
  `;

  render() {
    return html`
      <div class="card-content">
        <h2>${this.title}</h2>
        <div class="content-wrapper">
          <p>${this.content}</p>
        </div>
        <div class="footer">
          <div class="metadata">
            Última edición: ${new Date(this.updatedat).toLocaleString()}
          </div>
          <div class="actions">
            <button class="edit" @click=${this.onEdit}>Editar</button>
            <button class="delete" @click=${this.onDelete}>Eliminar</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "note-card": NoteCard;
  }
}
