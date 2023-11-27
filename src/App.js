// import logo from "./logo.svg";
import "./App.css";
import Modal from "react-modal";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setValidationErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData);
    try {
      const response = await fetch(
        `http://localhost:3001/quote/request`,
        requestOptions
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
    closeModal();
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
  };
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // State to manage validation errors
  const [validationErrors, setValidationErrors] = useState({});

  // ... (openModal, closeModal, and handleSubmit functions remain the same)

  // Handler to update formData state when input fields change
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Fill the Form
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Contact Form Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Information Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="border rounded w-full py-2 px-3"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange} // Apply onChange handler
                required
              />
              {validationErrors.firstName && (
                <p className="text-red-500 text-sm">
                  {validationErrors.firstName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="border rounded w-full py-2 px-3"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange} // Apply onChange handler
                required
              />
              {validationErrors.lastName && (
                <p className="text-red-500 text-sm">
                  {validationErrors.lastName}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="border rounded w-full py-2 px-3"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange} // Apply onChange handler
                required
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm">{validationErrors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                className="border rounded w-full py-2 px-3"
                placeholder="Phone"
                value={formData.phoneNumber}
                onChange={handleInputChange} // Apply onChange handler
                required
              />
              {validationErrors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {validationErrors.phoneNumber}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="message">Message</label>
              <textarea
                id="message" // Corrected ID from "phone"
                className="border rounded w-full py-2 px-3"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleInputChange} // Apply onChange handler
                required
              ></textarea>
              {validationErrors.message && (
                <p className="text-red-500 text-sm">
                  {validationErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Send
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default App;
