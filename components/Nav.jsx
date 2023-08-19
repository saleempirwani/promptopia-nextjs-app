"use client";

import Image from "next/image";
import Link from "next/link";
import { signOut, getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const isUserLoggedIn = true;

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const toggle = () => setToggleDropDown((prev) => !prev);

  const setProviderFunc = async () => {
    const response = await getProviders();
    setProviders(response);
  };

  useEffect(() => {
    setProviderFunc();
  }, []);

  const renderWeb = () => (
    <div className="sm:flex hidden">
      {isUserLoggedIn ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className="black_btn">
            Create Post
          </Link>

          <button type="button" onClick={signOut} className="outline_btn">
            Sign Out
          </button>

          <Link href="/profile">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full "
              alt="profile"
            />
          </Link>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                className="black_btn"
                type="button"
                onClick={() => signIn(provider.id)}
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </div>
  );

  const renderMobile = () => (
    <div className="sm:hidden flex relative">
      {isUserLoggedIn ? (
        <div className="flex">
          <Image
            src="/assets/images/logo.svg"
            width={37}
            height={37}
            className="rounded-full "
            alt="profile"
            onClick={toggle}
          />

          {toggleDropDown && (
            <div className="dropdown">
              <Link href="/profile" className="dropdown_link" onClick={toggle}>
                My Profile
              </Link>
              <Link
                href="/create-prompt"
                className="dropdown_link"
                onClick={toggle}
              >
                Create Prompt
              </Link>
              <button
                className="mt-5 w-full black_btn"
                type="button"
                onClick={() => {
                  toggle();
                  signOut();
                }}
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
                key={provider.name}
                className="black_btn"
                type="button"
                onClick={() => signIn(provider.id)}
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </div>
  );

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      {renderWeb()}

      {/* Mobile Navigation */}
      {renderMobile()}
    </nav>
  );
};

export default Nav;
