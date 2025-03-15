export default function StayDuration() {
  return (
    <article className="grid gap-2">
      <h2 className="text-2xl font-semibold text-left">STAY DURATION</h2>
      <article className="grid sm:grid-cols-2 gap-4">
        {[
          { id: "3-months", value: 3, label: "3 Months" },
          { id: "6-months", value: 6, label: "6 Months", defaultChecked: true },
          { id: "9-months", value: 9, label: "9 Months" },
          { id: "1-year", value: 12, label: "1 Year" },
          { id: "2-years", value: 24, label: "2 Years" },
        ].map((option) => (
          <article
            key={option.id}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              id={option.id}
              name="duration"
              value={option.value}
              defaultChecked={option.defaultChecked}
            />
            <label htmlFor={option.id}>{option.label}</label>
          </article>
        ))}
        <article className="col-span-2 flex items-center gap-2">
          <input type="radio" id="custom" name="duration" value="custom" />
          <input
            id="custom-duration"
            type="number"
            min="1"
            placeholder="Custom duration (months)"
          />
        </article>
      </article>
    </article>
  );
}
