declare module 'lucene' {
  function parse(term: string): void;
  function toString(): string;

  const term: {
    escape(s: string): string;
    unescape(s: string): string;
  };

  const phrase: {
    escape(s: string): string;
    unescape(s: string): string;
  };
}
