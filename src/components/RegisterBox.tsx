import React, { useRef, useState } from "react";

interface RegisterBoxProps {
  title?: string;
  namePlaceholder?: string;
  emailPlaceholder?: string;
  buttonText?: string;
  errorEmpty?: string;
  errorEmail?: string;
  errorServer?: string;
  success?: string;
  secureMessage?: string;
}

export default function RegisterBox({
  title = "¡Inscríbete ahora!",
  namePlaceholder = "Tu nombre completo",
  emailPlaceholder = "Tu email",
  buttonText = "Acceder a la clase gratis",
  errorEmpty = "Por favor completa todos los campos",
  errorEmail = "Por favor ingresa un email válido",
  errorServer = "Error del servidor, intenta de nuevo",
  success = "¡Registro exitoso! Redirigiendo...",
  secureMessage = "Tu información está segura con nosotros",
}: RegisterBoxProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setErrorMessages("");
    setSuccessMessage("");

    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";

    if (!name || !email) {
      setErrorMessages(errorEmpty);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessages(errorEmail);
      return;
    }

    setIsSubmitting(true);

    const capitalizeFirstLetter = (word: string): string => {
      return word
        .toLowerCase()
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    };

    const capitalizedName = capitalizeFirstLetter(name);

    try {
      const userRes = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: capitalizedName,
          email: email.toLowerCase(),
        }),
      });

      if (userRes.ok) {
        setSuccessMessage(success);
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 2000);
      } else {
        setSuccessMessage(success);
        setTimeout(() => {
          window.location.href = "/thanks";
        }, 2000);
      }
    } catch (error) {
      setErrorMessages(errorServer);
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='premium-card backdrop-blur-xl relative overflow-hidden'>
        {/* Elementos decorativos internos */}
        <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-full blur-xl'></div>
        <div className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-rose-300/20 to-transparent rounded-full blur-lg'></div>

        <form className='flex flex-col gap-6 p-6 relative z-10'>
          <h2 className='mb-4 text-center text-white text-2xl font-bold'>
            <span className='bg-gradient-to-r from-yellow-400 via-rose-300 to-yellow-400 bg-clip-text text-transparent'>
              {title}
            </span>
          </h2>

          <div className='space-y-4'>
            <div className='relative'>
              <input
                ref={nameRef}
                type='text'
                id='name'
                name='name'
                required
                placeholder={namePlaceholder}
                className='w-full p-4 text-[16px] border-2 border-transparent rounded-lg bg-gradient-to-r from-black/40 to-gray-900/40 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400/50 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm'
              />
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 via-rose-300/20 to-yellow-400/20 p-[1px] -z-10'>
                <div className='w-full h-full bg-black/80 rounded-lg'></div>
              </div>
            </div>

            <div className='relative'>
              <input
                ref={emailRef}
                type='email'
                id='email'
                name='email'
                required
                placeholder={emailPlaceholder}
                className='w-full p-4 text-[16px] border-2 border-transparent rounded-lg bg-gradient-to-r from-black/40 to-gray-900/40 text-white placeholder-gray-300 focus:outline-none focus:border-yellow-400/50 focus:bg-black/60 transition-all duration-300 backdrop-blur-sm'
              />
              <div className='absolute inset-0 rounded-lg bg-gradient-to-r from-yellow-400/20 via-rose-300/20 to-yellow-400/20 p-[1px] -z-10'>
                <div className='w-full h-full bg-black/80 rounded-lg'></div>
              </div>
            </div>
          </div>

          {errorMessages && (
            <div className='p-3 rounded-lg bg-red-500/20 border border-red-500/30'>
              <p className='text-sm text-center text-red-300'>
                {errorMessages}
              </p>
            </div>
          )}

          {successMessage && (
            <div className='p-3 rounded-lg bg-green-500/20 border border-green-500/30'>
              <p className='text-sm text-center text-green-300'>
                {successMessage}
              </p>
            </div>
          )}

          {isSubmitting ? (
            <div className='flex justify-center py-4'>
              <div className='w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
            </div>
          ) : (
            <button
              type='submit'
              className='ctabutton w-full'
              onClick={handleSubmit}
            >
              {buttonText}
            </button>
          )}

          <p className='text-xs text-center text-gray-300 leading-relaxed'>
            {secureMessage}
          </p>
        </form>
      </div>
    </div>
  );
}
