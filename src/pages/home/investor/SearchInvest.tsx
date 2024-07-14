import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import InvestmentCard from '../../../components/invest-card/InvestmentCard';
import { companies } from '../../../utils/constant';
import './SearchInvestment.css';

const SearchInvestments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter((company) =>
    company.companyDetails.companyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  //TODO : fetch real companies list

  return (
    <>
      <div className="all-investments">
        <div className="all-investments__search-container">
          <input
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="all-investments__search"
          />

          <div className="all-investments__search-icon">
            <FaSearch size={20} />
          </div>
        </div>
        <h2 className="title">כל ההשקעות</h2>
        <div className="all-investments__list">
          {filteredCompanies.map((company) => (
            <InvestmentCard key={company.uid} company={company} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchInvestments;
