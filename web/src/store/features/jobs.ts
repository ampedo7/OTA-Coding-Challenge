import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Job {
  id: number;
  name: string;
}

interface JobsState {
  jobs: Job[];
}

const initialState: JobsState = {
  jobs: []
};

export const JobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<{ name: string }>) => {
      state.jobs.push({
        id: state.jobs.length,
        name: action.payload.name
      });
    }
  }
});

export default JobSlice.reducer;
export const { addJob } = JobSlice.actions;
