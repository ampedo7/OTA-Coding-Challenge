import React, { useState } from 'react';
import { HomeGeneratedProps } from './Home.props';
import {
  MainContainter,
  HeaderWrapper,
  Logo,
  NavMenu,
  NavItem,
  SearchBar,
  SearchInput,
  LoginButton,
  Container,
  Title,
  JobList,
  JobCard,
  JobHeader,
  JobInfo,
  JobTitle,
  JobMeta,
  JobDescription,
  ApplyButton
} from './Home.style';
import { JOBSDATA } from 'types/homes';

const HomeView = (props: HomeGeneratedProps): React.JSX.Element => {
  const { data, isLoading, isError } = props;

  console.log('data', data);
  console.log(isLoading);
  console.log(isError);
  return (
    <MainContainter>
      <HeaderWrapper>
        <Logo>JobFinder</Logo>
        <NavMenu>
          <NavItem>Jobs</NavItem>
          <NavItem>Companies</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Contact</NavItem>
        </NavMenu>
        <SearchBar>
          <SearchInput type="text" placeholder="Search jobs..." />
          <LoginButton>Login</LoginButton>
        </SearchBar>
      </HeaderWrapper>
      <Container>
        <JobList>
          {data.map((job: JOBSDATA) => (
            <JobCard key={job.id}>
              <JobHeader>
                <JobInfo>
                  <JobTitle>{job.name}</JobTitle>
                  <JobMeta>
                    {job.subcompany} • {job.office} • {job.department}
                  </JobMeta>
                </JobInfo>
                {/* <ApplyButton>Apply</ApplyButton> */}
              </JobHeader>

              {job.jobDescriptions.map((desc, index) => (
                <JobDescription key={index}>
                  {/* <strong>{desc.name}</strong> {desc.value} */}
                  <div dangerouslySetInnerHTML={{ __html: desc.value }} />
                </JobDescription>
              ))}
            </JobCard>
          ))}
        </JobList>
      </Container>
    </MainContainter>
  );
};

export default HomeView;
