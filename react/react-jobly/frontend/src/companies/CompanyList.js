import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm.js";
import JoblyApi from "../api/api.js";
import CompanyCard from "./CompanyCard.js";
import LoadingSpinner from "../common/LoadingSpinner.js";

function CompanyList() {
    const [companies, setCompanies] = useState(null);

    useEffect(function getCompaniesOnMount() {
        search();
    }, []);

    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) return <LoadingSpinner />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {companies.length
                ? (
                    <div className="CompanyList-list">
                        {companies.map(company => (
                            <CompanyCard
                                key={company.handle}
                                handle={company.handle}
                                name={company.name}
                                description={company.description}
                                logoUrl={company.logoUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default CompanyList;
