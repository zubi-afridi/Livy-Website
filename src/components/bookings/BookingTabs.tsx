interface BookingTabsProps {
  activeTab: "current" | "past";
  setActiveTab: (tab: "current" | "past") => void;
}

const BookingTabs = ({ activeTab, setActiveTab }: BookingTabsProps) => {
  return (
    <div className="flex mb-6 md:mb-14 border-b border-gray-200 md:gap-8">
      <button
        onClick={() => setActiveTab("current")}
        className={`flex-1 md:flex-none pb-3 text-center md:text-left font-manrope font-semibold text-[15px] md:text-base transition-all relative cursor-pointer ${
          activeTab === "current"
            ? "text-primary-grey"
            : "text-secondary-text hover:text-primary-grey"
        }`}
      >
        Current
        {activeTab === "current" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
        )}
      </button>
      <button
        onClick={() => setActiveTab("past")}
        className={`flex-1 md:flex-none pb-3 text-center md:text-left font-manrope font-semibold text-[15px] md:text-base transition-all relative cursor-pointer ${
          activeTab === "past"
            ? "text-primary-grey"
            : "text-[#999999] hover:text-primary-grey"
        }`}
      >
        Past
        {activeTab === "past" && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
        )}
      </button>
    </div>
  );
};

export default BookingTabs;
