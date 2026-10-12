import { useState } from "react";

function Contact() {
const [sent, setSent] = useState(false);

function handleSubmit(event) {
event.preventDefault();


// This form currently demonstrates submission only.
setSent(true);

event.target.reset();

}

return ( <section className="container py-5"> <div className="text-center mb-5">
<p
className="text-uppercase mb-2"
style={{
color: "#a7803e",
letterSpacing: "3px",
}}
>
We Are Here For You </p>


    <h1 className="display-5 fw-bold">
      Get In Touch
    </h1>

    <p className="text-muted">
      Have a question? Send us a message and we will get back to you.
    </p>
  </div>

  <div className="row justify-content-center">
    <div className="col-12 col-md-9 col-lg-7">
      <form
        className="card shadow p-4 p-md-5"
        onSubmit={handleSubmit}
        onChange={() => setSent(false)}
      >
        {/* Name */}
        <div className="mb-3">
          <label
            htmlFor="contactName"
            className="form-label fw-bold"
          >
            Your Name
          </label>

          <input
            id="contactName"
            name="name"
            type="text"
            className="form-control"
            placeholder="Enter your name"
            autoComplete="name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label
            htmlFor="contactEmail"
            className="form-label fw-bold"
          >
            Email Address
          </label>

          <input
            id="contactEmail"
            name="email"
            type="email"
            className="form-control"
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
        </div>

        {/* Message */}
        <div className="mb-4">
          <label
            htmlFor="contactMessage"
            className="form-label fw-bold"
          >
            Your Message
          </label>

          <textarea
            id="contactMessage"
            name="message"
            className="form-control"
            rows="5"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
        >
          SEND MESSAGE
        </button>

        {sent && (
          <div
            className="alert alert-success text-center mt-4 mb-0"
            role="status"
          >
            Your form was submitted successfully in this demo.
            No message has been sent to a server yet. ✨
          </div>
        )}
      </form>
    </div>
  </div>
</section>


);
}

export default Contact;
