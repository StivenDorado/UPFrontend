export default function IncludedServices() {
  return (
    <article className="grid gap-2">
      <h2 className="text-2xl font-semibold text-left">INCLUDED SERVICES</h2>
      <article className="grid sm:grid-cols-2 gap-4">
        {[
          "Wifi",
          "Electricity",
          "TV",
          "Garage",
          "Kitchen",
          "Water",
          "Washing Machine",
          "Fridge",
          "Gas",
        ].map((service) => (
          <article key={service} className="flex items-center gap-2">
            <input type="checkbox" id={service.toLowerCase()} name="services" />
            <label htmlFor={service.toLowerCase()}>{service}</label>
          </article>
        ))}
      </article>
    </article>
  );
}
