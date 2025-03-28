import axios from 'axios';
import { useEffect, useState } from 'react';

interface WalkData {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface walkDataProps {
}

const Walk: React.FC<walkDataProps> = () => {

  return (
    <div className="flex flex-col h-auto items-center rounded-lg border">
      <ul className="">
      </ul>
    </div>
  );
};

export default Walk;