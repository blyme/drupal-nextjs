export function RichText({ text }: { text: string }) {
  return (
    <div
      className="mt-6 text-xl leading-loose prose"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
