import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../ui/input'
import { SelectBudgetOptions, SelectDisability, SelectTravelList } from '@/constants/options'
import { Button } from '../ui/button'

const CreateTrip = () => {
  return (
    <div>

        
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h1 className='font-bold text-3xl'>Tell us about your travel prefernces</h1>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our trip planner will generate a customized trip based on your preferences,</p>
            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        What is destination of choice?
                    </h2>
                    <GooglePlacesAutocomplete 
                       apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                    />
                </div>
            </div>

            <div>
                <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                <Input placeholder={'E.g.:3'} type='number'/>
            </div>

            <div>
            <h2 className='text-xl my-3 font-medium'>
                       What is your budget?
                    </h2>

                <div className=' grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item,index)=>(
                        <div key={index} className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>    
            </div>

            <div>
            <h2 className='text-xl my-3 font-medium'>
                       What is your budget?
                    </h2>

                <div className=' grid grid-cols-4 gap-5 mt-5'>
                    {SelectTravelList.map((item,index)=>(
                        <div key={index} className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>    
            </div>

            <div>
            <h2 className='text-xl my-3 font-medium'>
                      What is your disability?
                    </h2>

                <div className=' grid grid-cols-4 gap-5 mt-5'>
                    {SelectDisability.map((item,index)=>(
                        <div key={index} className='p-4 border rounded-lg cursor-pointer hover:shadow-lg'>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='font-bold text-lg'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>    
            </div>
            
            <div className='my-10 justify-end flex'>
            <Button>Generate Trip</Button>
            </div>
            <br/>
        </div>
    </div>
  )
}

export default CreateTrip