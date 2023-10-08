import React from "react";

const Chips = ({ title = "", onCancel = () => {} }) => {
  return (
    <div
      data-te-chip-init
      data-te-ripple-init
      class="[word-wrap: break-word] my-[5px] mr-4 flex h-[32px] cursor-pointer items-center justify-between rounded-[16px]  bg-black px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-white shadow-none transition-[opacity] duration-300 ease-linear hover:border-[#9fa6b2] hover:!shadow-none dark:text-neutral-200"
      data-te-ripple-color="dark"
    >
      {title}
      <span
        data-te-chip-close
        class="float-right w-4 cursor-pointer pl-[8px] text-[16px] text-[#afafaf] opacity-[.53] transition-all duration-200 ease-in-out hover:text-[#8b8b8b] dark:text-neutral-400 dark:hover:text-neutral-100"
        onClick={onCancel}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="3"
          stroke="white"
          class="h-4 w-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </span>
    </div>
  );
};

export default Chips;
