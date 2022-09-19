import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { buildQueries } from '@testing-library/react';
import { IImage } from '../../interfaces/Image';


import { pictureService } from '../../services/picture.service';

type ImagesType = {
  largeImageURL: string
  id:number
  previewURL: string
  tags: string
  hits?:string
}
type Params ={
  q?:string
  page:number
}
type Tags = {
  id: string
  text:string
}

type ImagesState = {
  images: ImagesType[]
  lastTags: Tags[]
  status: null|string
  error: null | undefined
}


export const getPictureByQuery = createAsyncThunk(
  'pictureSlice/getPictureByQuery',
  async ({ q, page }:{q:string | null | undefined, page:number}, { rejectedWithValue}:any) => {
    try {
 return await pictureService.getImagesByQuery(q, page);
    } catch (e:any) {
      rejectedWithValue(e.message);
    }
  }
);

const initialState: ImagesState = {
    images: [],
    lastTags: [],
    status: null,
    error: null
}

const pictureSlice = createSlice({
  name: 'pictureSlice',
  initialState,
  reducers: {
    setTag(state, action) {
      if (state.lastTags.length === 3) {
        state.lastTags.splice(-1);
      }
      state.lastTags.unshift(action.payload);
    },
    deleteTag(state, action) {
      state.lastTags = state.lastTags.filter((tag, index) => index !== action.payload);
    },
    setInitialTags(state, action) {
      state.lastTags = action.payload;
    },
    resetImages(state, action) {
      state.images = action.payload;
    }
  },
  extraReducers: (builder) => {
   builder.addCase(getPictureByQuery.pending, (state)=>{
    state.status = 'pending...';
    state.error = null
   })
   builder.addCase(getPictureByQuery.fulfilled, (state, action)=>{
     state.status = 'fulfilled';
     state.images = action.payload.hits;
   })
   builder.addCase(getPictureByQuery.rejected, (state) =>{
    state.status = 'error';
   })
  }
});

export const { setTag, deleteTag, setInitialTags, resetImages } = pictureSlice.actions;
const pictureReducer = pictureSlice.reducer;
export default pictureReducer;