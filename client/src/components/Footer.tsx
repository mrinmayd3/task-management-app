import ReactLogo from "../assets/react.svg";

export default function Footer() {
  return (
    <footer className="p-4">
      <p className="text-center text-gray-700 flex justify-center items-center gap-1">
        <span>Made by</span>
        <a
          href="https://www.linkedin.com/in/mrinmay-dey-b50ba2215/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400"
        >
          Mrinmay Dey
        </a>
        <span>with</span>

        <img src={ReactLogo} alt="react logo" className="size-5" />
      </p>
    </footer>
  );
}
