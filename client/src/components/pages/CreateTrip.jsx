import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

const CreateTrip = () => {
  return (
    <div>
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h1 className='font-bold text-3xl'>Tell us about your travel prefernces</h1>
            <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our trip planner will generate a customized trip based on your preferences,</p>
            <div className='mt-20'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>
                        What is destination of choice?
                    </h2>
                    <GooglePlacesAutocomplete 
                       apiKey='AIzaSyC0oYtcX6j6gBsYt0eNJstvZ9PU3ccLdMA'
                    />
                </div>
            </div>

        </div>
    </div>
  )
}

export default CreateTrip