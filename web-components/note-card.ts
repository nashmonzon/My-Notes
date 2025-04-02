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
      // height: 280px;
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
      padding: 2rem;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    h2 {
      font-size: 1.375rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.75rem 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: -0.01em;
    }

    p {
      color: #4b5563;
      line-height: 1.6;
      margin: 0;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      font-size: 0.9375rem;
      flex: 1;
      position: relative;
    }

    p::after {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 30%;
      height: 1.6em;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.9) 50%
      );
      pointer-events: none;
    }

    .metadata {
      color: #6b7280;
      font-size: 0.8125rem;
      margin-top: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 1rem;
      flex-shrink: 0;
    }

    button {
      padding: 0.625rem 1.25rem;
      border-radius: 12px;
      cursor: pointer;
      font-size: 0.875rem;
      border: none;
      font-weight: 600;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }

    button::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
      background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
      background-repeat: no-repeat;
      background-position: 50%;
      transform: scale(10, 10);
      opacity: 0;
      transition: transform 0.3s, opacity 0.5s;
    }

    button:active::after {
      transform: scale(0, 0);
      opacity: 0.3;
      transition: 0s;
    }

    button.edit {
      background: rgba(79, 70, 229, 0.08);
      color: #4f46e5;
    }

    button.delete {
      background: #4f46e5;
      color: white;
      box-shadow: 0 2px 8px rgba(79, 70, 229, 0.25);
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
        <p>${this.content}</p>
        <div class="metadata">
          Última edición: ${new Date(this.updatedat).toLocaleString()}
        </div>
        <div class="actions">
          <button class="edit" @click=${this.onEdit}>Editar</button>
          <button class="delete" @click=${this.onDelete}>Eliminar</button>
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
