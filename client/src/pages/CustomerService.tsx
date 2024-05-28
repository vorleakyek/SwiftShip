import { useContext, useState, type FormEvent } from 'react';
import { AppContext } from '../components/AppContext';
import YellowButton from '../components/YellowButton';
import { useNavigate } from 'react-router-dom';

export default function CustomerService() {
  const { user } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [isError, setError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!message) {
      setError(true);
    } else {
      setError(false);

      try {
        const req = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user, message }),
        };

        const res = await fetch('/api/customer-service', req);
        if (!res.ok) {
          console.error('error');
          throw new Error(`fetch Error ${res.status}`);
        }

        setIsSubmitted(true);
      } catch (err) {
        console.error(`Error registering user: ${err}`);
      }
    }
  }
  return (
    <>
      {!isSubmitted && (
        <div className="max-w-5xl py-3">
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <h1 className="font-semibold">Customer Service</h1>
                <p className="sm:w-2/3 mx-auto">
                  Thank you for contacting us, please leave a message below with
                  your email address or your phone number for us to contact you
                  back.
                </p>
              </div>
              <div className="flex justify-center flex-col py-3">
                <div className="mx-auto">
                  <textarea
                    className={`border ${
                      !message && isError ? 'red-border' : 'gray-border'
                    }  block rounded-lg p-2`}
                    name="message"
                    id="message"
                    cols={50}
                    rows={7}
                    maxLength={10000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Maximum characters of 10000"></textarea>
                </div>
                <div>
                  {!message && isError && (
                    <p className="text-red-600">Please enter a message</p>
                  )}
                </div>
              </div>
              <button className="bg-amber-400 rounded-3xl px-5 py-1">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
      {isSubmitted && (
        <div className="py-20 bg-slate-50">
          <p className="mb-3">
            Thank you for contacting us! We'll get back to you sortly.
          </p>

          <YellowButton content="Home" handleClick={() => navigate('/')} />
        </div>
      )}
    </>
  );
}
