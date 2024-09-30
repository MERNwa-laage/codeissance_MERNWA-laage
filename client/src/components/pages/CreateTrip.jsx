// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Input } from '../ui/input';
// import { SelectBudgetOptions, SelectDisability, SelectTravelList } from '@/constants/options';
// import { Button } from '../ui/button';

// const CreateTrip = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [formData, setFormData] = useState([]);

//   const handleInputChange=(name,value)=>{
//     setFormData({
//       ...formData,
//       [name]:value
//     })
//   }

//   useEffect(()=>{
//     console.log(formData);
//   },[formData])

//   const handleInputChange = async (e) => {
//     const newInputValue = e.target.value; // Get the new input value
//     setInputValue(newInputValue); // Update the state with the current input

//     // Fetch suggestions only if there is input
//     if (newInputValue) {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/autocomplete`, {
//           params: {
//             input: newInputValue,
//           },
//         });
//         setSuggestions(response.data.predictions);
//       } catch (error) {
//         console.error('Error fetching autocomplete suggestions:', error);
//       }
//     } else {
//       setSuggestions([]); // Clear suggestions if input is empty
//     }
//   };

//   const handleSuggestionClick = (suggestion) => {
//     // Append the selected suggestion to the current input value
//     setInputValue(suggestion.description.trim());
    
//     setSuggestions([]); // Clear suggestions after selection
//     console.log(inputValue);
//   };

//   return (
//     <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
//       <h1 className='font-bold text-3xl'>Tell us about your travel preferences</h1>
//       <p className='mt-3 text-gray-500 text-xl'>
//         Just provide some basic information and our trip planner will generate a customized trip based on your preferences.
//       </p>

//       <div className='mt-20 flex flex-col gap-10'>
//         <div>
//           <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
//           <Input 
//             placeholder="Enter destination"
//             value={inputValue} // Display the current input value
//             onChange={handleInputChange}
//           />
//           {/* Display suggestions */}
//           {suggestions.length > 0 && (
//             <div className="bg-white border rounded-lg shadow-lg mt-2">
//               {suggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="p-2 cursor-pointer hover:bg-gray-200"
//                   onClick={() => handleSuggestionClick(suggestion)}
                
//                 >
//                   {suggestion.description}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Other trip details */}
//       <div>
//         <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
//         <Input placeholder={'E.g.: 3'} type='number' onChange={(e)=>handleInputChange('noOfdays',e.target.value)}/>
//       </div>

//       <div>
//         <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
//         <div className='grid grid-cols-3 gap-5 mt-5'>
//           {SelectBudgetOptions.map((item, index) => (
//             <div key={index} className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
//               <h2 className='text-4xl'>{item.icon}</h2>
//               <h2 className='font-bold text-lg'>{item.title}</h2>
//               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
//         <div className='grid grid-cols-4 gap-5 mt-5'>
//           {SelectTravelList.map((item, index) => (
//             <div key={index} className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
//               <h2 className='text-4xl'>{item.icon}</h2>
//               <h2 className='font-bold text-lg'>{item.title}</h2>
//               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* More sections for trip customization */}
//       <div>
//         <h2 className='text-xl my-3 font-medium'>What is your disability?</h2>
//         <div className='grid grid-cols-4 gap-5 mt-5'>
//           {SelectDisability.map((item, index) => (
//             <div key={index} className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
//               <h2 className='text-4xl'>{item.icon}</h2>
//               <h2 className='font-bold text-lg'>{item.title}</h2>
//               <h2 className='text-sm text-gray-500'>{item.desc}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className='my-10 justify-end flex'>
//         <Button>Generate Trip</Button>
//       </div>
//       <br />
//     </div>
//   );
// };

// export default CreateTrip;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../ui/input';
import { SelectBudgetOptions, SelectDisability, SelectTravelList } from '@/constants/options';
import { Button } from '../ui/button';

const CreateTrip = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    destination: '',
    noOfDays: '',
    budget: '',
    travelCompanion: '',
    disability: ''
  });

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleDestinationChange = async (e) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    handleInputChange('destination', newInputValue);

    if (newInputValue) {
      try {
        const response = await axios.get(`http://localhost:5000/api/autocomplete`, {
          params: { input: newInputValue },
        });
        setSuggestions(response.data.predictions);
      } catch (error) {
        console.error('Error fetching autocomplete suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const selectedDestination = suggestion.description.trim();
    setInputValue(selectedDestination);
    handleInputChange('destination', selectedDestination);
    setSuggestions([]);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h1 className='font-bold text-3xl'>Tell us about your travel preferences</h1>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information and our trip planner will generate a customized trip based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <Input 
            placeholder="Enter destination"
            value={inputValue}
            onChange={handleDestinationChange}
          />
          {suggestions.length > 0 && (
            <div className="bg-white border rounded-lg shadow-lg mt-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.description}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder={'E.g.: 3'} type='number' onChange={(e) => handleInputChange('noOfDays', e.target.value)}/>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div 
                key={index} 
                className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'
                onClick={() => handleInputChange('budget', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div 
                key={index} 
                className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'
                onClick={() => handleInputChange('travelCompanion', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your disability?</h2>
          <div className='grid grid-cols-4 gap-5 mt-5'>
            {SelectDisability.map((item, index) => (
              <div 
                key={index} 
                className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'
                onClick={() => handleInputChange('disability', item.title)}
              >
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className='my-10 justify-end flex'>
          <Button onClick={() => console.log(formData)}>Generate Trip</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;