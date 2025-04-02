declare namespace JSX {
  interface IntrinsicElements {
    "note-card": {
      title?: string;
      content?: string;
      updatedat?: string;
    } & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
