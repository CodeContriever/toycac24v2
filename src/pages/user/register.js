import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiLock,
  FiLoader,
  FiSend,
  FiXCircle,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { BiSolidInstitution } from "react-icons/bi";
import { GiGraduateCap } from "react-icons/gi";
import { TbBrandGuardian } from "react-icons/tb";
import { MdCategory } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { validateRegistrationFormData } from "../../utils/user/registrationFormValidation";
import { registerUserAccount } from "../../redux/user/userRegistrationAuthSlice";
import { Modal } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function RegisterUser() {
  // Inside your functional component
  const router = useRouter();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    password: "",
    confirmPassword: "",
    institution: "",
    yearOfGraduation: "",
    guardianName: "",
    guardianPhoneNumber: "",
    medicalCondition: "",
    proofOfPayment: null,
    category: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [loading, setLoading] = useState(false); // State to track loading state
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [userRegisteredData, setUserRegisteredData] = useState({
  //   fullName: "",
  //   uniqueID: "",
  // });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      // Store the file itself in the state
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      // For other input types, handle normally
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegistrationFormData(formData)) {
      toast.error("Please fill in all fields correctly.");
      return;
    }

    const formDataToSend = new FormData();
    // Append all form data to FormData object
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    let userUniqueID = ""; // Define uniqueID outside the try block
    try {
      setLoading(true);
      const response = await dispatch(registerUserAccount(formDataToSend));
      console.log("Response:", response);
      if (
        response.payload &&
        response.payload.message === "Registration successful"
      ) {
        setLoading(false);
        userUniqueID = response.payload.uniqueID;
        // const { fullName, uniqueID } = response.payload;
        // setUserRegisteredData({ fullName, uniqueID });
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push(
            `/user/signin?uniqueID=${encodeURIComponent(userUniqueID)}`
          );
          // router.push("/user/signin");
        }, 5000); // Redirect to signin page after 2 seconds
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to create super admin account.");
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-black"
      style={{
        backgroundImage: `url(/toycac24BG.jpg)`,
      }}
    >
      <div className="">
        <Toaster position="bottom-center" reverseOrder={false}></Toaster>
      </div>

      <div className="w-full flex flex-col items-center justify-center min-h-screen ">
        {/* logo */}
        <div className="flex flex-row justify-center items-center gap-2 mb-4">
          <Image
            src="/timsan_logo.png"
            alt="timsan_logo"
            width={64}
            height={64}
          />
          <Image
            src="/OyoState_logo.png"
            alt="OyoState_logo"
            width={82}
            height={82}
          />
        </div>

        <h2 className="text-2xl text-[#647862] font-bold mt-4 mb-4">
          TOYCAC&apos;24 - Camp Registration
        </h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-4 bg-white rounded-xl"
        >
          {/* full name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <div className="flex items-center">
              <FiUser className="h-5 w-5 mr-2 text-[#DFBF76]" />
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="flex items-center">
              <FiMail className="h-5 w-5 mr-2 text-[#DFBF76]" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="sr-only">
              Phone Number
            </label>
            <div className="flex items-center">
              <FiPhone className="h-5 w-5 mr-2 text-[#DFBF76]" />
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Home Address */}
          <div className="mb-4">
            <label htmlFor="homeAddress" className="sr-only">
              Home Address
            </label>
            <div className="flex items-center">
              <FiHome className="h-5 w-5 mr-2 text-[#DFBF76]" />
              <input
                type="text"
                id="homeAddress"
                name="homeAddress"
                placeholder="Home Address"
                value={formData.homeAddress}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Additional fields based on user category */}

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <div className="flex items-center">
              <MdCategory className="h-5 w-5 mr-2 text-[#DFBF76]" />
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
              >
                <option value="">Select Category</option>
                <option value="student">Student</option>
                <option value="iotb">IOTB</option>
                <option value="children">Children</option>
              </select>
            </div>
          </div>

          {/* Conditional fields based on selected category */}
          {formData.category && (
            <>
              {/* Student */}
              {formData.category === "student" && (
                <div className="mb-4">
                  <label htmlFor="institution" className="sr-only">
                    Institution
                  </label>
                  <div className="flex items-center">
                    <BiSolidInstitution className="h-5 w-5 mr-2 text-[#DFBF76]" />
                    <input
                      type="text"
                      id="institution"
                      name="institution"
                      placeholder="Institution"
                      value={formData.institution}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {/* IOTB */}
              {formData.category === "iotb" && (
                <>
                  <div className="mb-4">
                    <label htmlFor="institution" className="sr-only">
                      Institution
                    </label>
                    <div className="flex items-center">
                      <BiSolidInstitution className="h-5 w-5 mr-2 text-[#DFBF76]" />
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        placeholder="Institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="yearOfGraduation" className="sr-only">
                      Year of Graduation
                    </label>
                    <div className="flex items-center">
                      <GiGraduateCap className="h-5 w-5 mr-2 text-[#DFBF76]" />
                      <input
                        type="text"
                        id="yearOfGraduation"
                        name="yearOfGraduation"
                        placeholder="Year of Graduation"
                        value={formData.yearOfGraduation}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </>
              )}

              {formData.category === "children" && (
                <>
                  {/* Render children-specific fields */}
                  {/* Guardian name */}
                  <div className="mb-4">
                    <label htmlFor="guardianName" className="sr-only">
                      Guardian Name
                    </label>
                    <div className="flex items-center">
                      <TbBrandGuardian className="h-5 w-5 mr-2 text-[#DFBF76]" />
                      <input
                        type="text"
                        id="guardianName"
                        name="guardianName"
                        placeholder="Guardian Name"
                        value={formData.guardianName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* guardian phone number */}
                  <div className="mb-4">
                    <label htmlFor="guardianPhoneNumber" className="sr-only">
                      Guardian Phone Number
                    </label>
                    <div className="flex items-center">
                      <FiPhone className="h-5 w-5 mr-2 text-[#DFBF76]" />
                      <input
                        type="tel"
                        id="guardianPhoneNumber"
                        name="guardianPhoneNumber"
                        placeholder="Guardian Phone Number"
                        value={formData.guardianPhoneNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Additional common fields */}
              {/* Medical condition */}
              <div className="mb-4">
                <label htmlFor="medicalCondition" className="sr-only">
                  Medical Condition
                </label>
                <div className="flex items-center">
                  <FiUser className="h-5 w-5 mr-2 text-[#DFBF76]" />
                  <input
                    type="text"
                    id="medicalCondition"
                    name="medicalCondition"
                    placeholder="Medical Condition"
                    value={formData.medicalCondition}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Proof of payment */}
              <div className="mb-4">
                <label htmlFor="proofOfPayment" className="sr-only">
                  Proof of Payment
                </label>
                <div className="flex items-center">
                  <FiUser className="h-5 w-5 mr-2 text-[#DFBF76]" />
                  <input
                    type="file"
                    id="proofOfPayment"
                    name="proofOfPayment"
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="flex items-center">
                  <FiLock className="h-5 w-5 mr-2 text-[#DFBF76]" />
                  <div className="relative w-full">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="flex items-center">
                  <FiLock className="h-5 w-5 mr-2 text-[#DFBF76]" />
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit button */}
          <div className="mb-2 flex items-center">
            <FiSend className="h-5 w-5 mr-2 text-[#DFBF76]" />
            <button
              type="submit"
              className="w-full bg-[#647862] text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 flex items-center justify-center"
              disabled={loading} // Disable button when loading
            >
              {/* Conditional rendering based on loading state */}
              {loading ? (
                <FiLoader className="animate-spin mr-2" /> // Show loading spinner if loading
              ) : (
                "Register" // Show button text if not loading
              )}
              {error ? (
                <FiXCircle className="text-red-500 ml-2" /> // Show error icon if there's an error
              ) : null}
            </button>
          </div>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
            Already have an account?{" "}
            <Link
              href="/user/signin"
              className="font-medium text-[#DFBF76] hover:underline"
            >
              Signin
            </Link>
          </p>
        </form>

        <div className="mt-4">
          <p className="italic ">Igniting Hearts, Transcending Boundaries</p>
        </div>
      </div>

      {/* Success modal */}
      <Modal
        // dismissible
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Success"
      >
        <Modal.Header>
          {" "}
          Congratulations!!!
          {/* {userRegisteredData.fullName}, */}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Registration is successful and your account is under review.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Proceeding you to to signin...
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 animate-bounce">
            ...
          </p>
        </Modal.Footer>
      </Modal>

      {/* Error modal */}
      <Modal
        show={!!error}
        onClose={() => setError("")}
        title="Error"
        popup
        dismissible
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {error}
            </h3>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}