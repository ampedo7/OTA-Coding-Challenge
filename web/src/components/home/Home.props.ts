import { Dispatch, SetStateAction } from 'react';
import { JOBSDATA } from 'types/homes';

export interface HomeGeneratedProps {
  data: Record<string, any>[string];
  isLoading: boolean;
  isError: boolean;
}
