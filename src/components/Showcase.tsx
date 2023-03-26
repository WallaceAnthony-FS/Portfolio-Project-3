export default function Showcase({ items, Component, title }) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto rounded-md bg-white/50 p-4">
      {items.map((item) => (
        <Component key={item.href} item={item} />
      ))}
    </div>
  );
}
