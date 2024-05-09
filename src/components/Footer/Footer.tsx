

function Footer() {
  return (
    <footer className="bg-gray-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2a1 1 0 011 1v2.35a1 1 0 01-.29.71l-7 7a1 1 0 01-1.42-1.42l3.3-3.3-3.3-3.3a1 1 0 111.42-1.4l7 7a1 1 0 01.29.71V21a1 1 0 01-2 0V11.46l-5.29-5.3a1 1 0 111.42-1.4l3.3 3.3 3.3-3.3a1 1 0 011.4 0 1 1 0 010 1.42l-3.29 3.3z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="ml-6 text-gray-400 hover:text-gray-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M21.24 3H2.76C1.645 3 1 3.645 1 4.76v14.48C1 20.355 1.645 21 2.76 21h18.48c1.115 0 2.14-.645 2.14-1.76V4.76C23.38 3.645 22.355 3 21.24 3zM20 10h-3V8h3v2zm0 2h-3v2h3v-2zm0 3h-3v2h3v-2zm-5-5h-3V8h3v2zm0 3h-3v2h3v-2zm0 3h-3v2h3v-2zm-5-6H7V8h3v2zm0 3H7v2h3v-2zm0 3H7v2h3v-2zm-1 2h-3v-2h3v2z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="ml-6 text-gray-400 hover:text-gray-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2H4zm11 3a3 3 0 00-2.46 4.71A4 4 0 019.86 9 3 3 0 1015 5zm-.5 6.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="ml-6 text-gray-400 hover:text-gray-300">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M17 3a1 1 0 00-1 1v3.586l-2.293-2.293a1 1 0 00-1.414 1.414L14.586 9H11a1 1 0 100 2h3a1 1 0 001-1V4a1 1 0 00-1-1zM8 14a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm8 3a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1h10a1 1 0 110 2H6v8h9a1 1 0 011 1z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2024 Tech For Village. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
