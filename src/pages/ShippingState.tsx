import React, { useState } from 'react';


const TableComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex flex-col gap-2">
        <p className="h-[1px] bg-[#E4E7E9] "></p>
        <div className="flex justify-between py-2 text-sm text-secondary ">
          <div className="w-1/3 flex gap-2 items-center">
            <input type="radio" id="price1" name="fav_language" value="HTML" />
            <label htmlFor="price1">$5.00</label>
          </div>
          <div className="w-1/3">Fixed</div>
          <div className="w-1/3">Flat Rate</div>
        </div>
        <p className="h-[1px] bg-[#E4E7E9] "></p>
        <div className="flex justify-between py-2 text-sm text-secondary">
          <div className="w-1/3 flex gap-2 items-center">
            <input type="radio" id="price2" name="fav_language" value="HTML" />
            <label htmlFor="price2">$10.00</label>
          </div>
          <div className="w-1/3">Table Rate</div>
          <div className="w-1/3">Best Way</div>
        </div>
        <p className="h-[1px] bg-[#E4E7E9] "></p>
      </div>
    </div>
  );
};

// TabItem Component
interface TabItemProps {
  tabNumber: number;
  activeTab: number;
  onClick: (tabNumber: number) => void;
  label: string;
}

const TabItem: React.FC<TabItemProps> = ({ tabNumber, activeTab, onClick, label }) => {
  const isActive = activeTab === tabNumber;

  return (
    <div className="flex flex-col items-center gap-8" onClick={() => onClick(tabNumber)}>
      <div className={`flex justify-center items-center w-[200px] h-[3px] ${isActive ? 'bg-primary' : 'bg-border'}`}>
        <div className={`flex items-center justify-center bg-white border-[3px] rounded-[50%] w-[3rem] h-[3rem] ${isActive ? 'border-primary' : 'border-border'}`}>
          a
        </div>
      </div>
      <div className={`text-sm font-medium ${isActive ? 'text-primary font-semibold' : 'text-border'}`}>
        {label}
      </div>
    </div>
  );
};

// FormField Component
interface FormFieldProps {
  label: string;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type = "text" }) => (
  <div className="flex items-start justify-between gap-4">
    <div className="text-sm text-secondary">{label}</div>
    <input className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none" type={type} />
  </div>
);

// FormFieldNoLabel Component
interface FormFieldNoLabelProps {
  type?: string;
}

const FormFieldNoLabel: React.FC<FormFieldNoLabelProps> = ({ type = "text" }) => (
  <input className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none" type={type} />
);

// FormSelect Component
interface FormSelectProps {
  label: string;
  options: string[];
}

const FormSelect: React.FC<FormSelectProps> = ({ label, options }) => (
  <div className="flex items-start justify-between gap-4">
    <div className="text-sm text-secondary">{label}</div>
    <select className="w-[400px] border-[1px] h-[40px] border-border text-primary px-2 text-sm focus:outline-none">
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

// Main Component
const ShippingState: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="px-[12rem]">
      <div className="flex justify-center items-center">
        <TabItem tabNumber={1} activeTab={activeTab} onClick={handleTabClick} label="Shipping" />
        <TabItem tabNumber={2} activeTab={activeTab} onClick={handleTabClick} label="Review & Payments" />
      </div>
      {activeTab === 1 && (
        <div className="flex justify-between gap-16 mt-8">
          <div>
            <p className="uppercase text-sm font-bold mb-8">SHIPPING ADDRESS</p>
            <form className="flex flex-col gap-4">
              <FormField label="Email Address" />
              <FormField label="First Name" />
              <FormField label="Zip/Postal Code" />
              <p className="text-sm text-secondary">
                You Already Have An Account With Us? <span className="text-primary underline cursor-pointer">Sign In</span> or Continue As Guest
              </p>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-40 h-12 bg-primary font-bold text-white justify-center items-center flex text-sm">LOGIN</div>
                <div className="text-sm text-secondary">Forgot Your Password?</div>
              </div>
            </form>
            <p className="h-[1px] bg-[#E4E7E9] my-6"></p>
            <form className="flex flex-col gap-4">
              <FormField label="First Name" />
              <FormField label="Last Name" />
              <FormField label="Company" />
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm text-secondary">Street Address</div>
                  <div className="flex flex-col gap-2">
                    <FormFieldNoLabel />
                    <FormFieldNoLabel />
                    <FormFieldNoLabel />
                  </div>
                </div>
              </div>
              <FormField label="Country" />
              <FormSelect label="State/Province" options={['Option 1', 'Option 2', 'Option 3']} />
            </form>
            <form className='mt-10' >
              <p className="uppercase text-sm font-bold mb-8">SHIPPING METHODS</p>
              <TableComponent />
              <div className="flex items-center gap-4 mt-4">
                <div className="w-40 h-12 bg-primary font-bold text-white justify-center items-center flex text-sm">NEXT</div>
                <div className="text-sm text-secondary">Back</div>
              </div>
           
            </form>
            <div className="flex gap-2 items-center mt-6">
              <input type="checkbox" id="confirm" name="fav_language" value="HTML" />
              <label className='text-sm text-secondary' htmlFor="confirm">YES! I'd Like To Receive Order Updates And Special Offers Via Text From PerfumeShop.Com</label>
            </div>
          </div>
          <div className='w-full'>
            <div className='w-full p-6 bg-gray-100'>a</div>
            
          </div>
        
        </div>
      )}
      {activeTab === 2 && <div></div>}
    </div>
  );
};

export default ShippingState;
