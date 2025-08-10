import styled from 'styled-components';
export const MainContainter = styled.header``;
export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #0077ff;
`;

export const NavMenu = styled.nav`
  display: flex;
  gap: 1.5rem;
`;

export const NavItem = styled.a`
  font-size: 1rem;
  cursor: pointer;
  color: #333;
  transition: color 0.2s ease;

  &:hover {
    color: #0077ff;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

export const LoginButton = styled.button`
  background: #0077ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #005ecc;
  }
`;

export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 1000px;
  margin: auto;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #2c3e50;
`;

export const JobList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const JobCard = styled.div`
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  padding: 15px 20px;
  transition: background 0.2s ease;

  &:hover {
    background: #f8f9fa;
  }
`;

export const JobHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const JobInfo = styled.div`
  flex: 1;
`;

export const JobTitle = styled.h2`
  font-size: 1.1rem;
  color: #2980b9;
  margin: 0;
`;

export const JobMeta = styled.p`
  font-size: 0.9rem;
  color: #7f8c8d;
  margin: 5px 0 0;
`;

export const JobDescription = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-top: 10px;
  line-height: 1.4;
`;

export const ApplyButton = styled.button`
  background: #2980b9;
  color: white;
  padding: 8px 15px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #1f6391;
  }
`;

export const SidebarWrapper = styled.aside`
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #ddd;
  padding: 1rem;
  height: 100vh;
  position: sticky;
  top: 0;
`;

export const SidebarTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
  border-bottom: 1px solid #ddd;
  padding-bottom: 0.3rem;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
`;

export const SidebarItem = styled.li`
  padding: 0.4rem 0;
  cursor: pointer;
  color: #555;
  transition: color 0.2s ease;

  &:hover {
    color: #0077ff;
  }
`;

export const FilterGroup = styled.div`
  margin-bottom: 1rem;
`;

export const FilterLabel = styled.label`
  font-size: 0.9rem;
  color: #555;
  display: block;
  margin-bottom: 0.3rem;
`;

export const FilterInput = styled.input`
  padding: 0.4rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 0.4rem;
`;
