import React, { useState } from 'react';
import HomeView from './Home.view';
import { jobListDetail } from './Home.transform';
import { getJobListing } from 'services/homes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HomeGeneratedProps } from './Home.props';
const Home = (): React.JSX.Element => {
  const queryClient = useQueryClient();

  const {
    data: jobList,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: getJobListing
  });

  const data = jobListDetail(jobList?.data?.data ?? []);
  const generatedProps: HomeGeneratedProps = {
    data,
    isLoading,
    isError
  };
  return <HomeView {...generatedProps} />;
};

export default Home;
