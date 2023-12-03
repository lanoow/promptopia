"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setupProviders();
  }, []);

  return (
    <nav className="w-full pt-4 mb-16 flex-between">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width="40"
          height="40"
          className="object-contain"
        />
        <span className="logo_text">Promptopia</span>
      </Link>

      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-4 md:gap-6">
            <Link href="/create-prompt" className="black_btn">
              Share Prompt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                src={session?.user?.image}
                alt="Avatar"
                width="35"
                height="35"
                className="object-contain rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="flex sm:hidden">
        {session?.user ? (
          <div className="relative">
            <div className="flex">
              <Image
              src={session?.user?.image}
              alt="Avatar"
              width="35"
              height="35"
              className="object-contain rounded-full"
              onClick={() => setToggleDropdown((prev) => !prev)}
              />
            </div>

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Share Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut()
                  }}
                  className="w-full mt-5 outline_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;