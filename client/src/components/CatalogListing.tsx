export default function CatalogListing() {
  const arrayList = [
    'Book',
    'Clothes',
    'Pets supplies',
    'Kitchens',
    'Toys',
    'Games',
  ];
  return (
    <div className="w-11/12 m-auto">
      <ul className="text-neutral-100 flex justify-around pt-2">
        {arrayList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
