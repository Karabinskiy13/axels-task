import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Doughnut, Pie, Line } from 'react-chartjs-2';
import { Button, CircularProgress, Box } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title
} from 'chart.js';

import { pictureService } from '../services/picture.service';
import { Charts, Wrapper } from '../styled/Charts';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const getData = (data: number[]) => {
  return {
    labels: ['Dogs', 'Horses', 'Flowers', 'Mountains', 'Rivers'],
    datasets: [
      {
        label: 'Total by query',
        data,
        borderWidth: 2,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ]
      }
    ]
  };
};

const Chart = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(getData([]));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { total: totalDogs } = await pictureService.getImagesByQuery('dogs', 1);
      const { total: totalHorses } = await pictureService.getImagesByQuery('horses', 1);
      const { total: totalFlowers } = await pictureService.getImagesByQuery('flowers', 1);
      const { total: totalMountains } = await pictureService.getImagesByQuery('mountains', 1);
      const { total: totalRivers } = await pictureService.getImagesByQuery('rivers', 1);

      setData(getData([totalDogs, totalHorses, totalFlowers, totalMountains, totalRivers]));
      setLoading(false);
    };

    fetch();
  }, []);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column">
      {!loading && (
        <Wrapper>
          <Button onClick={() => navigate('/')} variant="outlined">
            Back to Pictures
          </Button>
          <Charts>
            <Doughnut data={data} />
          </Charts>
          <Charts>
            <Pie data={data} />
          </Charts>
          <Charts>
            <Line data={data} />
          </Charts>
          <Button
            variant="contained"
            onClick={() =>
              setData(
                getData([
                  Math.floor(Math.random() * 10000),
                  Math.floor(Math.random() * 10000),
                  Math.floor(Math.random() * 10000),
                  Math.floor(Math.random() * 10000),
                  Math.floor(Math.random() * 10000)
                ])
              )
            }>
            Change Data
          </Button>
        </Wrapper>
      )}
      {loading && <CircularProgress size={100} />}
    </Box>
  );
};

export default Chart;
