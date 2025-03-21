export function Footer() {
    return (
      <footer className="py-8 px-4 bg-gray-900 text-white text-center">
        <p>© 2023 Artist Name. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="#" className="hover:text-gray-400">
            Instagram
          </a>
          <a href="#" className="hover:text-gray-400">
            Twitter
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </div>
      </footer>
    );
  }