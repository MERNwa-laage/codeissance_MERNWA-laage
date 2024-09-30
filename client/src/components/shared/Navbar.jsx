import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import VoiceHover from '../pages/VoiceHover';
import Menu from './Menu';
import { useTextToSpeech } from '../shared/useTextToSpeech';

const Navbar = () => {
  const user = false;
  const navigate = useNavigate();
  const [menu, setMenu] = React.useState(false);
  const { enabled, toggleEnabled } = useTextToSpeech();

  const toggle = () => {
    setMenu(!menu);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleDash = () => {
    navigate('/dashboard');
  };

  const handleHotels = () => {
    navigate('/hotels');
  };

  const handleFlights = () => {
    navigate('/flights');
  };

  return (
    <VoiceHover>
      <div className='bg-[#E6E6E6] shadow-black'>
        <div className='flex justify-between w-11/12 mx-auto'>
          <div className='py-2'>
            <p className='text-2xl font-semibold mt-1'><span className='text-[#115579]'>Div</span>Yatra</p> 
          </div>
          <div className='flex'>
            <ul className='flex py-4 mx-4'>
              <li className='px-4 text-l font-semibold hover:underline hidden md:block cursor-pointer' onClick={handleHome}>Home</li>
              <li className='px-4 text-l font-semibold hover:underline hidden md:block cursor-pointer' onClick={handleFlights}>Flights</li>
              <li className='px-4 text-l font-semibold hover:underline hidden md:block cursor-pointer' onClick={handleHotels}>My Bookings</li>
              <li className='px-4 text-l font-semibold hover:underline hidden md:block cursor-pointer'>About Us</li>
            </ul>
            {!user ? 
              <div className='my-3 gap-4 hidden md:block'>
                <Button className='mx-4 bg-[#115579]' onClick={handleLogin}>Log in</Button>
              </div>
            :
              <div className='my-3 gap-4 hidden md:block'>
                <Button className='mx-4 bg-[#115579]' onClick={handleLogin}>Log out</Button>
              </div>
            }
            <Button
              className='my-3 mx-2 bg-[#791111]'
              onClick={toggleEnabled}
              title={enabled ? 'Disable Hover Speech' : 'Enable Hover Speech'}
            >
              {enabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </Button>
            <AlignJustify className='md:hidden m-4' onClick={toggle}/>
          </div>
        </div>
        {menu ? <Menu /> : <></>}
      </div>
    </VoiceHover>
  );
}

export default Navbar;