export default function CustomerService() {
  function handleSubmit(event) {
    event.preventDefault();
  }
  return (
    <div className="max-w-5xl py-3">
      <form onSubmit={handleSubmit}>
        <h1 className="font-semibold">Customer Service</h1>
        <p>
          Thank you for contacting us, please leave a message below with your
          email address or your phone number for us to contact you back.
        </p>
        <div className="flex justify-center py-3">
          <textarea
            className="border border-slate-500 block rounded-lg"
            name=""
            id=""
            cols={50}
            rows={7}></textarea>
        </div>

        <button className="bg-amber-400 rounded-3xl px-5 py-1">Send</button>
      </form>
    </div>
  );
}
