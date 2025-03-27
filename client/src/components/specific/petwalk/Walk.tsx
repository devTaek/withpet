import axios from 'axios';
import { useEffect, useState } from 'react';

interface WalkData {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

const Walk = () => {
  const [place, setPlace] = useState<WalkData[]>([]);



  return (
    <div className="flex flex-col h-full items-center rounded-lg">

    </div>
  );
};

export default Walk;