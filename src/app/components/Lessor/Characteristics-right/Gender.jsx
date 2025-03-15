export default function Gender() {
  return (
    <article className="grid gap-2">
      <h2 className="text-2xl font-semibold text-left">GENDER</h2>
      <article className="grid sm:grid-cols-3 gap-4">
        {[
          { id: "male", value: "male", label: "Male" },
          { id: "female", value: "female", label: "Female" },
          { id: "other", value: "other", label: "Any", defaultChecked: true },
        ].map((gender) => (
          <article
            key={gender.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              id={gender.id}
              name="gender"
              value={gender.value}
              defaultChecked={gender.defaultChecked}
            />
            <label htmlFor={gender.id}>{gender.label}</label>
          </article>
        ))}
      </article>
    </article>
  );
}
