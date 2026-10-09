const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between gap-3 border-t border-gray-200 bg-white px-4 py-4 text-center text-sm text-black/60 sm:flex-row sm:px-6 sm:text-left lg:px-10">
      {" "}
      <div>
        {" "}
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>{" "}
      </div>
      <div>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;
