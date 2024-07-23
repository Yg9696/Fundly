import { useState, useEffect } from 'react';
import './myInvestments.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import SearchBar from '../../../components/cummon/search/SearchBar';
import InvestmentsView from '../../../components/investor/my-investments/InvestmentsView';
import LikeView from '../../../components/investor/my-investments/LikeView';
import { useLikes } from '../../../context/LikesContext';
import Company from '../../../models/Company';
import { companies } from '../../../utils/constant';
import FilterButton from '../../../components/cummon/filter/FilterButton';

const MyInvestments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { likes } = useLikes();
  const [likedCompanies, setLikedCompanies] = useState<Company[]>([]);
  const [isLikesView, setIsLikesView] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const likedCompanyIds = new Set(likes.map((like) => like.companyId));
    const filteredCompanies = companies.filter((company) =>
      likedCompanyIds.has(company.uid)
    );
    setLikedCompanies(filteredCompanies);
  }, [likes]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const filteredCompanies = likedCompanies
    .filter((company) =>
      company.companyDetails.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((company) =>
      selectedFilters.length === 0
        ? true
        : selectedFilters.includes(company.companyDetails.category)
    );

  return (
    <div className="all-investments">
      <div className="all-investments__search-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FilterButton onFilterChange={handleFilterChange} />
        <button
          className="toggle-view-button"
          onClick={() => setIsLikesView(!isLikesView)}
        >
          {isLikesView ? (
            <FaHeart size={25} color="#da678a" />
          ) : (
            <FaRegHeart size={25} color="#da678a" />
          )}
        </button>
      </div>
      {isLikesView ? (
        <LikeView companies={filteredCompanies} title={'השקעות שמורות'} />
      ) : (
        <InvestmentsView companies={[]} title={'ההשקעות שלי'} />
      )}
    </div>
  );
};

export default MyInvestments;
