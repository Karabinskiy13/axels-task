import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IImage } from '../../interfaces/Image';


import { pictureService } from '../../services/picture.service';

type Images = {
  id:number
  previewURL: string
  tags: string
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
  images: Images[]
  lastTags: Tags[]
  status: null|string
  error: null
}
type Error = {
  message:string
}

export const getPictureByQuery = createAsyncThunk(
  'pictureSlice/getPictureByQuery',
  async ({ q, page }:{q:string, page:number}, { rejectedWithValue}:any) => {
    try {
 return await pictureService.getImagesByQuery(q, page);
    } catch (e) {
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
    resetImages(state) {
      state.images = [];
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
  }
});

export const { setTag, deleteTag, setInitialTags, resetImages } = pictureSlice.actions;
const pictureReducer = pictureSlice.reducer;
export default pictureReducer;
 // [getPictureByQuery.pending]: (state) => {
    //   state.status = 'pending...';
    //   state.error = null;
    // },
    // [getPictureByQuery.fulfilled]: (state, action) => {
    //   state.status = 'fulfilled';
    //   state.images = action.payload.hits;
    // },
    // [getPictureByQuery.rejected]: (state, action) => {
    //   state.status = 'error';
    //   state.error = action.payload;
    // }