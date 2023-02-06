import React, { useState } from "react";

const EmailSignup = ({
  data: { title, content, successMessage, errorMessage, klaviyoListId },
}) => {
  const [successMessaging, setSuccessMessaging] = useState(false);
  const [errorMessaging, setErrorMessaging] = useState(false);
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("g", klaviyoListId);

    fetch("https://manage.kmail-lists.com/ajax/subscriptions/subscribe", {
      method: "POST",
      body: formData,
    })
      .then((blob) => blob.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessaging(successMessage);
        } else {
          setErrorMessaging(true);
        }
      })
      .catch((err) => {
        setErrorMessaging(true);
        console.error(err);
      });
  };

  return (
    <div className="text-white">
      <h3>{title}</h3>
      <div
        className="mt-4 md:mt-6"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {successMessaging ? (
        <span className="email-signup__success text-white mx-auto">
          {successMessage}
        </span>
      ) : (
        <>
          <form
            className="email-signup__form mt-8"
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
          >
            <div className="relative">
              <input
                name="email"
                className="email-signup__input !text-white placeholder:!text-white !py-2.5 !pl-1 !pr-4 !border-0 !border-b !border-grey-300 !bg-transparent"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <input
                className="absolute top-1/2 right-1 -translate-y-1/2 sub-xs caps text-white"
                type="submit"
                value="Submit"
              />
            </div>
            {errorMessaging && (
              <span className="email-signup__error text-white">
                {errorMessage}
              </span>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EmailSignup;
