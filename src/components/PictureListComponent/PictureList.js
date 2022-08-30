import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPictureByQuery } from '../../store/slice/picture.slice';

const PictureList = () => {
  //   const [key, setKey] = useState('');
  //   const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { images } = useSelector((state) => state.pictureReducer);
  useEffect(() => {
    dispatch(getPictureByQuery());
  }, [dispatch]);
  console.log(images);
  return <div></div>;
};

export default PictureList;
