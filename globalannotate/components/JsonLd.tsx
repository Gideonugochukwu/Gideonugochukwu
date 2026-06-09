// Renders one or more JSON-LD blocks as inline <script type="application/ld+json">.
// Pass a single object or an array. Each block is emitted as its own script
// element so search engines can parse them independently.
export default function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify produces safe JSON; no HTML in keys/values from our own helpers.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
